-- =====================================================
-- Course Management System - Moodle-like LMS Schema
-- Migration: 006_course_management
-- =====================================================

-- =====================================================
-- CATEGORIES TABLE (Similar to Moodle Course Categories)
-- =====================================================
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES categories(id),
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- COURSES TABLE (Core Course Management)
-- =====================================================
CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  short_description TEXT,
  description TEXT,
  category_id UUID REFERENCES categories(id),
  
  -- Course Settings (Moodle-like)
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  enrollment_start_date TIMESTAMP WITH TIME ZONE,
  enrollment_end_date TIMESTAMP WITH TIME ZONE,
  
  -- Course Format & Display
  format VARCHAR(50) DEFAULT 'topics', -- topics, weeks, social, etc.
  show_grades BOOLEAN DEFAULT true,
  show_reports BOOLEAN DEFAULT true,
  max_participants INTEGER,
  
  -- Course Access Control
  enrollment_method VARCHAR(50) DEFAULT 'manual', -- manual, self, guest, etc.
  enrollment_key VARCHAR(100), -- For self-enrollment
  guest_access BOOLEAN DEFAULT false,
  
  -- Course Status
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived', 'hidden')),
  is_featured BOOLEAN DEFAULT false,
  
  -- Pricing & Certification
  price DECIMAL(10,2) DEFAULT 0,
  currency VARCHAR(10) DEFAULT 'USD',
  certificate_enabled BOOLEAN DEFAULT false,
  completion_tracking BOOLEAN DEFAULT true,
  
  -- Course Metadata
  language VARCHAR(10) DEFAULT 'en',
  tags TEXT[], -- Array of tags
  thumbnail_url TEXT,
  
  -- Organization & Creation
  organization_id UUID REFERENCES organizations(id),
  created_by UUID REFERENCES users(id),
  last_modified_by UUID REFERENCES users(id),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- COURSE SECTIONS (Moodle Topics/Weeks)
-- =====================================================
CREATE TABLE course_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Section Settings
  section_number INTEGER NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  start_date TIMESTAMP WITH TIME ZONE, -- For weekly format
  end_date TIMESTAMP WITH TIME ZONE,
  
  -- Content Organization
  sort_order INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(course_id, section_number)
);

-- =====================================================
-- COURSE ACTIVITIES (Modules/Resources/Activities)
-- =====================================================
CREATE TABLE course_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  section_id UUID REFERENCES course_sections(id) ON DELETE CASCADE,
  
  -- Activity Details
  title VARCHAR(255) NOT NULL,
  description TEXT,
  activity_type VARCHAR(50) NOT NULL, -- video, document, quiz, assignment, forum, etc.
  
  -- Activity Content
  content_data JSONB DEFAULT '{}', -- Flexible content storage
  resource_url TEXT, -- For external resources
  file_attachments TEXT[], -- Array of file URLs
  
  -- Activity Settings
  is_visible BOOLEAN DEFAULT true,
  is_mandatory BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  
  -- Grading & Completion
  max_grade DECIMAL(5,2) DEFAULT 0,
  grade_to_pass DECIMAL(5,2) DEFAULT 0,
  completion_expected_date TIMESTAMP WITH TIME ZONE,
  
  -- Activity Restrictions
  availability_conditions JSONB DEFAULT '{}',
  time_limit_minutes INTEGER,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- COURSE ENROLLMENTS (User-Course Relationships)
-- =====================================================
CREATE TABLE course_enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  
  -- Enrollment Details
  role VARCHAR(50) NOT NULL DEFAULT 'student', -- student, teacher, moderator, etc.
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'completed', 'dropped')),
  
  -- Enrollment Tracking
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_accessed_at TIMESTAMP WITH TIME ZONE,
  completion_date TIMESTAMP WITH TIME ZONE,
  
  -- Progress Tracking
  progress_percentage DECIMAL(5,2) DEFAULT 0,
  time_spent_minutes INTEGER DEFAULT 0,
  
  -- Grading
  final_grade DECIMAL(5,2),
  grade_letter VARCHAR(5),
  
  UNIQUE(user_id, course_id)
);

-- =====================================================
-- ACTIVITY COMPLETIONS (Progress Tracking)
-- =====================================================
CREATE TABLE activity_completions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  activity_id UUID REFERENCES course_activities(id) ON DELETE CASCADE,
  
  -- Completion Details
  status VARCHAR(50) DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed', 'failed')),
  completion_date TIMESTAMP WITH TIME ZONE,
  time_spent_minutes INTEGER DEFAULT 0,
  
  -- Grading & Feedback
  grade DECIMAL(5,2),
  feedback TEXT,
  attempts INTEGER DEFAULT 0,
  
  -- Completion Data
  completion_data JSONB DEFAULT '{}', -- Activity-specific completion data
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, activity_id)
);

-- =====================================================
-- COURSE FORUMS (Discussion Areas)
-- =====================================================
CREATE TABLE course_forums (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Forum Settings
  forum_type VARCHAR(50) DEFAULT 'general', -- general, announcements, q_and_a
  allow_discussions BOOLEAN DEFAULT true,
  require_approval BOOLEAN DEFAULT false,
  
  -- Access Control
  is_visible BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- FORUM DISCUSSIONS
-- =====================================================
CREATE TABLE forum_discussions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  forum_id UUID REFERENCES course_forums(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  
  -- Discussion Content
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  
  -- Discussion Settings
  is_pinned BOOLEAN DEFAULT false,
  is_locked BOOLEAN DEFAULT false,
  
  -- Tracking
  views_count INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  last_reply_at TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- FORUM REPLIES
-- =====================================================
CREATE TABLE forum_replies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  discussion_id UUID REFERENCES forum_discussions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  parent_reply_id UUID REFERENCES forum_replies(id), -- For threaded replies
  
  -- Reply Content
  content TEXT NOT NULL,
  attachments TEXT[], -- Array of file URLs
  
  -- Reply Status
  is_approved BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- GRADEBOOK (Course Grades Management)
-- =====================================================
CREATE TABLE gradebook_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  activity_id UUID REFERENCES course_activities(id) ON DELETE SET NULL,
  
  -- Grade Item Details
  item_name VARCHAR(255) NOT NULL,
  item_type VARCHAR(50) DEFAULT 'manual', -- manual, activity, category
  category_name VARCHAR(100),
  
  -- Grading Settings
  grade_max DECIMAL(5,2) DEFAULT 100,
  grade_min DECIMAL(5,2) DEFAULT 0,
  grade_pass DECIMAL(5,2),
  weight DECIMAL(5,2) DEFAULT 1.0,
  
  -- Display Settings
  is_hidden BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- COURSE GRADES (Individual Student Grades)
-- =====================================================
CREATE TABLE course_grades (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  gradebook_item_id UUID REFERENCES gradebook_items(id) ON DELETE CASCADE,
  
  -- Grade Details
  grade_value DECIMAL(5,2),
  grade_letter VARCHAR(5),
  feedback TEXT,
  
  -- Grading Metadata
  graded_by UUID REFERENCES users(id),
  graded_at TIMESTAMP WITH TIME ZONE,
  is_final BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, gradebook_item_id)
);

-- =====================================================
-- COURSE ANNOUNCEMENTS
-- =====================================================
CREATE TABLE course_announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  author_id UUID REFERENCES users(id),
  
  -- Announcement Content
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  
  -- Publishing Settings
  is_published BOOLEAN DEFAULT false,
  publish_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Visibility
  target_roles VARCHAR(50)[] DEFAULT ARRAY['student', 'teacher'], -- Which roles can see this
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Categories
CREATE INDEX idx_categories_parent_id ON categories(parent_id);
CREATE INDEX idx_categories_slug ON categories(slug);

-- Courses
CREATE INDEX idx_courses_category_id ON courses(category_id);
CREATE INDEX idx_courses_organization_id ON courses(organization_id);
CREATE INDEX idx_courses_status ON courses(status);
CREATE INDEX idx_courses_slug ON courses(slug);
CREATE INDEX idx_courses_created_by ON courses(created_by);

-- Course Sections
CREATE INDEX idx_course_sections_course_id ON course_sections(course_id);
CREATE INDEX idx_course_sections_section_number ON course_sections(course_id, section_number);

-- Course Activities
CREATE INDEX idx_course_activities_course_id ON course_activities(course_id);
CREATE INDEX idx_course_activities_section_id ON course_activities(section_id);
CREATE INDEX idx_course_activities_type ON course_activities(activity_type);

-- Course Enrollments
CREATE INDEX idx_course_enrollments_user_id ON course_enrollments(user_id);
CREATE INDEX idx_course_enrollments_course_id ON course_enrollments(course_id);
CREATE INDEX idx_course_enrollments_status ON course_enrollments(status);

-- Activity Completions
CREATE INDEX idx_activity_completions_user_id ON activity_completions(user_id);
CREATE INDEX idx_activity_completions_course_id ON activity_completions(course_id);
CREATE INDEX idx_activity_completions_activity_id ON activity_completions(activity_id);
CREATE INDEX idx_activity_completions_status ON activity_completions(status);

-- Forums
CREATE INDEX idx_course_forums_course_id ON course_forums(course_id);
CREATE INDEX idx_forum_discussions_forum_id ON forum_discussions(forum_id);
CREATE INDEX idx_forum_discussions_user_id ON forum_discussions(user_id);
CREATE INDEX idx_forum_replies_discussion_id ON forum_replies(discussion_id);
CREATE INDEX idx_forum_replies_user_id ON forum_replies(user_id);

-- Gradebook
CREATE INDEX idx_gradebook_items_course_id ON gradebook_items(course_id);
CREATE INDEX idx_course_grades_user_id ON course_grades(user_id);
CREATE INDEX idx_course_grades_course_id ON course_grades(course_id);

-- Announcements
CREATE INDEX idx_course_announcements_course_id ON course_announcements(course_id);
CREATE INDEX idx_course_announcements_author_id ON course_announcements(author_id); 