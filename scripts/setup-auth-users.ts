import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client with service role key for admin operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables:')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', !!supabaseUrl)
  console.error('SUPABASE_SERVICE_ROLE_KEY:', !!supabaseServiceKey)
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function setupAuthUsers() {
  console.log('🚀 Setting up authentication users...\n')

  const users = [
    {
      email: 'admin@learntechlab.com',
      password: 'admin123',
      role: 'admin',
      first_name: 'System',
      last_name: 'Administrator'
    },
    {
      email: 'student1@learntechlab.com', 
      password: 'student123',
      role: 'student',
      first_name: 'John',
      last_name: 'Student'
    },
    {
      email: 'teacher1@learntechlab.com',
      password: 'teacher123', 
      role: 'teacher',
      first_name: 'Jane',
      last_name: 'Teacher'
    }
  ]

  for (const userData of users) {
    try {
      console.log(`👤 Creating auth user: ${userData.email}`)
      
      // Create user in Supabase Auth
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email: userData.email,
        password: userData.password,
        email_confirm: true
      })

      if (authError) {
        console.error(`❌ Failed to create auth user ${userData.email}:`, authError.message)
        continue
      }

      if (!authUser.user) {
        console.error(`❌ No user returned for ${userData.email}`)
        continue
      }

      console.log(`✅ Auth user created: ${userData.email} (ID: ${authUser.user.id})`)

      // Update our custom users table with the correct auth ID
      const { error: updateError } = await supabase
        .from('users')
        .update({ 
          id: authUser.user.id,
          first_name: userData.first_name,
          last_name: userData.last_name
        })
        .eq('email', userData.email)

      if (updateError) {
        console.error(`❌ Failed to update custom user ${userData.email}:`, updateError.message)
      } else {
        console.log(`✅ Updated custom user record: ${userData.email}`)
      }

    } catch (error) {
      console.error(`❌ Error processing ${userData.email}:`, error)
    }

    console.log('')
  }

  console.log('🎉 Auth user setup completed!')
  console.log('\n📋 Test Credentials:')
  console.log('👑 Admin: admin@learntechlab.com / admin123')  
  console.log('🎓 Student: student1@learntechlab.com / student123')
  console.log('👨‍🏫 Teacher: teacher1@learntechlab.com / teacher123')
}

if (require.main === module) {
  setupAuthUsers().catch(console.error)
}

export { setupAuthUsers } 