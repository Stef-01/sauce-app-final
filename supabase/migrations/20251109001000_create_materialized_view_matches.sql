-- Materialized view to precompute project <-> profile match scores
-- Migration: 20251109001000_create_materialized_view_matches.sql

-- Purpose:
-- Precompute overlaps between `projects.primary_skill_tags` and `user_profiles.skill_tags`
-- so the application can query matches quickly without executing set operations on the fly.
-- The materialized view contains one row per (project, profile) pair that has at least
-- one overlapping tag, plus the list of matched tags and a match_count used for ordering.

-- Note: Refreshing this materialized view will lock it for readers during a full refresh.
-- For large datasets consider scheduling periodic refreshes during off-peak hours or
-- using a concurrency-safe approach (REFRESH MATERIALIZED VIEW CONCURRENTLY) which
-- requires creating a unique index on the materialized view first and may not be
-- supported inside the same transactional migration runner.

CREATE MATERIALIZED VIEW IF NOT EXISTS mv_project_profile_matches AS
SELECT
  p.project_id,
  p.company_name,
  p.project_title,
  p.brief,
  p.primary_skill_tags,
  up.user_id AS profile_id, -- Using user_id as profile_id for compatibility
  up.user_id,
  up.skill_tags,
  -- matched_tags: intersection of primary_skill_tags and profile skill_tags
  (SELECT ARRAY(SELECT UNNEST(p.primary_skill_tags) INTERSECT SELECT UNNEST(up.skill_tags))) AS matched_tags,
  -- match_count: number of matched tags
  COALESCE(
    cardinality((SELECT ARRAY(SELECT UNNEST(p.primary_skill_tags) INTERSECT SELECT UNNEST(up.skill_tags)))),
    0
  )::INT AS match_count,
  p.posted_at,
  up.created_at AS profile_created_at
FROM projects p
JOIN user_profiles up
  ON p.primary_skill_tags && up.skill_tags
WHERE up.skill_tags IS NOT NULL
  AND array_length(up.skill_tags, 1) > 0
  AND p.primary_skill_tags IS NOT NULL
  AND array_length(p.primary_skill_tags, 1) > 0;

-- Indexes to speed queries against the materialized view
CREATE INDEX IF NOT EXISTS idx_mv_ppm_profile_id ON mv_project_profile_matches(profile_id);
CREATE INDEX IF NOT EXISTS idx_mv_ppm_match_count ON mv_project_profile_matches(match_count DESC);
CREATE INDEX IF NOT EXISTS idx_mv_ppm_project_id ON mv_project_profile_matches(project_id);
-- GIN index on matched_tags (useful if you search by specific tags in the view)
CREATE INDEX IF NOT EXISTS idx_mv_ppm_matched_tags_gin ON mv_project_profile_matches USING GIN (matched_tags);

-- Optional: unique index to allow CONCURRENT refresh (if you later choose to use REFRESH MATERIALIZED VIEW CONCURRENTLY)
-- WARNING: creating unique index requires the underlying view to have unique rows for (project_id, profile_id)
-- and may fail if duplicates exist. Create only if you know rows are unique.
-- CREATE UNIQUE INDEX CONCURRENTLY idx_mv_ppm_unique_project_profile ON mv_project_profile_matches(project_id, profile_id);

-- Refresh helper (simple wrapper) — call this to refresh the materialized view from SQL/clients
CREATE OR REPLACE FUNCTION refresh_mv_project_profile_matches()
RETURNS VOID LANGUAGE plpgsql AS $$
BEGIN
  -- Use non-CONCURRENT refresh here; switch to CONCURRENTLY if you create a unique index and need non-blocking refresh
  REFRESH MATERIALIZED VIEW mv_project_profile_matches;
END;
$$;

GRANT SELECT ON mv_project_profile_matches TO public;
GRANT EXECUTE ON FUNCTION refresh_mv_project_profile_matches() TO authenticated;

-- Usage notes:
-- 1) To refresh manually:
--    SELECT refresh_mv_project_profile_matches();
-- 2) To get top matches for a user_id (profile_id):
--    SELECT * FROM mv_project_profile_matches WHERE profile_id = <user_id> ORDER BY match_count DESC, posted_at DESC;
-- 3) For frequent real-time queries consider:
--    - Refreshing the materialized view on a schedule (e.g., nightly) via a cron job or pg_cron.
--    - Or implementing an incremental refresh approach that updates only changed projects or profiles.

-- End of migration
