/*
  # Create Projects Table

  1. New Tables
    - `projects`
      - `project_id` (serial, primary key)
      - `company_name` (text)
      - `project_title` (text)
      - `duration_weeks` (integer)
      - `time_commitment_min_hours` (integer)
      - `time_commitment_max_hours` (integer)
      - `team_size_min` (integer)
      - `team_size_max` (integer)
      - `brief` (text)
      - `objectives` (text array)
      - `key_deliverables` (text array)
      - `required_skills` (text array)
      - `selection_signals` (text array)
      - `primary_skill_tags` (text array)
      - `logo` (text) - for UI display
      - `location` (text) - for UI display
      - `is_remote` (boolean) - for UI display
      - `posted_at` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `projects` table
    - Add policy for public read access
    - Add policy for authenticated users to insert projects
*/

CREATE TABLE IF NOT EXISTS projects (
    project_id                  SERIAL PRIMARY KEY,
    company_name                TEXT NOT NULL,
    project_title               TEXT NOT NULL,
    duration_weeks              INT,
    time_commitment_min_hours   INT,
    time_commitment_max_hours   INT,
    team_size_min               INT,
    team_size_max               INT,
    brief                       TEXT,
    objectives                  TEXT[],
    key_deliverables            TEXT[],
    required_skills             TEXT[],
    selection_signals           TEXT[],
    primary_skill_tags          TEXT[],
    logo                        TEXT,
    location                    TEXT,
    is_remote                   BOOLEAN DEFAULT false,
    posted_at                   TIMESTAMPTZ DEFAULT NOW(),
    created_at                  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects are viewable by everyone"
  ON projects
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update own projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_projects_company ON projects(company_name);
CREATE INDEX IF NOT EXISTS idx_projects_skill_tags ON projects USING GIN(primary_skill_tags);
CREATE INDEX IF NOT EXISTS idx_projects_posted_at ON projects(posted_at DESC);
