-- Migration: 20251109002000_create_community_schema.sql
-- Create Community schema: users, profiles, resumes, skills, cards, swipes, matches, suggestions, network edges

-- Extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto; -- for gen_random_uuid or secure functions if needed
CREATE EXTENSION IF NOT EXISTS vector;    -- for embeddings (pgvector)

-- Users
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student','alumni','employer','admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- Universities
CREATE TABLE IF NOT EXISTS universities (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  domain TEXT
);

-- User profiles
CREATE TABLE IF NOT EXISTS user_profiles (
  user_id BIGINT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  university_id BIGINT REFERENCES universities(id),
  full_name TEXT,
  grad_year INTEGER,
  current_title TEXT,
  current_company TEXT,
  location TEXT,
  headline TEXT,
  seeking_roles TEXT[],
  open_to_connect BOOLEAN NOT NULL DEFAULT TRUE,
  last_active_at TIMESTAMPTZ
);

-- Alumni specific
CREATE TABLE IF NOT EXISTS alumni_details (
  user_id BIGINT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  years_experience INTEGER,
  industries TEXT[],
  willing_to_mentor BOOLEAN NOT NULL DEFAULT FALSE,
  open_to_projects BOOLEAN NOT NULL DEFAULT FALSE
);

-- Resumes
CREATE TABLE IF NOT EXISTS resumes (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  parsed_text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- Skills and user_skills
CREATE TABLE IF NOT EXISTS skills (
  id BIGSERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS user_skills (
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  skill_id BIGINT NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  level SMALLINT,
  source TEXT,
  PRIMARY KEY (user_id, skill_id)
);

-- Interests
CREATE TABLE IF NOT EXISTS user_interests (
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  interest TEXT NOT NULL,
  PRIMARY KEY (user_id, interest)
);

-- Embeddings table for AI matching
CREATE TABLE IF NOT EXISTS user_embeddings (
  user_id BIGINT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  embedding vector(768),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Community cards
CREATE TABLE IF NOT EXISTS community_cards (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  subtitle TEXT,
  company TEXT,
  role_label TEXT,
  tags TEXT[],
  is_alumni BOOLEAN NOT NULL,
  is_student BOOLEAN NOT NULL,
  visible_in_swipe BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Swipes and matches
CREATE TABLE IF NOT EXISTS community_swipes (
  id BIGSERIAL PRIMARY KEY,
  swiper_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  target_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  direction TEXT NOT NULL CHECK (direction IN ('like','pass')),
  source TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (swiper_user_id, target_user_id)
);

CREATE TABLE IF NOT EXISTS community_matches (
  id BIGSERIAL PRIMARY KEY,
  user_a_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  user_b_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  context TEXT
);

-- Ensure uniqueness of the canonical ordered pair (user_a_id, user_b_id)
CREATE UNIQUE INDEX IF NOT EXISTS idx_community_matches_unique_pair ON community_matches(user_a_id, user_b_id);

-- Suggested connections
CREATE TABLE IF NOT EXISTS suggested_connections (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  suggested_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  score REAL NOT NULL,
  reason_summary TEXT,
  source_model TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  UNIQUE (user_id, suggested_user_id)
);

-- Network edges
CREATE TABLE IF NOT EXISTS network_edges (
  id BIGSERIAL PRIMARY KEY,
  from_user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  to_user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  edge_type TEXT NOT NULL,
  weight REAL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes to help queries
CREATE INDEX IF NOT EXISTS idx_user_profiles_university ON user_profiles(university_id);
CREATE INDEX IF NOT EXISTS idx_user_skills_skill_id ON user_skills(skill_id);
CREATE INDEX IF NOT EXISTS idx_user_interests_user ON user_interests(user_id);
CREATE INDEX IF NOT EXISTS idx_user_embeddings_updated ON user_embeddings(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_community_cards_user ON community_cards(user_id);
CREATE INDEX IF NOT EXISTS idx_community_swipes_swiper ON community_swipes(swiper_user_id);
CREATE INDEX IF NOT EXISTS idx_suggested_connections_user ON suggested_connections(user_id);
CREATE INDEX IF NOT EXISTS idx_network_edges_from ON network_edges(from_user_id);

-- Row level security and simple policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_swipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE suggested_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE network_edges ENABLE ROW LEVEL SECURITY;

-- Public read access for profiles and cards; authenticated users can insert swipes and suggestions
CREATE POLICY "Profiles viewable by everyone" ON user_profiles FOR SELECT TO public USING (true);
CREATE POLICY "Cards viewable by everyone" ON community_cards FOR SELECT TO public USING (visible_in_swipe = true);

CREATE POLICY "Authenticated can insert swipes" ON community_swipes FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can insert suggestions" ON suggested_connections FOR INSERT TO authenticated WITH CHECK (true);

-- Resumes: authenticated users can insert; read access should be enforced by application or tightened later
CREATE POLICY "Resumes viewable by authenticated" ON resumes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Resumes insert by authenticated" ON resumes FOR INSERT TO authenticated WITH CHECK (true);

-- Simple trigger to create match when swipes cross
-- Function checks if target already liked swiper; if so, create community_matches row
CREATE OR REPLACE FUNCTION fn_create_match_on_swipe() RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE
  a BIGINT;
  b BIGINT;
BEGIN
  IF NEW.direction = 'like' THEN
    -- check if reciprocal like exists
    IF EXISTS (SELECT 1 FROM community_swipes s WHERE s.swiper_user_id = NEW.target_user_id AND s.target_user_id = NEW.swiper_user_id AND s.direction = 'like') THEN
      a := LEAST(NEW.swiper_user_id, NEW.target_user_id);
      b := GREATEST(NEW.swiper_user_id, NEW.target_user_id);
      -- insert only if not already present (use ordered pair)
      IF NOT EXISTS (SELECT 1 FROM community_matches m WHERE m.user_a_id = a AND m.user_b_id = b) THEN
        INSERT INTO community_matches (user_a_id, user_b_id, context)
        VALUES (a, b, 'mutual_like');
      END IF;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_create_match_on_swipe AFTER INSERT ON community_swipes
FOR EACH ROW EXECUTE FUNCTION fn_create_match_on_swipe();

-- Helper function to insert/update community_card from profile (useful to run after profile edit)
CREATE OR REPLACE FUNCTION upsert_community_card_for_user(p_user_id BIGINT) RETURNS VOID LANGUAGE plpgsql AS $$
DECLARE
  up user_profiles%ROWTYPE;
  tags TEXT[] := ARRAY[]::TEXT[];
  title TEXT;
  subtitle TEXT;
  is_alumni BOOLEAN := FALSE;
  is_student BOOLEAN := FALSE;
  uni_name TEXT;
BEGIN
  SELECT * INTO up FROM user_profiles WHERE user_id = p_user_id;
  IF NOT FOUND THEN
    RETURN;
  END IF;

  -- Build a simple title and tags from profile data
  title := COALESCE(up.full_name, '') || CASE WHEN up.current_company IS NOT NULL THEN ' @ ' || up.current_company ELSE '' END;
  subtitle := COALESCE(up.headline, '');

  -- Gather tags from seeking_roles and university
  IF up.seeking_roles IS NOT NULL THEN
    tags := tags || up.seeking_roles;
  END IF;
  IF up.university_id IS NOT NULL THEN
    SELECT name INTO uni_name FROM universities WHERE id = up.university_id;
    IF uni_name IS NOT NULL THEN
      tags := tags || ARRAY[uni_name];
    END IF;
  END IF;

  is_alumni := EXISTS (SELECT 1 FROM alumni_details WHERE user_id = p_user_id);
  SELECT (role = 'student') INTO is_student FROM users WHERE id = p_user_id;

  -- Upsert into community_cards (user_id is unique index)
  INSERT INTO community_cards (user_id, title, subtitle, company, role_label, tags, is_alumni, is_student, visible_in_swipe, created_at)
  VALUES (p_user_id, title, subtitle, up.current_company, up.current_title, tags, is_alumni, is_student, TRUE, NOW())
  ON CONFLICT (user_id) DO UPDATE SET
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    company = EXCLUDED.company,
    role_label = EXCLUDED.role_label,
    tags = EXCLUDED.tags,
    is_alumni = EXCLUDED.is_alumni,
    is_student = EXCLUDED.is_student,
    visible_in_swipe = EXCLUDED.visible_in_swipe;
END;
$$;

-- NOTE: The upsert_community_card_for_user implementation above has a small simplification for is_alumni/is_student.
-- You can adapt it to read from alumni_details or from users.role if you prefer.

-- Grant some basic rights
GRANT SELECT ON TABLE user_profiles, community_cards, universities TO public;
GRANT INSERT, SELECT ON community_swipes TO authenticated;
GRANT SELECT, INSERT ON suggested_connections TO authenticated;

-- End of migration
