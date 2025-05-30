-- =====================================================
-- Seed Data for Testing
-- Migration: 003_seed_data
-- =====================================================

-- =====================================================
-- CREATE SAMPLE ORGANIZATION
-- =====================================================
INSERT INTO organizations (
  id,
  name,
  domain,
  subdomain,
  settings,
  subscription_plan
) VALUES (
  'a0e6b8c4-4f4d-4c4e-8f4d-4c4e8f4d4c4e',
  'LearnTechLab',
  'learntechlab.com',
  'main',
  '{
    "max_users": 1000,
    "features": ["user_management", "analytics", "custom_branding"],
    "theme": {
      "primary_color": "#3B82F6",
      "logo_url": "/logo.png"
    }
  }',
  'enterprise'
);

-- =====================================================
-- CREATE SUPER ADMIN USER
-- =====================================================
-- Note: In production, you should hash the password properly
-- This is using bcrypt hash for 'admin123' - DO NOT use this in production!
INSERT INTO users (
  id,
  email,
  password_hash,
  first_name,
  last_name,
  role,
  organization_id,
  status,
  email_verified,
  admin_data,
  created_by
) VALUES (
  'b1f7c9d5-5e5e-4d5e-9f5e-5d5e9f5e5d5e',
  'admin@learntechlab.com',
  '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewWG/0UkrT/Ku.V2', -- 'admin123'
  'System',
  'Administrator',
  'admin',
  'a0e6b8c4-4f4d-4c4e-8f4d-4c4e8f4d4c4e',
  'active',
  true,
  '{
    "admin_level": "super_admin",
    "can_create_admins": true,
    "permissions_scope": "organization",
    "managed_departments": ["All"],
    "reporting_preferences": {
      "frequency": "daily",
      "format": "dashboard"
    }
  }',
  NULL
);

-- =====================================================
-- CREATE SAMPLE STUDENTS
-- =====================================================
INSERT INTO users (
  id,
  email,
  password_hash,
  first_name,
  last_name,
  role,
  organization_id,
  status,
  email_verified,
  student_data,
  created_by
) VALUES 
(
  'c2a8d0e6-6f6f-5e6f-af6f-6e6faf6f6e6f',
  'student1@learntechlab.com',
  '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewWG/0UkrT/Ku.V2', -- 'student123'
  'Alice',
  'Johnson',
  'student',
  'a0e6b8c4-4f4d-4c4e-8f4d-4c4e8f4d4c4e',
  'active',
  true,
  '{
    "enrollment_date": "2024-01-15",
    "level": "beginner",
    "interests": ["AI Development", "Cloud Computing"],
    "learning_preferences": {
      "pace": "self-paced",
      "format": "mixed"
    },
    "progress": {
      "completed_courses": 0,
      "total_hours": 0,
      "certificates_earned": 0
    }
  }',
  'b1f7c9d5-5e5e-4d5e-9f5e-5d5e9f5e5d5e'
),
(
  'd3b9e1f7-7a7a-6f7a-ba7a-7f7aba7a7f7a',
  'student2@learntechlab.com',
  '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewWG/0UkrT/Ku.V2', -- 'student123'
  'Bob',
  'Smith',
  'student',
  'a0e6b8c4-4f4d-4c4e-8f4d-4c4e8f4d4c4e',
  'active',
  true,
  '{
    "enrollment_date": "2024-01-20",
    "level": "intermediate",
    "interests": ["Web Development", "DevOps"],
    "learning_preferences": {
      "pace": "instructor-led",
      "format": "live"
    },
    "progress": {
      "completed_courses": 2,
      "total_hours": 45,
      "certificates_earned": 1
    }
  }',
  'b1f7c9d5-5e5e-4d5e-9f5e-5d5e9f5e5d5e'
);

-- =====================================================
-- CREATE SAMPLE TEACHERS
-- =====================================================
INSERT INTO users (
  id,
  email,
  password_hash,
  first_name,
  last_name,
  role,
  organization_id,
  status,
  email_verified,
  bio,
  teacher_data,
  created_by
) VALUES 
(
  'e4c0f2a8-8b8b-7a8b-cb8b-8a8bcb8b8a8b',
  'teacher1@learntechlab.com',
  '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewWG/0UkrT/Ku.V2', -- 'teacher123'
  'Dr. Sarah',
  'Wilson',
  'teacher',
  'a0e6b8c4-4f4d-4c4e-8f4d-4c4e8f4d4c4e',
  'active',
  true,
  'AI/ML expert with 10+ years in industry and academia. Specializes in deep learning and natural language processing.',
  '{
    "specializations": ["AI/Machine Learning", "Data Science", "Python"],
    "experience_years": 10,
    "education": [
      {
        "degree": "PhD Computer Science",
        "institution": "Stanford University",
        "year": 2018,
        "field": "Artificial Intelligence"
      }
    ],
    "certifications": [
      "Google Cloud Professional ML Engineer",
      "AWS Machine Learning Specialty"
    ],
    "hourly_rate": 150,
    "availability": {
      "timezone": "EST",
      "hours": ["9-17"],
      "days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    },
    "course_creation_permissions": true,
    "stats": {
      "students_taught": 245,
      "courses_created": 8,
      "average_rating": 4.8
    }
  }',
  'b1f7c9d5-5e5e-4d5e-9f5e-5d5e9f5e5d5e'
),
(
  'f5d1a3b9-9c9c-8b9c-dc9c-9b9cdc9c9b9c',
  'teacher2@learntechlab.com',
  '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewWG/0UkrT/Ku.V2', -- 'teacher123'
  'Mark',
  'Thompson',
  'teacher',
  'a0e6b8c4-4f4d-4c4e-8f4d-4c4e8f4d4c4e',
  'active',
  true,
  'Cloud architect and DevOps specialist. Former AWS Solutions Architect with expertise in building scalable systems.',
  '{
    "specializations": ["Cloud Computing", "DevOps", "AWS", "Kubernetes"],
    "experience_years": 8,
    "education": [
      {
        "degree": "MS Computer Engineering",
        "institution": "MIT",
        "year": 2016,
        "field": "Distributed Systems"
      }
    ],
    "certifications": [
      "AWS Solutions Architect Professional",
      "Kubernetes Administrator (CKA)",
      "Terraform Associate"
    ],
    "hourly_rate": 120,
    "availability": {
      "timezone": "PST",
      "hours": ["10-18"],
      "days": ["Monday", "Wednesday", "Friday", "Saturday"]
    },
    "course_creation_permissions": true,
    "stats": {
      "students_taught": 189,
      "courses_created": 5,
      "average_rating": 4.9
    }
  }',
  'b1f7c9d5-5e5e-4d5e-9f5e-5d5e9f5e5d5e'
);

-- =====================================================
-- CREATE SAMPLE INVITATIONS
-- =====================================================
INSERT INTO user_invitations (
  id,
  email,
  role,
  invited_by,
  organization_id,
  invitation_token,
  expires_at
) VALUES 
(
  'a1b2c3d4-1234-5678-9abc-def123456789',
  'newstudent@example.com',
  'student',
  'b1f7c9d5-5e5e-4d5e-9f5e-5d5e9f5e5d5e',
  'a0e6b8c4-4f4d-4c4e-8f4d-4c4e8f4d4c4e',
  'inv_student_' || encode(gen_random_bytes(16), 'base64'),
  NOW() + INTERVAL '7 days'
),
(
  'b2c3d4e5-2345-6789-abcd-ef1234567890',
  'newteacher@example.com',
  'teacher',
  'b1f7c9d5-5e5e-4d5e-9f5e-5d5e9f5e5d5e',
  'a0e6b8c4-4f4d-4c4e-8f4d-4c4e8f4d4c4e',
  'inv_teacher_' || encode(gen_random_bytes(16), 'base64'),
  NOW() + INTERVAL '7 days'
);

-- =====================================================
-- UTILITY QUERIES FOR TESTING
-- =====================================================

-- Query to check organization structure
-- SELECT 
--   o.name as organization,
--   u.email,
--   u.first_name,
--   u.last_name,
--   u.role,
--   u.status,
--   u.created_at
-- FROM organizations o
-- JOIN users u ON o.id = u.organization_id
-- ORDER BY u.role, u.created_at; 