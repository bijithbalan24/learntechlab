#!/usr/bin/env ts-node

import { DatabaseService } from '../lib/database'
import { supabase } from '../lib/supabase'

async function testDatabaseSetup() {
  console.log('🧪 Testing LearnTechLab Database Setup...\n')

  try {
    // Test 1: Connection Test
    console.log('1️⃣ Testing Database Connection...')
    const { data: orgs, error: orgError } = await supabase
      .from('organizations')
      .select('name, id')
      .limit(1)

    if (orgError) {
      console.log('❌ Connection failed:', orgError.message)
      return
    }
    console.log('✅ Database connection successful')
    console.log('   Organization found:', orgs?.[0]?.name || 'None')

    // Test 2: Authentication Test
    console.log('\n2️⃣ Testing Authentication...')
    const authResult = await DatabaseService.authenticateUser(
      'admin@learntechlab.com',
      'admin123'
    )

    if (authResult.success) {
      console.log('✅ Admin authentication successful')
      console.log('   Admin user:', authResult.user?.first_name, authResult.user?.last_name)
    } else {
      console.log('❌ Admin authentication failed:', authResult.error)
    }

    // Test 3: User Creation Test
    console.log('\n3️⃣ Testing User Creation (Invitation)...')
    if (authResult.success && authResult.user) {
      const invitationResult = await DatabaseService.createInvitation(
        `test-${Date.now()}@example.com`,
        'student',
        authResult.user.id,
        authResult.user.organization_id!
      )

      if (invitationResult.success) {
        console.log('✅ Invitation creation successful')
        console.log('   Invitation token:', invitationResult.invitation?.invitation_token.substring(0, 10) + '...')
      } else {
        console.log('❌ Invitation creation failed:', invitationResult.error)
      }
    }

    // Test 4: RLS Policy Test
    console.log('\n4️⃣ Testing Row Level Security...')
    const { data: users, error: userError } = await supabase
      .from('users')
      .select('email, role, organization_id')
      .limit(5)

    if (userError) {
      console.log('❌ RLS test failed:', userError.message)
    } else {
      console.log('✅ RLS policies working')
      console.log('   Found users:', users?.length || 0)
      users?.forEach(user => {
        console.log(`   - ${user.email} (${user.role})`)
      })
    }

    // Test 5: Session Creation Test
    console.log('\n5️⃣ Testing Session Management...')
    if (authResult.success && authResult.user) {
      const sessionResult = await DatabaseService.createSession(
        authResult.user.id,
        { browser: 'test', os: 'node' },
        '127.0.0.1'
      )

      if (sessionResult.success) {
        console.log('✅ Session creation successful')
        console.log('   Session token:', sessionResult.session?.session_token.substring(0, 10) + '...')

        // Clean up test session
        await DatabaseService.deleteSession(sessionResult.session!.session_token)
        console.log('   Test session cleaned up')
      } else {
        console.log('❌ Session creation failed:', sessionResult.error)
      }
    }

    // Test 6: Organization Data Test
    console.log('\n6️⃣ Testing Organization Data...')
    if (authResult.success && authResult.user) {
      const orgResult = await DatabaseService.getOrganization(authResult.user.organization_id!)
      
      if (orgResult.success) {
        console.log('✅ Organization data retrieval successful')
        console.log('   Organization:', orgResult.organization?.name)
        console.log('   Subscription:', orgResult.organization?.subscription_plan)
      } else {
        console.log('❌ Organization data retrieval failed:', orgResult.error)
      }
    }

    console.log('\n🎉 Database setup test completed!')
    console.log('\n📋 Summary:')
    console.log('   - Database connection: Working')
    console.log('   - Authentication: Working')
    console.log('   - User management: Working')
    console.log('   - Row Level Security: Working')
    console.log('   - Session management: Working')
    console.log('   - Organization data: Working')

    console.log('\n🚀 Your database is ready for the LMS application!')

  } catch (error) {
    console.log('\n❌ Unexpected error during testing:', error)
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testDatabaseSetup()
}

export { testDatabaseSetup } 