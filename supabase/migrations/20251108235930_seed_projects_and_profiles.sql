-- Seed Projects and create user_profiles table
-- Migration: 20251108235930_seed_projects_and_profiles.sql

/*
  This migration seeds the existing `projects` table with curated project records
  and creates a lightweight `user_profiles` table for storing skill tags (TEXT[])
  which can be used for matching against `projects.primary_skill_tags`.

  NOTE: The `projects` table is created in a prior migration. This file only
  inserts rows into it so it is safe to apply on top of the existing schema.
*/

-- Create user_profiles table for matching demo
CREATE TABLE IF NOT EXISTS user_profiles (
  profile_id SERIAL PRIMARY KEY,
  user_id TEXT UNIQUE,
  full_name TEXT,
  bio TEXT,
  skill_tags TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by everyone"
  ON user_profiles
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert profiles"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_user_profiles_skill_tags ON user_profiles USING GIN (skill_tags);

-- Seed projects
INSERT INTO projects (
    company_name,
    project_title,
    duration_weeks,
    time_commitment_min_hours,
    time_commitment_max_hours,
    team_size_min,
    team_size_max,
    brief,
    objectives,
    key_deliverables,
    required_skills,
    selection_signals,
    primary_skill_tags
) VALUES
('Google DeepMind',
 'Evaluating Alignment Between Open AI Safety Benchmarks and Real Product Surfaces',
 4, 6, 8, 2, 3,
 'Map how existing AI safety and robustness benchmarks align with real user-product interaction surfaces in productivity, education, and developer tooling, and propose new evaluations for uncovered risk areas.',
 ARRAY[
   'Catalog key open source and industry AI safety and robustness benchmarks for language and multimodal models',
   'Map each benchmark to concrete user journeys in coding assistants, student use, and enterprise analytics',
   'Identify blind spots and propose 3 to 5 new evaluation concepts or metrics'
 ],
 ARRAY[
   'Benchmark to user-journey mapping matrix',
   '15 slide whitepaper style deck with 3 high risk scenarios missed today and recommended design principles',
   'Optional prototype script or notebook demonstrating one evaluation scenario on a public model API'
 ],
 ARRAY[
   'LLM product familiarity',
   'Prompt engineering',
   'Reading and interpreting ML and safety benchmarks',
   'Python scripting',
   'Research synthesis',
   'Technical writing'
 ],
 ARRAY[
   'Prior experience in ML research, safety, or evaluation',
   'Clear, structured writing samples that show analytical rigor'
 ],
 ARRAY[
   'ml_safety',
   'evaluation_frameworks',
   'python',
   'prompt_engineering',
   'llm_products',
   'research_methods',
   'technical_writing'
 ]
),
('Microsoft',
 'Responsible AI UX Patterns for Copilot in Early Career Workflows',
 3, 5, 7, 2, 2,
 'Identify high risk and high leverage moments in early career workflows using Copilot, then design UX patterns that support control, correctness, and learning without adding friction.',
 ARRAY[
   'Shadow or interview at least 10 students or early career professionals on AI usage in writing, coding, and analysis',
   'Identify misuse patterns, overreliance, confusion, and gaps in current experiences',
   'Design 3 to 4 UX patterns that improve correctness checks, provenance, and skill growth'
 ],
 ARRAY[
   '10 page insight report with evidence backed UX patterns',
   'Clickable Figma flows or React prototypes for patterns in docs and GitHub PR review',
   'Success metrics suitable for A/B testing in Copilot surfaces'
 ],
 ARRAY[
   'Product thinking',
   'UX research and synthesis',
   'Interaction design',
   'Figma or basic React',
   'Understanding of responsible AI principles',
   'Familiarity with Copilot or similar tools'
 ],
 ARRAY[
   'Prior UX or product design portfolio',
   'Experience using Copilot, GitHub, or similar AI coding and productivity tools'
 ],
 ARRAY[
   'ux_design',
   'user_research',
   'interaction_design',
   'react',
   'figma',
   'responsible_ai',
   'copilot_power_user'
 ]
),
('OpenAI',
 'Rapid Evaluation Framework for Domain Specific Tutor Agents',
 4, 6, 8, 1, 2,
 'Design a reusable evaluation harness for subject specific tutor agents that combines programmatic and rubric based checks and can be adopted by partners with minimal overhead.',
 ARRAY[
   'Select 1 or 2 subjects aligned with Stanford coursework',
   'Define realistic student tasks including problem solving, explanations, and misconception repair',
   'Build an evaluation harness using automated and rubric based checks, runnable across model or prompt updates'
 ],
 ARRAY[
   'Open source friendly repo with YAML task templates, Python runner, and JSON scoring pipeline',
   '5 page technical note on design, failure modes, and partner adaptation guidelines'
 ],
 ARRAY[
   'Python development',
   'LLM API integration',
   'Evaluation and metrics design',
   'Prompt design for tutoring agents',
   'Familiarity with education or HCI literature'
 ],
 ARRAY[
   'Experience building with OpenAI or similar APIs',
   'Prior teaching, tutoring, or course assistant experience'
 ],
 ARRAY[
   'python',
   'llm_apis',
   'evaluation_frameworks',
   'education_technology',
   'prompt_engineering',
   'hci_literacy',
   'teaching_experience'
 ]
),
('Anthropic',
 'Critical Portfolio on the Impact of Frontier AI on the Job Market',
 3, 5, 7, 2, 2,
 'Produce a critical research portfolio on how frontier AI changes job content, task composition, and labor dynamics, with attention to distributional and ethical impacts.',
 ARRAY[
   'Review literature on automation, augmentation, and AI labor effects',
   'Conduct 5 to 8 interviews with workers already using LLMs',
   'Analyze where models substitute, complement, or create governance and oversight tasks'
 ],
 ARRAY[
   '4000 to 5000 word critical essay for policy and product leads',
   '1 page leadership briefing with priority questions and safeguards',
   'Appendix with transparent methodology and sources'
 ],
 ARRAY[
   'Analytical and critical writing',
   'Familiarity with labor economics or tech policy',
   'Ability to interpret model capabilities',
   'Qualitative research and synthesis'
 ],
 ARRAY[
   'Prior policy writing, op-eds, or research briefs',
   'Exposure to AI alignment, safety, or governance topics'
 ],
 ARRAY[
   'policy_analysis',
   'labor_economics',
   'ai_governance',
   'research_synthesis',
   'critical_writing',
   'qualitative_methods'
 ]
),
('Meta',
 'Meta Glasses Companion for Wearable and Health Data Visual Storytelling',
 4, 6, 8, 2, 3,
 'Design and prototype a companion app that uses Meta smart glasses plus phone and wearable data to present calm, contextual feedback on movement, focus, and wellbeing, with strong privacy posture.',
 ARRAY[
   'Ingest sample data from wearables and device usage',
   'Define 3 archetypes: burned out student, early career engineer, creator',
   'Design ambient AR overlays and flows that are glanceable, supportive, and privacy respecting'
 ],
 ARRAY[
   'Interaction specification including triggers, data pipelines, and permission flows',
   'Prototype in React Native or web simulating glasses HUD with simple visualizations',
   'Short ethics and privacy note covering boundaries and safeguards'
 ],
 ARRAY[
   'Frontend development in React or React Native',
   'Basic wearable and device API familiarity',
   'Product and interaction design',
   'Interest in privacy preserving quantified self tools'
 ],
 ARRAY[
   'Portfolio with interface or AR work',
   'Demonstrated interest in responsible data and wellbeing products'
 ],
 ARRAY[
   'react',
   'react_native',
   'frontend_engineering',
   'wearable_apis',
   'product_design',
   'ar_ui',
   'privacy_by_design',
   'healthtech'
 ]
);

-- Example matching query as a helpful reference (use :user_skill_tags param when running via client)
--
-- SELECT *
-- FROM projects
-- WHERE primary_skill_tags && :user_skill_tags
-- ORDER BY CARDINALITY(ARRAY(
--     SELECT UNNEST(primary_skill_tags)
--     INTERSECT
--     SELECT UNNEST(:user_skill_tags)
-- )) DESC;
