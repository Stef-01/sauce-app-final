/*
 Sample worker script: parse resume, normalize skills, write (mock) embeddings, seed suggested_connections
 Usage (requires env):
   SUPABASE_URL=<supabase_url> SUPABASE_SERVICE_ROLE_KEY=<service_role_key> node scripts/worker/seed_suggestions.mjs

 Notes:
 - This script uses @supabase/supabase-js (already in dependencies).
 - It performs a best-effort mock embedding creation if a real embedding provider is not configured.
 - Writing vectors into a pgvector column via the REST API / PostgREST sometimes needs specific casting; this script uses the JSON array approach which works on many setups. If your DB rejects it, use a direct Postgres client or a RPC function to accept text->vector casting on the server side.
 - The script is idempotent for the sample user (it uses upsert semantics where possible).
*/

import pkg from '@supabase/supabase-js';
const { createClient } = pkg;

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or VITE_SUPABASE_*) must be set in env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false }
});

// Simple skill vocabulary and normalization map (expand as needed)
const SKILL_VOCAB = {
  python: ['python', 'py'],
  'machine learning': ['machine learning', 'ml'],
  'deep learning': ['deep learning', 'dl'],
  'prompt engineering': ['prompt engineering', 'prompts'],
  'product management': ['product management', 'pm'],
  'react': ['react', 'react.js', 'reactjs'],
  'typescript': ['typescript', 'ts'],
  'javascript': ['javascript', 'js'],
  'data science': ['data science', 'data-science'],
  'nlp': ['nlp', 'natural language processing'],
  'computer vision': ['computer vision', 'cv']
};

function normalizeSkillsFromText(text) {
  const found = new Set();
  const lower = text.toLowerCase();
  for (const [canonical, aliases] of Object.entries(SKILL_VOCAB)) {
    for (const alias of aliases) {
      if (lower.includes(alias)) {
        found.add(canonical);
        break;
      }
    }
  }
  return Array.from(found);
}

// Mock embedding generator: deterministic pseudo-embedding based on skill list
function makeMockEmbedding(skills, dim = parseInt(process.env.EMBEDDING_DIM || '768', 10)) {
  // simple deterministic hash -> fill vector
  const base = skills.join('|');
  const vec = new Array(dim).fill(0).map((_, i) => {
    // create small pseudo-random values based on base and index
    let h = 2166136261;
    const s = `${base}:${i}`;
    for (let j = 0; j < s.length; j++) {
      h = Math.imul(h ^ s.charCodeAt(j), 16777619);
    }
    // normalize to [-1,1]
    return ((h >>> 0) % 1000) / 1000 - 0.5;
  });
  return vec;
}

async function upsertSkills(skillNames) {
  if (!skillNames || skillNames.length === 0) return [];
  const rows = skillNames.map((n) => ({ name: n }));
  const { data, error } = await supabase.from('skills').upsert(rows, { onConflict: 'name' }).select('id,name');
  if (error) {
    console.error('Failed to upsert skills:', error);
    throw error;
  }
  return data;
}

async function ensureSkillsExist(skillNames) {
  // upsert then return ids mapping
  const upserted = await upsertSkills(skillNames);
  const { data: allSkills, error } = await supabase.from('skills').select('id,name').in('name', skillNames);
  if (error) throw error;
  const map = new Map();
  for (const r of allSkills) map.set(r.name, r.id);
  return map;
}

async function insertUserSkills(userId, skillMap) {
  const entries = [];
  for (const [name, id] of skillMap.entries()) {
    entries.push({ user_id: userId, skill_id: id, level: 3, source: 'resume' });
  }
  if (entries.length === 0) return;
  // Upsert user_skills (primary key user_id,skill_id)
  const { error } = await supabase.from('user_skills').upsert(entries, { onConflict: ['user_id', 'skill_id'] });
  if (error) {
    console.error('Failed to upsert user_skills:', error);
    throw error;
  }
}

async function upsertEmbedding(userId, embeddingArray) {
  if (!embeddingArray || embeddingArray.length === 0) return;
  // PostgREST often accepts JSON array for a pgvector column; if not, you'll need a server-side RPC that casts text->vector.
  const payload = { user_id: userId, embedding: embeddingArray, updated_at: new Date().toISOString() };
  const { error } = await supabase.from('user_embeddings').upsert(payload, { onConflict: 'user_id' });
  if (error) {
    console.warn('Failed to upsert embedding. Your DB may require a different insert shape or RPC. Error:', error.message || error);
    // Do not throw — embeddings are optional for this demo
  }
}

async function seedSuggestedConnectionsFor(userId, topN = 5) {
  // Simple heuristic: find users who share skills (via user_skills), prefer those who opted into mentoring
  const { data: mySkills } = await supabase.from('user_skills').select('skill_id').eq('user_id', userId);
  if (!mySkills || mySkills.length === 0) {
    console.log('No skills for user; skipping suggestions');
    return;
  }
  const skillIds = mySkills.map((r) => r.skill_id);

  // Find candidate users with overlapping skills, compute overlap count
  const sql = `
    SELECT u.user_id AS suggested_user_id, up.full_name, COUNT(*) AS overlap_count, ad.willing_to_mentor
    FROM user_skills us
    JOIN user_profiles up ON up.user_id = us.user_id
    LEFT JOIN alumni_details ad ON ad.user_id = us.user_id
    WHERE us.skill_id = ANY($1::bigint[])
      AND us.user_id <> $2
    GROUP BY us.user_id, up.full_name, ad.willing_to_mentor
    ORDER BY overlap_count DESC NULLS LAST
    LIMIT $3;
  `;

  // use RPC via postgres function? supabase-js doesn't execute raw SQL; using RPC requires a prepared function.
  // Instead query via REST: user_skills join logic is complex; we can fetch candidates client-side.

  // Fetch users who have these skills
  const { data: candidates, error } = await supabase
    .from('user_skills')
    .select('user_id, skill_id, user_profiles(full_name), alumni_details(willing_to_mentor)')
    .in('skill_id', skillIds)
    .neq('user_id', userId);

  if (error) {
    console.error('Failed to fetch candidate user_skills:', error);
    return;
  }

  // Aggregate overlap counts
  const counter = new Map();
  for (const row of candidates) {
    const uid = row.user_id;
    const meta = counter.get(uid) || { count: 0, name: row.user_profiles?.full_name || null, mentor: row.alumni_details?.willing_to_mentor || false };
    meta.count += 1;
    counter.set(uid, meta);
  }

  const scored = Array.from(counter.entries()).map(([uid, meta]) => {
    // base score is overlap count; boost if willing_to_mentor
    let score = meta.count;
    if (meta.mentor) score += 1.5;
    return { suggested_user_id: uid, score, reason_summary: `Shared skills: ${meta.count}`, name: meta.name };
  });

  scored.sort((a, b) => b.score - a.score);

  const top = scored.slice(0, topN);
  for (const s of top) {
    const payload = {
      user_id: userId,
      suggested_user_id: s.suggested_user_id,
      score: s.score,
      reason_summary: s.reason_summary,
      source_model: 'mock-skill-overlap',
      created_at: new Date().toISOString()
    };
    const { error: err } = await supabase.from('suggested_connections').upsert(payload, { onConflict: ['user_id', 'suggested_user_id'] });
    if (err) console.warn('Failed to upsert suggested connection', err.message || err);
  }

  console.log(`Seeded ${top.length} suggested connections for user ${userId}`);
}

async function main() {
  try {
    const SAMPLE_USER_ID = parseInt(process.env.SAMPLE_USER_ID || '1', 10);

    // Sample resume text (replace with file read or upload in a real worker)
    const sampleResume = `Experienced ML engineer with strong Python skills. Built NLP and computer vision models. Familiar with deep learning frameworks, prompt engineering and product development. Worked with React and TypeScript for front-end prototypes.`;

    console.log('Parsing resume for skills...');
    const skills = normalizeSkillsFromText(sampleResume);
    console.log('Detected skills:', skills);

    // Ensure skills exist and map to ids
    const skillMap = await ensureSkillsExist(skills);
    console.log('Skill map:', skillMap);

    // Insert user_skills
    await insertUserSkills(SAMPLE_USER_ID, skillMap);
    console.log('Inserted user_skills');

    // Create mock embedding and upsert
    const dim = parseInt(process.env.EMBEDDING_DIM || '768', 10);
    const embedding = makeMockEmbedding(skills, dim);
    await upsertEmbedding(SAMPLE_USER_ID, embedding);
    console.log('Upserted (mock) embedding');

    // Seed suggested connections for this user
    await seedSuggestedConnectionsFor(SAMPLE_USER_ID, parseInt(process.env.TOP_N || '5', 10));

    console.log('Worker finished successfully');
    process.exit(0);
  } catch (err) {
    console.error('Worker failed:', err);
    process.exit(1);
  }
}

main();
