# Environment Setup

## Required Environment Variables

To run this application with database integration, you need to set up the following environment variables:

### 1. Create `.env.local` file

Create a `.env.local` file in the root directory of your project with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: Database URL for direct connections
DATABASE_URL=postgresql://postgres:password@localhost:54322/postgres
```

### 2. Getting Your Supabase Credentials

#### Option A: Supabase Cloud
1. Go to [supabase.com](https://supabase.com)
2. Create a new project or use an existing one
3. Go to Settings → API
4. Copy the Project URL and anon public key

#### Option B: Local Supabase (Development)
1. Install Supabase CLI: `npm install -g supabase`
2. Run `supabase start` in your project directory
3. Use the local instance URLs:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-local-anon-key-from-supabase-start-output
   ```

### 3. Database Migration

✅ **Migration Status: COMPLETED**

The following migrations have been applied to your Supabase database:
- `006_course_management.sql` - Course management schema with all tables
- `007_seed_categories.sql` - Initial categories and organization data

Tables created:
- ✅ categories
- ✅ courses  
- ✅ course_sections
- ✅ course_enrollments
- ✅ course_activities
- ✅ activity_completions
- ✅ course_forums
- ✅ forum_posts
- ✅ gradebook_items
- ✅ gradebook_grades
- ✅ course_announcements
- ✅ organizations

### 4. Available Categories (with UUIDs)

The following categories are now available in your database:

| UUID | Name | Slug |
|------|------|------|
| `550e8400-e29b-41d4-a716-446655440001` | AI & Machine Learning | ai-ml |
| `550e8400-e29b-41d4-a716-446655440002` | Cloud Computing | cloud |
| `550e8400-e29b-41d4-a716-446655440003` | Web Development | web-dev |
| `550e8400-e29b-41d4-a716-446655440004` | Data Science | data-science |
| `550e8400-e29b-41d4-a716-446655440005` | DevOps & Infrastructure | devops |
| `550e8400-e29b-41d4-a716-446655440006` | Mobile Development | mobile-dev |
| `550e8400-e29b-41d4-a716-446655440007` | Cybersecurity | cybersecurity |
| `550e8400-e29b-41d4-a716-446655440008` | Database Management | database |

### 5. Organization Data

Default organization created:
- **ID**: `550e8400-e29b-41d4-a716-446655440010`
- **Name**: LearnTechLab
- **Domain**: learntechlab.com

### 6. Fallback Behavior

If environment variables are not set or Supabase is not accessible, the application will fall back to mock data for development purposes.

## Testing the Database Integration

1. Start the development server: `npm run dev`
2. Login as admin: `admin@learntechlab.com` / `demo123`
3. Navigate to "Create Course"
4. Fill out the form and publish a course
5. Check if the course appears in the courses listing
6. Verify data persistence by refreshing the page

## Troubleshooting

### Common Issues:

1. **"Failed to fetch" errors**
   - Check if SUPABASE_URL and SUPABASE_ANON_KEY are correctly set
   - Verify network connectivity to Supabase instance

2. **Database connection errors**
   - Ensure migrations have been applied ✅ **DONE**
   - Check if required tables exist ✅ **VERIFIED**

3. **Authentication issues**
   - Verify RLS (Row Level Security) policies are properly configured
   - Check if user has necessary permissions

### Debug Mode:

Enable debug logging by adding to your `.env.local`:
```bash
DEBUG=supabase:*
```

## Next Steps

Now that your database is set up:

1. Make sure your `.env.local` file has the correct Supabase credentials
2. Test course creation functionality
3. Verify data is being saved to the database
4. Check that categories are loading properly in the course creation form 