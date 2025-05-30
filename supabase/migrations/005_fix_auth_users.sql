-- =====================================================
-- Fix Auth Users - Match Supabase Auth IDs
-- Migration: 005_fix_auth_users
-- =====================================================

-- First, temporarily disable foreign key constraints for easier updates
SET session_replication_role = replica;

-- Update user IDs to match auth IDs (you'll need to replace these with actual auth IDs)
-- Admin user
UPDATE users 
SET id = '44573743-3421-495f-acda-7c3f4e638cf6', 
    first_name = 'System', 
    last_name = 'Administrator'
WHERE email = 'admin@learntechlab.com';

-- Student user  
UPDATE users 
SET id = 'bbcf930f-4b8b-45d1-9f70-8359ec494a5a',
    first_name = 'John',
    last_name = 'Student' 
WHERE email = 'student1@learntechlab.com';

-- Teacher user
UPDATE users 
SET id = '348f9002-267a-4506-814b-377c73359e2e',
    first_name = 'Jane', 
    last_name = 'Teacher'
WHERE email = 'teacher1@learntechlab.com';

-- Update created_by references
UPDATE users 
SET created_by = '44573743-3421-495f-acda-7c3f4e638cf6'
WHERE created_by IS NOT NULL;

-- Update invited_by references in user_invitations if any exist
UPDATE user_invitations 
SET invited_by = '44573743-3421-495f-acda-7c3f4e638cf6'
WHERE invited_by IS NOT NULL;

-- Re-enable foreign key constraints
SET session_replication_role = DEFAULT; 