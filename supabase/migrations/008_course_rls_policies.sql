-- =====================================================
-- Course Management RLS Policies
-- Migration: 008_course_rls_policies
-- =====================================================

-- =====================================================
-- ENABLE RLS ON COURSE TABLES
-- =====================================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_forums ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE gradebook_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_announcements ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- CATEGORIES POLICIES
-- =====================================================

-- Everyone can read visible categories
CREATE POLICY "Anyone can read visible categories" ON categories
  FOR SELECT USING (is_visible = true);

-- Admins can manage categories
CREATE POLICY "Admins can manage categories" ON categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- =====================================================
-- COURSES POLICIES
-- =====================================================

-- Anyone can read published courses
CREATE POLICY "Anyone can read published courses" ON courses
  FOR SELECT USING (status = 'published');

-- Teachers and admins can read all courses in their organization
CREATE POLICY "Teachers and admins can read organization courses" ON courses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('teacher', 'admin')
      AND users.organization_id = courses.organization_id
    )
  );

-- Students can read courses they are enrolled in
CREATE POLICY "Students can read enrolled courses" ON courses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM course_enrollments 
      WHERE course_enrollments.course_id = courses.id 
      AND course_enrollments.user_id = auth.uid()
      AND course_enrollments.status = 'active'
    )
  );

-- Teachers and admins can create courses in their organization
CREATE POLICY "Teachers and admins can create courses" ON courses
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('teacher', 'admin')
      AND users.organization_id = organization_id
    )
  );

-- Course creators and admins can update courses
CREATE POLICY "Course creators and admins can update courses" ON courses
  FOR UPDATE USING (
    created_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
      AND users.organization_id = courses.organization_id
    )
  );

-- Only admins can delete courses
CREATE POLICY "Admins can delete courses" ON courses
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
      AND users.organization_id = courses.organization_id
    )
  );

-- =====================================================
-- COURSE SECTIONS POLICIES
-- =====================================================

-- Users can read sections if they can read the course
CREATE POLICY "Users can read course sections" ON course_sections
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM courses 
      WHERE courses.id = course_sections.course_id
      -- This will use the courses RLS policies
    )
  );

-- Teachers and admins can manage sections in their courses
CREATE POLICY "Teachers and admins can manage course sections" ON course_sections
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM courses 
      JOIN users ON users.id = auth.uid()
      WHERE courses.id = course_sections.course_id
      AND (
        courses.created_by = auth.uid() OR
        (users.role = 'admin' AND users.organization_id = courses.organization_id)
      )
    )
  );

-- =====================================================
-- COURSE ENROLLMENTS POLICIES
-- =====================================================

-- Users can read their own enrollments
CREATE POLICY "Users can read own enrollments" ON course_enrollments
  FOR SELECT USING (user_id = auth.uid());

-- Teachers and admins can read enrollments in their courses
CREATE POLICY "Teachers and admins can read course enrollments" ON course_enrollments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM courses 
      JOIN users ON users.id = auth.uid()
      WHERE courses.id = course_enrollments.course_id
      AND (
        courses.created_by = auth.uid() OR
        (users.role IN ('teacher', 'admin') AND users.organization_id = courses.organization_id)
      )
    )
  );

-- Teachers and admins can create enrollments
CREATE POLICY "Teachers and admins can create enrollments" ON course_enrollments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM courses 
      JOIN users ON users.id = auth.uid()
      WHERE courses.id = course_id
      AND (
        courses.created_by = auth.uid() OR
        (users.role IN ('teacher', 'admin') AND users.organization_id = courses.organization_id)
      )
    )
  );

-- Teachers and admins can update enrollments
CREATE POLICY "Teachers and admins can update enrollments" ON course_enrollments
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM courses 
      JOIN users ON users.id = auth.uid()
      WHERE courses.id = course_enrollments.course_id
      AND (
        courses.created_by = auth.uid() OR
        (users.role IN ('teacher', 'admin') AND users.organization_id = courses.organization_id)
      )
    )
  );

-- =====================================================
-- TEMPORARY BYPASS FOR DEVELOPMENT
-- =====================================================

-- For now, allow anonymous access to courses table for testing
CREATE POLICY "Allow anonymous course access for development" ON courses
  FOR ALL TO anon USING (true) WITH CHECK (true);

CREATE POLICY "Allow anonymous category access for development" ON categories
  FOR ALL TO anon USING (true) WITH CHECK (true);

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Function to check if user can access course
CREATE OR REPLACE FUNCTION public.user_can_access_course(course_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if user is enrolled, is course creator, or is admin in organization
  RETURN EXISTS (
    SELECT 1 FROM courses c
    LEFT JOIN course_enrollments ce ON ce.course_id = c.id AND ce.user_id = auth.uid()
    LEFT JOIN users u ON u.id = auth.uid()
    WHERE c.id = course_id
    AND (
      c.status = 'published' OR  -- Published courses are visible to all
      ce.user_id IS NOT NULL OR  -- User is enrolled
      c.created_by = auth.uid() OR  -- User created the course
      (u.role = 'admin' AND u.organization_id = c.organization_id)  -- User is admin in org
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 