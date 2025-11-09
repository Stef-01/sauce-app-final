-- Create function to match projects against a set of skill tags
-- Migration: 20251109000000_create_project_matching_function.sql

-- This function accepts an array of text skill tags and returns projects
-- with a computed match_count (number of overlapping tags) ordered desc.
-- It relies on projects.primary_skill_tags being text[] and indexed with GIN.

CREATE OR REPLACE FUNCTION match_projects_for_skill_tags(skill_tags TEXT[])
RETURNS TABLE(
  project_id INT,
  company_name TEXT,
  project_title TEXT,
  brief TEXT,
  primary_skill_tags TEXT[],
  match_count INT
) AS $$
  SELECT
    p.project_id,
    p.company_name,
    p.project_title,
    p.brief,
    p.primary_skill_tags,
    (
      SELECT COUNT(*)
      FROM (
        SELECT UNNEST(p.primary_skill_tags)
        INTERSECT
        SELECT UNNEST(skill_tags)
      ) AS common
    )::INT AS match_count
  FROM projects p
  WHERE p.primary_skill_tags && skill_tags
  ORDER BY match_count DESC, p.posted_at DESC;
$$ LANGUAGE sql STABLE;

-- Grant execute to authenticated role (Supabase convention may vary)
GRANT EXECUTE ON FUNCTION match_projects_for_skill_tags(TEXT[]) TO authenticated;

-- Note: A view vw_project_skill_matches can be created after user_profiles table exists
-- Use the function match_projects_for_skill_tags(...) when you want matches for a single profile's tags.
