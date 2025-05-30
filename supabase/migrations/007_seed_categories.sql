-- =====================================================
-- Seed Categories for Course Management
-- Migration: 007_seed_categories
-- =====================================================

-- Insert initial categories with proper UUIDs
INSERT INTO categories (id, name, slug, description, sort_order, is_visible) VALUES
  ('550e8400-e29b-41d4-a716-446655440001'::uuid, 'AI & Machine Learning', 'ai-ml', 'Artificial Intelligence and Machine Learning courses', 1, true),
  ('550e8400-e29b-41d4-a716-446655440002'::uuid, 'Cloud Computing', 'cloud', 'Cloud platforms and deployment strategies', 2, true),
  ('550e8400-e29b-41d4-a716-446655440003'::uuid, 'Web Development', 'web-dev', 'Frontend and backend web development', 3, true),
  ('550e8400-e29b-41d4-a716-446655440004'::uuid, 'Data Science', 'data-science', 'Data analysis, visualization, and analytics', 4, true),
  ('550e8400-e29b-41d4-a716-446655440005'::uuid, 'DevOps & Infrastructure', 'devops', 'DevOps practices and infrastructure management', 5, true),
  ('550e8400-e29b-41d4-a716-446655440006'::uuid, 'Mobile Development', 'mobile-dev', 'iOS and Android app development', 6, true),
  ('550e8400-e29b-41d4-a716-446655440007'::uuid, 'Cybersecurity', 'cybersecurity', 'Information security and ethical hacking', 7, true),
  ('550e8400-e29b-41d4-a716-446655440008'::uuid, 'Database Management', 'database', 'Database design and administration', 8, true)
ON CONFLICT (id) DO NOTHING;

-- Create initial organization if it doesn't exist
INSERT INTO organizations (id, name, domain, settings, subscription_plan) VALUES
  ('550e8400-e29b-41d4-a716-446655440010'::uuid, 'LearnTechLab', 'learntechlab.com', '{}', 'premium')
ON CONFLICT (id) DO NOTHING; 