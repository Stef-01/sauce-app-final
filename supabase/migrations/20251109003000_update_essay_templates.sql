-- Update Essay Templates - Focus on Student Life, Ethics, and Debates
-- Migration: 20251109003000_update_essay_templates.sql

/*
  This migration updates the essay category templates to focus on:
  - Student life reflections
  - Ethical dilemmas in tech and education
  - Campus debates and controversial topics
  - Personal growth and decision-making
*/

-- Delete existing essay templates
DELETE FROM post_templates WHERE category_id = (SELECT id FROM post_categories WHERE name = 'essay');

-- Seed New Essay Templates - Student Life, Ethics, and Debates
INSERT INTO post_templates
(category_id, title, body_template, min_words, max_words, target_audience, tone)
VALUES
((SELECT id FROM post_categories WHERE name = 'essay'),
'When Academic Integrity Collided with Friendship',
'Write about a time when you witnessed or were involved in an academic integrity situation. How did you navigate the tension between doing the right thing and loyalty to friends? What would you do differently now, and what advice would you give to students facing similar situations?',
700, 1500, 'students,alumni', 'reflective'),

((SELECT id FROM post_categories WHERE name = 'essay'),
'The Mental Health Tax of Being "High-Achieving"',
'Reflect on the relationship between academic achievement and mental wellbeing in your college experience. Discuss the pressures, the breaking points, the coping mechanisms, and what you wish the university did differently. Be honest about the costs of success.',
800, 1600, 'students,alumni', 'reflective'),

((SELECT id FROM post_categories WHERE name = 'essay'),
'Should We Build It? AI Ethics in the Real World',
'Describe a situation where you had to make an ethical decision about technology you were building or using. What were the competing values? Who could be harmed? What did you ultimately decide and why? Help others develop their ethical reasoning framework.',
800, 1500, 'students,alumni', 'reflective'),

((SELECT id FROM post_categories WHERE name = 'essay'),
'The Diversity Statement Dilemma: Authenticity vs. Strategy',
'Explore the tension between genuine diversity commitment and performative statements in college applications, scholarships, or job applications. When does strategic positioning cross into dishonesty? How do you stay authentic while navigating these requirements?',
700, 1400, 'students,alumni', 'reflective'),

((SELECT id FROM post_categories WHERE name = 'essay'),
'When Free Speech Met Safe Spaces: A Campus Conflict',
'Recount a campus controversy where free speech and inclusivity seemed to conflict. What were the different perspectives? How did the administration handle it? What did you learn about balancing competing values in a diverse community?',
900, 1600, 'students,alumni', 'reflective'),

((SELECT id FROM post_categories WHERE name = 'essay'),
'The Side Hustle Economy: Ambition or Exploitation?',
'Reflect on student entrepreneurship, freelancing, and the gig economy. Are we building valuable skills or normalizing exploitation? Discuss your personal experience with side hustles, what you gained, what you sacrificed, and whether the tradeoffs were worth it.',
800, 1500, 'students,alumni', 'reflective'),

((SELECT id FROM post_categories WHERE name = 'essay'),
'Privilege, Imposter Syndrome, and Who Belongs Here',
'Write honestly about your relationship with privilege and belonging in elite academic spaces. How does your background shape your experience? When do you feel like an imposter vs. when do you recognize your advantages? How can we create more equitable communities?',
900, 1700, 'students,alumni', 'reflective'),

((SELECT id FROM post_categories WHERE name = 'essay'),
'The Resume Gap: When Real Life Interrupted the Plan',
'Tell the story of when your linear path got disrupted—whether by health issues, family obligations, financial constraints, or personal crisis. How did you navigate the "gap" in your resume? What did that time teach you that traditional achievement never could?',
800, 1500, 'students,alumni', 'reflective'),

((SELECT id FROM post_categories WHERE name = 'essay'),
'Open Source: Idealism Meets Reality',
'Reflect on your experience with open source software and communities. Discuss the tension between tech idealism (free knowledge, democratized access) and reality (unpaid labor, burnout, corporate exploitation). Should students contribute? Under what conditions?',
700, 1400, 'students,alumni', 'reflective'),

((SELECT id FROM post_categories WHERE name = 'essay'),
'When "Fit" Became a Red Flag: Workplace Culture Decoded',
'Share your experience learning to evaluate company culture beyond the ping pong tables and free snacks. What warning signs did you miss? What questions should students ask during interviews? How do you distinguish genuine good culture from performative perks?',
800, 1500, 'students,alumni', 'practical'),

((SELECT id FROM post_categories WHERE name = 'essay'),
'The Climate Crisis and My Career: A Moral Reckoning',
'Explore how you think about climate change in relation to your career choices. Is it okay to work at companies that harm the environment if you do good work elsewhere? How do you weigh personal impact against systemic change? What compromises are you willing to make?',
900, 1600, 'students,alumni', 'reflective'),

((SELECT id FROM post_categories WHERE name = 'essay'),
'Greek Life, Social Capital, and Exclusion',
'Reflect on Greek life, selective clubs, and social hierarchies on campus. Whether you participated or stayed out, discuss what these systems create and destroy. Are they networking opportunities or exclusionary remnants? How do they shape who gets ahead after graduation?',
800, 1500, 'students,alumni', 'reflective'),

((SELECT id FROM post_categories WHERE name = 'essay'),
'The Unpaid Internship Gamble: Who Can Afford to "Gain Experience"?',
'Analyze the ethics of unpaid internships and who they exclude. Share your personal calculation: did you take unpaid work? Could you afford to? What did it cost you or what doors did it open? How can we create more equitable pathways to opportunity?',
700, 1400, 'students,alumni', 'reflective'),

((SELECT id FROM post_categories WHERE name = 'essay'),
'When Passion Projects Became Productivity Theater',
'Write about the pressure to constantly produce and optimize, even in your free time. When did hobbies become resume items? How do you distinguish genuine curiosity from performative achievement? What would it mean to do something just because you enjoy it?',
700, 1400, 'students,alumni', 'reflective'),

((SELECT id FROM post_categories WHERE name = 'essay'),
'The Consent Crisis: Tech, Privacy, and Power',
'Reflect on consent in the digital age—whether in data collection, AI training, or platform design. Have you ever felt your consent was manufactured rather than freely given? How should tech companies think about consent? What are your personal boundaries?',
800, 1500, 'students,alumni', 'reflective'),

((SELECT id FROM post_categories WHERE name = 'essay'),
'Financial Aid and the Invisible Burdens',
'Share what it's really like to navigate college on financial aid. Discuss the invisible work, the social awkwardness, the different spring breaks. What do privileged peers not understand? What should universities do better? How did it shape your choices?',
900, 1600, 'students,alumni', 'reflective'),

((SELECT id FROM post_categories WHERE name = 'essay'),
'The Grade Debate: What Do We Actually Learn?',
'Reflect on the role of grades in learning. Do they motivate or distort? Share an experience where grades helped or hurt your education. What would learning look like without them? How do we measure understanding and growth in meaningful ways?',
700, 1400, 'students,alumni', 'reflective'),

((SELECT id FROM post_categories WHERE name = 'essay'),
'Defense Tech: Innovation or Complicity?',
'Grapple with the ethics of working in defense technology. Is it patriotic duty, necessary innovation, or morally compromised work? Discuss the arguments on all sides, your personal position, and how you arrived at it. Help others think through this decision.',
900, 1700, 'students,alumni', 'reflective'),

((SELECT id FROM post_categories WHERE name = 'essay'),
'The Loneliness Epidemic: Connection in the Digital Age',
'Write honestly about loneliness, isolation, and the struggle to build genuine connections in college and beyond. What makes it hard? What helped you? How do we balance digital connection with real presence? What needs to change about how we approach community?',
800, 1500, 'students,alumni', 'reflective'),

((SELECT id FROM post_categories WHERE name = 'essay'),
'When My Values and My Paycheck Didn't Align',
'Tell the story of a job or internship where what you believed and what you were asked to do didn't match. How did you handle it? Did you speak up, compromise, or leave? What would you tell someone facing a similar values conflict at work?',
800, 1500, 'students,alumni', 'reflective');
