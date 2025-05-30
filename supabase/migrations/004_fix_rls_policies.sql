-- =====================================================
-- Fix RLS Policies - Remove Infinite Recursion
-- Migration: 004_fix_rls_policies
-- =====================================================

-- Drop all existing policies first
DROP POLICY IF EXISTS "Admins can read own organization" ON organizations;
DROP POLICY IF EXISTS "Super admins can manage organizations" ON organizations;
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Admins can read organization users" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Admins can create users" ON users;
DROP POLICY IF EXISTS "Admins can update organization users" ON users;
DROP POLICY IF EXISTS "Super admins can delete users" ON users;
DROP POLICY IF EXISTS "Users can read own sessions" ON user_sessions;
DROP POLICY IF EXISTS "Users can update own sessions" ON user_sessions;
DROP POLICY IF EXISTS "Admins can read organization sessions" ON user_sessions;
DROP POLICY IF EXISTS "System can create sessions" ON user_sessions;
DROP POLICY IF EXISTS "Admins can create invitations" ON user_invitations;
DROP POLICY IF EXISTS "Admins can read own invitations" ON user_invitations;
DROP POLICY IF EXISTS "Users can read own invitations" ON user_invitations;
DROP POLICY IF EXISTS "System can update invitations" ON user_invitations;

-- =====================================================
-- SIMPLIFIED ORGANIZATION POLICIES
-- =====================================================

-- All authenticated users can read organizations (simplified)
CREATE POLICY "Users can read organizations" ON organizations
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- =====================================================
-- SIMPLIFIED USER POLICIES  
-- =====================================================

-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Service role can do everything (for admin operations)
CREATE POLICY "Service role can manage users" ON users
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- =====================================================
-- SIMPLIFIED SESSION POLICIES
-- =====================================================

-- Users can read their own sessions
CREATE POLICY "Users can read own sessions" ON user_sessions
  FOR SELECT USING (user_id = auth.uid());

-- Users can update their own sessions
CREATE POLICY "Users can update own sessions" ON user_sessions
  FOR UPDATE USING (user_id = auth.uid());

-- Service role can manage all sessions
CREATE POLICY "Service role can manage sessions" ON user_sessions
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- =====================================================
-- SIMPLIFIED INVITATION POLICIES
-- =====================================================

-- Service role can manage invitations
CREATE POLICY "Service role can manage invitations" ON user_invitations
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Users can read invitations by their email
CREATE POLICY "Users can read own invitations" ON user_invitations
  FOR SELECT USING (auth.jwt() ->> 'email' = email); 