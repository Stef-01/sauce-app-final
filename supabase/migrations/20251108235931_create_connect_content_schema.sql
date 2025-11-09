-- Create Connect content layer schema and seed initial templates

-- Categories for templates (general prompts, alumni signals, essays)
CREATE TABLE post_categories (
    id              SERIAL PRIMARY KEY,
    name            TEXT UNIQUE NOT NULL,
    description     TEXT
);

-- Tags for lightweight discovery and ranking
CREATE TABLE tags (
    id              SERIAL PRIMARY KEY,
    name            TEXT UNIQUE NOT NULL
);

-- Post templates used to seed and recommend content
CREATE TABLE post_templates (
    id                  SERIAL PRIMARY KEY,
    category_id         INTEGER NOT NULL REFERENCES post_categories(id) ON DELETE RESTRICT,
    title               TEXT NOT NULL,
    body_template       TEXT NOT NULL,
    min_words           INTEGER,
    max_words           INTEGER,
    target_audience     TEXT,              -- e.g. "students", "alumni", "hiring_managers"
    tone                TEXT,              -- e.g. "casual", "direct", "reflective"
    is_active           BOOLEAN NOT NULL DEFAULT TRUE,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Many to many: templates <-> tags
CREATE TABLE post_template_tags (
    template_id         INTEGER NOT NULL REFERENCES post_templates(id) ON DELETE CASCADE,
    tag_id              INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (template_id, tag_id)
);

-- Seed Categories
INSERT INTO post_categories (name, description) VALUES
('general', 'Short casual prompts written in student voice for everyday posting.'),
('alumni_ceo', 'Short posts from alumni, leaders, and hiring managers that surface real problems and desired skills.'),
('essay', 'Longer reflective and narrative prompts for deep dive posts.')
ON CONFLICT (name) DO NOTHING;

-- Seed Tags
INSERT INTO tags (name) VALUES
('internships'),
('startups'),
('big_tech'),
('signal_over_brand'),
('courses'),
('workload'),
('ethics'),
('side_projects'),
('remote_work'),
('mentorship'),
('pay_transparency'),
('ai'),
('healthcare'),
('pharma'),
('data_eng'),
('ml_ops'),
('systems'),
('docs'),
('policy'),
('niche_skill')
ON CONFLICT (name) DO NOTHING;

-- Seed Post Templates - General (student voice)
INSERT INTO post_templates
(category_id, title, body_template, min_words, max_words, target_audience, tone)
VALUES
((SELECT id FROM post_categories WHERE name = 'general'),
'Big name vs real work?',
'Got 2 offers: big logo SWE where it sounds like test fixes, and a tiny startup where I touch actual product. For anyone 1 to 3 years out: what did you pick, what did it do to your skills, and would you do it again knowing what you know now?',
40, 200, 'students,alumni', 'casual'),

((SELECT id FROM post_categories WHERE name = 'general'),
'What actually helped at your internship?',
'If you interned in the last 2 years, drop 3 concrete things that translated: course, side project, or random thing you learned that you used weekly. Keep it specific so people can copy what works.',
30, 200, 'students,alumni', 'casual'),

((SELECT id FROM post_categories WHERE name = 'general'),
'Can I stack this without frying my brain?',
'Thinking: 16 units plus part time research plus 1 club lead role. If you have tried a similar combo at Stanford, reply with: your setup, peak weekly hours, and if you would recommend it or not.',
30, 220, 'students,alumni', 'casual'),

((SELECT id FROM post_categories WHERE name = 'general'),
'Job title vs actual calendar',
'Drop your last role like this: title, company, and a simple breakdown of a real week (no sensitive details). Trying to help people see what the work actually is.',
30, 220, 'students,alumni', 'casual'),

((SELECT id FROM post_categories WHERE name = 'general'),
'Red flags from your "AI" internship',
'If the role was sold as AI or ML and ended up being manual data clean up, what were the warning signs in hindsight? Help others avoid wasting a summer.',
30, 200, 'students,alumni', 'casual'),

((SELECT id FROM post_categories WHERE name = 'general'),
'Courses that secretly mattered',
'Name one Stanford class that looked meh on Axess but ended up clutch in your job or lab. Include professor, project, and what it mapped to later.',
30, 220, 'students,alumni', 'casual'),

((SELECT id FROM post_categories WHERE name = 'general'),
'Intern pay and housing sanity check',
'Drop your last offer in this format only: company, location, monthly or hourly rate, housing yes or no. No speeches. Just data so people can calibrate.',
25, 160, 'students,alumni', 'direct'),

((SELECT id FROM post_categories WHERE name = 'general'),
'Side project flex (with receipts)',
'If a side project helped you get an interview or offer, reply with: one link, two line summary, and what the recruiter or manager actually commented on.',
25, 200, 'students,alumni', 'casual'),

((SELECT id FROM post_categories WHERE name = 'general'),
'Remote vs in person for learning',
'For your first internship or job: remote, hybrid, or in office, and how much it helped your learning on a scale of 1 to 10. Add quick context.',
25, 160, 'students,alumni', 'casual'),

((SELECT id FROM post_categories WHERE name = 'general'),
'Stuff I wish someone told me in frosh year',
'Alums and seniors: one short note to first year you about internships, recruiting, or impostor syndrome. Max 60 words, no inspirational posters.',
20, 120, 'students,alumni', 'casual');

-- Seed Post Templates - Alumni/CEO (problem and talent signals)
INSERT INTO post_templates
(category_id, title, body_template, min_words, max_words, target_audience, tone)
VALUES
((SELECT id FROM post_categories WHERE name = 'alumni_ceo'),
'Pharma safety data pipeline wanted',
'Pharma side: if someone builds a clean, audited pipeline from messy trial CSVs into a simple safety dashboard with filters, timelines, and alerts, I will read that repo on your resume. Stack: Python, SQL, basic stats, simple UI.',
35, 180, 'students', 'direct'),

((SELECT id FROM post_categories WHERE name = 'alumni_ceo'),
'Know FHIR plus code? You stand out.',
'We keep seeing generic ML resumes and almost no one who can work with FHIR or health data. If you ship a tiny app that reads FHIR data and visualizes something clinicians actually care about, you jump the queue.',
35, 200, 'students', 'direct'),

((SELECT id FROM post_categories WHERE name = 'alumni_ceo'),
'Turn guidance PDFs into real checklists',
'Reg teams still copy paste from PDFs. A tool that parses one FDA guideline into a structured checklist with versioning and diffs would save real hours. Looking for people comfortable with parsing, embeddings, and reliable code.',
35, 220, 'students', 'direct'),

((SELECT id FROM post_categories WHERE name = 'alumni_ceo'),
'Own data quality end to end',
'If you can show one project with tests, logging, and docs for a small ETL into a warehouse, that is more convincing than a page of buzzwords. Link it.',
25, 160, 'students', 'direct'),

((SELECT id FROM post_categories WHERE name = 'alumni_ceo'),
'LLM summarization sandbox for clinical docs',
'If someone builds a small sandbox to run LLM summarization on de identified clinical notes with full logs, privacy guardrails, and rollback, that is a real product pitch, not a class toy.',
35, 200, 'students', 'direct'),

((SELECT id FROM post_categories WHERE name = 'alumni_ceo'),
'Read real papers, replicate real plots',
'We notice people who can take a NEJM or Lancet figure and recreate it in R or Python with a clean notebook. That signal beats generic "passion for healthcare" lines.',
30, 180, 'students', 'direct'),

((SELECT id FROM post_categories WHERE name = 'alumni_ceo'),
'Documentation as a green flag',
'If your repo has an architecture diagram, setup guide, and short decisions log, that alone sets you apart. Show us you can make your work legible.',
25, 150, 'students', 'direct'),

((SELECT id FROM post_categories WHERE name = 'alumni_ceo'),
'Niche systems skills in bioinfra',
'If you enjoy systems: Rust, Go, or modern C++ in bioinfra is wide open. Build a fast parser or small simulator around a real format and you will get noticed.',
30, 200, 'students', 'direct'),

((SELECT id FROM post_categories WHERE name = 'alumni_ceo'),
'Cold chain modeling as a starter project',
'Cold chain for temperature sensitive drugs is fragile. A simple model that simulates temperature risks across routes and suggests better paths would be genuinely useful. Mix of ops research plus scripting plus clear viz.',
35, 220, 'students', 'direct'),

((SELECT id FROM post_categories WHERE name = 'alumni_ceo'),
'Talk like a human to clinicians',
'We hire faster when candidates explain tech so clinicians instantly get it. If your project write up reads clearly to a non engineer, that already signals fit.',
25, 140, 'students', 'direct');

-- Seed Post Templates - Essays (deep dives)
INSERT INTO post_templates
(category_id, title, body_template, min_words, max_words, target_audience, tone)
VALUES
((SELECT id FROM post_categories WHERE name = 'essay'),
'This internship looked elite. Here is what actually happened.',
'Write about one internship that sounded perfect but did not match reality. Cover: what the listing promised, what your week actually looked like, what surprised you, and three questions you wish every applicant would ask before signing.',
800, 1400, 'students,alumni', 'reflective'),

((SELECT id FROM post_categories WHERE name = 'essay'),
'How I chose between FAANG, startup, and research.',
'You had multiple serious options. Walk through your decision criteria, what you got right, what you misread, and how someone two years behind you can copy the process without copying the outcome.',
800, 1500, 'students,alumni', 'reflective'),

((SELECT id FROM post_categories WHERE name = 'essay'),
'The gap between CS classes and production code.',
'Spell out where Stanford CS helped and where it did not. Include concrete missing pieces: tooling, reviews, ownership, on call, security basics. End with a practical 90 day self study plan for someone who has finished core CS and wants to be production ready.',
900, 1500, 'students,alumni', 'practical'),

((SELECT id FROM post_categories WHERE name = 'essay'),
'A week in my role, no buzzwords.',
'Pick a recent role and narrate one typical week: meetings, async work, deep work slots, random fires. Annotate what skills each block uses and what you wish students practiced before joining.',
800, 1400, 'students,alumni', 'conversational'),

((SELECT id FROM post_categories WHERE name = 'essay'),
'When values and compensation pulled in different directions.',
'Describe a real decision where money, status, and values were not aligned. Explain the pressure you felt, the choice you made, what it cost, and what it protected. Give one concrete exercise to help others map their own line.',
900, 1500, 'students,alumni', 'reflective'),

((SELECT id FROM post_categories WHERE name = 'essay'),
'Side project to offer: the full pipeline.',
'Tell the story of one side project that directly led to an interview or offer. How you scoped it, built it, shipped it, and put it in front of the right person. Include screenshots or links that others can learn from.',
800, 1400, 'students,alumni', 'practical'),

((SELECT id FROM post_categories WHERE name = 'essay'),
'Remote first as a new grad: how I did not stall out.',
'If your first role was remote or hybrid, explain how you learned fast anyway: routines, DM etiquette, notes, recording context, asking for feedback. Make it tactical for students considering fully remote offers.',
800, 1300, 'students,alumni', 'practical'),

((SELECT id FROM post_categories WHERE name = 'essay'),
'Inside a small startup: what I learned faster than my friends.',
'Describe what owning real pieces of a startup taught you compared to peers at big companies. Include concrete stories about responsibility, failure, and speed. Clarify who this path is good for and who should avoid it.',
900, 1500, 'students,alumni', 'reflective'),

((SELECT id FROM post_categories WHERE name = 'essay'),
'What I got wrong about prestige.',
'Be honest about how you used to think about brand names, rankings, and clout. Contrast that with what actually mattered once you were in the work. Give a checklist for evaluating teams and projects beyond logos.',
800, 1400, 'students,alumni', 'reflective'),

((SELECT id FROM post_categories WHERE name = 'essay'),
'How I built a niche people remember.',
'Explain how you picked a narrow problem space, stayed in it, and made it obvious in your projects, writing, and conversations. Show how that niche made it easier for recruiters, professors, or founders to say yes.',
800, 1400, 'students,alumni', 'practical');

-- Example Tag Linking
WITH
  t_big_name AS (
    SELECT id AS template_id FROM post_templates WHERE title = 'Big name vs real work?'
  ),
  tag_intern AS (
    SELECT id AS tag_id FROM tags WHERE name = 'internships'
  ),
  tag_startup AS (
    SELECT id AS tag_id FROM tags WHERE name = 'startups'
  ),
  tag_big_tech AS (
    SELECT id AS tag_id FROM tags WHERE name = 'big_tech'
  ),
  tag_signal AS (
    SELECT id AS tag_id FROM tags WHERE name = 'signal_over_brand'
  )
INSERT INTO post_template_tags (template_id, tag_id)
SELECT template_id, tag_id 
FROM t_big_name, (
    SELECT tag_id FROM tag_intern
    UNION SELECT tag_id FROM tag_startup
    UNION SELECT tag_id FROM tag_big_tech
    UNION SELECT tag_id FROM tag_signal
) tags
ON CONFLICT DO NOTHING;

-- Add indexes for performance
CREATE INDEX idx_post_templates_category ON post_templates(category_id);
CREATE INDEX idx_post_templates_active ON post_templates(is_active);
CREATE INDEX idx_template_tags_template ON post_template_tags(template_id);
CREATE INDEX idx_template_tags_tag ON post_template_tags(tag_id);