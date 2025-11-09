/*
  # Create Blog Content Tables

  1. New Tables
    - `post_categories`
      - `id` (serial, primary key)
      - `name` (text, unique)
      - `description` (text)
    
    - `tags`
      - `id` (serial, primary key)
      - `name` (text, unique)
    
    - `post_templates`
      - `id` (serial, primary key)
      - `category_id` (integer, foreign key)
      - `title` (text)
      - `body_template` (text)
      - `min_words` (integer)
      - `max_words` (integer)
      - `target_audience` (text)
      - `tone` (text)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
    
    - `post_template_tags`
      - `template_id` (integer, foreign key)
      - `tag_id` (integer, foreign key)
      - Composite primary key

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated users to manage content
*/

-- Categories for templates
CREATE TABLE IF NOT EXISTS post_categories (
    id              SERIAL PRIMARY KEY,
    name            TEXT UNIQUE NOT NULL,
    description     TEXT
);

-- Tags for lightweight discovery and ranking
CREATE TABLE IF NOT EXISTS tags (
    id              SERIAL PRIMARY KEY,
    name            TEXT UNIQUE NOT NULL
);

-- Post templates used to seed and recommend content
CREATE TABLE IF NOT EXISTS post_templates (
    id                  SERIAL PRIMARY KEY,
    category_id         INTEGER NOT NULL REFERENCES post_categories(id) ON DELETE RESTRICT,
    title               TEXT NOT NULL,
    body_template       TEXT NOT NULL,
    min_words           INTEGER,
    max_words           INTEGER,
    target_audience     TEXT,
    tone                TEXT,
    is_active           BOOLEAN NOT NULL DEFAULT TRUE,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Many to many: templates <-> tags
CREATE TABLE IF NOT EXISTS post_template_tags (
    template_id         INTEGER NOT NULL REFERENCES post_templates(id) ON DELETE CASCADE,
    tag_id              INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (template_id, tag_id)
);

-- Enable RLS
ALTER TABLE post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_template_tags ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Categories are viewable by everyone"
  ON post_categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Tags are viewable by everyone"
  ON tags
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Templates are viewable by everyone"
  ON post_templates
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Template tags are viewable by everyone"
  ON post_template_tags
  FOR SELECT
  TO public
  USING (true);

-- Authenticated user policies
CREATE POLICY "Authenticated users can insert categories"
  ON post_categories
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert tags"
  ON tags
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert templates"
  ON post_templates
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update templates"
  ON post_templates
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_templates_category ON post_templates(category_id);
CREATE INDEX IF NOT EXISTS idx_templates_active ON post_templates(is_active);
CREATE INDEX IF NOT EXISTS idx_template_tags_template ON post_template_tags(template_id);
CREATE INDEX IF NOT EXISTS idx_template_tags_tag ON post_template_tags(tag_id);
