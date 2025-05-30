import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client with service role key for admin operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function fixAdminUserFinal() {
  console.log('🔧 Fixing admin user (final approach)...\n')

  try {
    // Get the auth user for admin
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers()
    
    if (authError) {
      console.error('❌ Failed to list auth users:', authError.message)
      return
    }

    const adminAuthUser = authUsers.users.find(u => u.email === 'admin@learntechlab.com')
    
    if (!adminAuthUser) {
      console.error('❌ Admin auth user not found')
      return
    }

    console.log(`✅ Found admin auth user: ${adminAuthUser.id}`)

    // Get the current admin user
    const { data: currentAdmin, error: getCurrentError } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'admin@learntechlab.com')
      .single()

    if (getCurrentError) {
      console.error('❌ Failed to get current admin user:', getCurrentError.message)
      return
    }

    const oldAdminId = currentAdmin.id
    const newAdminId = adminAuthUser.id

    console.log('📋 Current admin user ID:', oldAdminId)
    console.log('🆔 New auth user ID:', newAdminId)

    // Step 1: Update all created_by references to NULL temporarily
    console.log('🔄 Step 1: Temporarily setting created_by to NULL...')
    const { error: nullifyError } = await supabase
      .from('users')
      .update({ created_by: null })
      .eq('created_by', oldAdminId)

    if (nullifyError) {
      console.error('❌ Failed to nullify created_by:', nullifyError.message)
      return
    }

    // Step 2: Update the admin user record with new ID
    console.log('🔄 Step 2: Updating admin user ID...')
    
    // First delete the old record
    const { error: deleteError } = await supabase
      .from('users')
      .delete()
      .eq('id', oldAdminId)

    if (deleteError) {
      console.error('❌ Failed to delete old admin record:', deleteError.message)
      return
    }

    // Then insert with the new ID
    const { error: insertError } = await supabase
      .from('users')
      .insert({
        id: newAdminId,
        email: 'admin@learntechlab.com',
        first_name: 'System',
        last_name: 'Administrator',
        role: 'admin',
        status: 'active',
        organization_id: currentAdmin.organization_id,
        password_hash: currentAdmin.password_hash,
        email_verified: true,
        created_by: newAdminId,
        admin_data: currentAdmin.admin_data
      })

    if (insertError) {
      console.error('❌ Failed to insert new admin record:', insertError.message)
      return
    }

    // Step 3: Update created_by references back to the new admin ID
    console.log('🔄 Step 3: Updating created_by references...')
    const { error: updateRefsError } = await supabase
      .from('users')
      .update({ created_by: newAdminId })
      .is('created_by', null)

    if (updateRefsError) {
      console.error('❌ Failed to update created_by references:', updateRefsError.message)
    } else {
      console.log('✅ Updated created_by references')
    }

    console.log('\n🎉 Admin user fix completed successfully!')
    console.log('📋 You can now login with: admin@learntechlab.com / admin123')
    
  } catch (error) {
    console.error('❌ Error fixing admin user:', error)
  }
}

if (require.main === module) {
  fixAdminUserFinal().catch(console.error)
}

export { fixAdminUserFinal } 