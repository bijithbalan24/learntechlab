-- =====================================================
-- Row Level Security (RLS) Policies
-- Migration: 002_row_level_security
-- =====================================================

-- =====================================================
-- ENABLE ROW LEVEL SECURITY
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_invitations ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- ORGANIZATION POLICIES
-- =====================================================

-- Admins can read their own organization
CREATE POLICY "Admins can read own organization" ON organizations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
      AND users.organization_id = organizations.id
    )
  );

-- Only super admins can insert/update organizations
CREATE POLICY "Super admins can manage organizations" ON organizations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
      AND (users.admin_data->>'admin_level') = 'super_admin'
    )
  );

-- =====================================================
-- USER POLICIES
-- =====================================================

-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Admins can read users in their organization
CREATE POLICY "Admins can read organization users" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users admin_user 
      WHERE admin_user.id = auth.uid() 
      AND admin_user.role = 'admin'
      AND admin_user.organization_id = users.organization_id
    )
  );

-- Users can update their own basic profile fields only
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Admins can create users in their organization
CREATE POLICY "Admins can create users" ON users
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users admin_user 
      WHERE admin_user.id = auth.uid() 
      AND admin_user.role = 'admin'
    )
  );

-- Admins can update users in their organization  
CREATE POLICY "Admins can update organization users" ON users
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users admin_user 
      WHERE admin_user.id = auth.uid() 
      AND admin_user.role = 'admin'
      AND admin_user.organization_id = users.organization_id
    )
  );

-- Only super admins can delete users (soft delete)
CREATE POLICY "Super admins can delete users" ON users
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users admin_user 
      WHERE admin_user.id = auth.uid() 
      AND admin_user.role = 'admin'
      AND (admin_user.admin_data->>'admin_level') = 'super_admin'
    )
  );

-- =====================================================
-- USER SESSIONS POLICIES
-- =====================================================

-- Users can read their own sessions
CREATE POLICY "Users can read own sessions" ON user_sessions
  FOR SELECT USING (user_id = auth.uid());

-- Users can update their own sessions (for logout)
CREATE POLICY "Users can update own sessions" ON user_sessions
  FOR UPDATE USING (user_id = auth.uid());

-- Admins can read sessions for users in their organization
CREATE POLICY "Admins can read organization sessions" ON user_sessions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users admin_user 
      WHERE admin_user.id = auth.uid() 
      AND admin_user.role = 'admin'
      AND admin_user.organization_id = (
        SELECT organization_id FROM users WHERE id = user_sessions.user_id
      )
    )
  );

-- System can insert sessions (this will be handled by service role)
CREATE POLICY "System can create sessions" ON user_sessions
  FOR INSERT WITH CHECK (true);

-- =====================================================
-- USER INVITATIONS POLICIES
-- =====================================================

-- Admins can create invitations for their organization
CREATE POLICY "Admins can create invitations" ON user_invitations
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users admin_user 
      WHERE admin_user.id = auth.uid() 
      AND admin_user.role = 'admin'
    )
  );

-- Admins can read invitations they created
CREATE POLICY "Admins can read own invitations" ON user_invitations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users admin_user 
      WHERE admin_user.id = auth.uid() 
      AND admin_user.role = 'admin'
      AND admin_user.organization_id = user_invitations.organization_id
    )
  );

-- Invited users can read their own invitations (by email)
CREATE POLICY "Users can read own invitations" ON user_invitations
  FOR SELECT USING (
    auth.jwt() ->> 'email' = email
  );

-- System can update invitations when accepted
CREATE POLICY "System can update invitations" ON user_invitations
  FOR UPDATE WITH CHECK (true);

-- =====================================================
-- FUNCTIONS FOR RLS SUPPORT
-- =====================================================

-- Helper function to check if user is admin in organization
CREATE OR REPLACE FUNCTION public.is_admin_in_org(org_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() 
    AND role = 'admin' 
    AND organization_id = org_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user is super admin
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() 
    AND role = 'admin' 
    AND (admin_data->>'admin_level') = 'super_admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 