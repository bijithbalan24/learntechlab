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

async function fixAdminUser() {
  console.log('🔧 Fixing admin user...\n')

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

    // First, let's see the current admin user in our table
    const { data: currentAdmin, error: getCurrentError } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'admin@learntechlab.com')
      .single()

    if (getCurrentError) {
      console.error('❌ Failed to get current admin user:', getCurrentError.message)
      return
    }

    console.log('📋 Current admin user ID:', currentAdmin.id)
    console.log('🆔 New auth user ID:', adminAuthUser.id)

    // Update the admin user's ID
    const { error: updateError } = await supabase
      .from('users')
      .update({ 
        id: adminAuthUser.id,
        first_name: 'System',
        last_name: 'Administrator'
      })
      .eq('email', 'admin@learntechlab.com')

    if (updateError) {
      console.error('❌ Failed to update admin user:', updateError.message)
      return
    }

    console.log('✅ Admin user updated successfully!')

    // Update created_by references to point to the new admin ID
    const { error: updateRefsError } = await supabase
      .from('users')
      .update({ created_by: adminAuthUser.id })
      .eq('created_by', currentAdmin.id)

    if (updateRefsError) {
      console.error('❌ Failed to update created_by references:', updateRefsError.message)
    } else {
      console.log('✅ Updated created_by references')
    }

    console.log('\n🎉 Admin user fix completed!')
    
  } catch (error) {
    console.error('❌ Error fixing admin user:', error)
  }
}

if (require.main === module) {
  fixAdminUser().catch(console.error)
}

export { fixAdminUser } 