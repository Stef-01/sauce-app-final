-- Seed Projects
-- Migration: 20251108235930_seed_projects_and_profiles.sql

/*
  This migration seeds the existing `projects` table with curated project records.
  
  NOTE: The `projects` table is created in a prior migration (20251108235657_create_projects_table.sql).
  The `user_profiles` table is created in the community schema migration (20251109002000_create_community_schema.sql).
  This file only inserts rows into projects so it is safe to apply on top of the existing schema.
*/

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
    primary_skill_tags,
    logo,
    location,
    is_remote
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
 ],
 'https://logo.clearbit.com/deepmind.com',
 'London, UK',
 true
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
 ],
 'https://logo.clearbit.com/microsoft.com',
 'Redmond, WA',
 true
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
 ],
 'https://logo.clearbit.com/openai.com',
 'San Francisco, CA',
 true
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
 ],
 'https://logo.clearbit.com/anthropic.com',
 'San Francisco, CA',
 true
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
 ],
 'https://logo.clearbit.com/meta.com',
 'Menlo Park, CA',
 true
),
('Stripe',
 'Fraud Detection Explainability for Payment Risk Models',
 3, 5, 7, 2, 3,
 'Build an explainability layer for Stripe''s ML fraud detection models that surfaces understandable reasons for transaction blocks to merchants and end users without compromising security.',
 ARRAY[
   'Research existing explainability techniques for fraud detection systems',
   'Design user facing explanations that balance transparency with security concerns',
   'Prototype dashboard interface showing risk signals and merchant actions'
 ],
 ARRAY[
   'Technical design doc with security tradeoff analysis',
   'Interactive Figma prototype or React dashboard for merchant risk view',
   'User testing report with 5-8 merchant interviews'
 ],
 ARRAY[
   'Product design',
   'Frontend development (React)',
   'Understanding of ML explainability techniques',
   'Security minded design thinking',
   'User research and testing'
 ],
 ARRAY[
   'Experience with payments or fintech products',
   'Portfolio showing complex dashboard or data visualization work'
 ],
 ARRAY[
   'explainability',
   'fraud_detection',
   'react',
   'product_design',
   'fintech',
   'user_research',
   'security'
 ],
 'https://logo.clearbit.com/stripe.com',
 'San Francisco, CA',
 true
),
('Figma',
 'AI Design Assistant Interaction Patterns for Collaborative Workflows',
 4, 6, 8, 2, 2,
 'Design and prototype interaction patterns for AI assisted design features in Figma that support creativity without disrupting collaborative workflows or designer agency.',
 ARRAY[
   'Analyze current designer workflows through interviews and usage data',
   'Identify moments where AI assistance adds value vs creates friction',
   'Design 3-4 interaction patterns for features like auto layout, component suggestions, and design critiques'
 ],
 ARRAY[
   'Interaction design specification with Figma prototypes',
   'Research synthesis from 10+ designer interviews',
   'Metrics framework for measuring AI feature success without cannibalizing core value'
 ],
 ARRAY[
   'Figma power user expertise',
   'Interaction design and prototyping',
   'User research and synthesis',
   'Understanding of AI/ML capabilities',
   'Collaborative design processes'
 ],
 ARRAY[
   'Strong portfolio with interaction design work',
   'Experience designing for creative tools or designer workflows'
 ],
 ARRAY[
   'figma',
   'interaction_design',
   'user_research',
   'ai_ux',
   'design_tools',
   'prototyping'
 ],
 'https://logo.clearbit.com/figma.com',
 'San Francisco, CA',
 true
),
('Notion',
 'Context Aware AI Writing Assistant for Knowledge Work',
 3, 5, 7, 1, 2,
 'Design and prototype context aware AI writing features for Notion that leverage workspace knowledge graph to provide relevant suggestions while maintaining user trust and data privacy.',
 ARRAY[
   'Map knowledge work patterns and identify high value AI intervention points',
   'Design context retrieval and ranking system respecting privacy boundaries',
   'Build prototype demonstrating 2-3 AI writing features with workspace context'
 ],
 ARRAY[
   'Functional prototype using OpenAI or Anthropic API with mock workspace data',
   'Privacy and trust design framework document',
   'User testing insights from 8-10 knowledge workers'
 ],
 ARRAY[
   'Full stack development (React, Node.js)',
   'LLM API integration and prompt engineering',
   'Information retrieval and ranking',
   'Privacy by design principles',
   'Product thinking'
 ],
 ARRAY[
   'Experience building with LLM APIs',
   'Portfolio showing end-to-end product work'
 ],
 ARRAY[
   'react',
   'nodejs',
   'llm_apis',
   'prompt_engineering',
   'information_retrieval',
   'privacy_by_design',
   'product_engineering'
 ],
 'https://logo.clearbit.com/notion.so',
 'San Francisco, CA',
 true
),
('Scale AI',
 'Quality Framework for Human in the Loop ML Data Pipelines',
 4, 6, 8, 2, 3,
 'Design a systematic quality framework for HITL data annotation workflows that balances labeler expertise, throughput, and model performance downstream.',
 ARRAY[
   'Survey existing annotation quality metrics and their limitations',
   'Design multi dimensional quality score incorporating agreement, edge case handling, and downstream impact',
   'Build evaluation dashboard tracking quality across projects and labeler cohorts'
 ],
 ARRAY[
   'Quality framework technical specification',
   'Python based prototype dashboard with sample annotation data',
   'Recommendations doc for Scale platform integration'
 ],
 ARRAY[
   'Python and data analysis',
   'ML evaluation metrics',
   'Dashboard development (Streamlit or React)',
   'Understanding of annotation workflows',
   'Statistical thinking'
 ],
 ARRAY[
   'Experience with ML data pipelines or annotation platforms',
   'Portfolio showing data analysis or evaluation work'
 ],
 ARRAY[
   'python',
   'data_analysis',
   'ml_evaluation',
   'dashboard_development',
   'annotation_quality',
   'statistics'
 ],
 'https://logo.clearbit.com/scale.com',
 'San Francisco, CA',
 true
),
('Databricks',
 'LLM Observability and Debugging Tools for Production ML Pipelines',
 4, 6, 8, 2, 3,
 'Build observability and debugging tools for LLM powered features in production ML pipelines, focusing on output quality monitoring and failure mode detection.',
 ARRAY[
   'Design metrics and logging schema for LLM pipeline observability',
   'Build real time dashboard for output quality, latency, and cost tracking',
   'Create automated alerting for common LLM failure modes'
 ],
 ARRAY[
   'Open source observability toolkit with Python SDK',
   'Interactive dashboard built with Streamlit or Plotly',
   'Integration guide for Databricks MLflow'
 ],
 ARRAY[
   'Python development',
   'LLM APIs and prompt engineering',
   'Distributed systems and logging',
   'Dashboard and data visualization',
   'ML ops principles'
 ],
 ARRAY[
   'Experience with production ML systems',
   'Understanding of observability and monitoring tools'
 ],
 ARRAY[
   'python',
   'llm_apis',
   'mlops',
   'observability',
   'data_visualization',
   'distributed_systems'
 ],
 'https://logo.clearbit.com/databricks.com',
 'San Francisco, CA',
 true
),
('Airbnb',
 'Trust and Safety AI for Listing Verification and Review Analysis',
 3, 5, 7, 2, 3,
 'Design AI powered trust and safety features for automated listing verification and review analysis that surface fraud signals while minimizing false positives.',
 ARRAY[
   'Analyze existing listing verification and review patterns for fraud signals',
   'Design ML pipeline for image verification, review sentiment, and anomaly detection',
   'Build user facing trust indicators that communicate safety without creating alarm'
 ],
 ARRAY[
   'Technical architecture for trust and safety ML pipeline',
   'Prototype interface showing trust indicators and host verification status',
   'Evaluation framework with precision/recall targets and user trust metrics'
 ],
 ARRAY[
   'ML and computer vision basics',
   'NLP and sentiment analysis',
   'Product design and UX',
   'React or similar frontend framework',
   'Trust and safety domain knowledge'
 ],
 ARRAY[
   'Experience in trust and safety, fraud detection, or marketplace products',
   'Portfolio showing ML application or product work'
 ],
 ARRAY[
   'computer_vision',
   'nlp',
   'trust_safety',
   'product_design',
   'react',
   'fraud_detection',
   'marketplace_dynamics'
 ],
 'https://logo.clearbit.com/airbnb.com',
 'San Francisco, CA',
 true
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
