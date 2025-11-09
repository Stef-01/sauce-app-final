-- Seed Sample Essay Posts
-- Migration: 20251109003100_seed_essay_posts.sql

/*
  This migration seeds the posts table with sample essays focused on:
  - Student life reflections
  - Ethical dilemmas
  - Campus debates

  These provide examples for students to see what thoughtful essays look like.
*/

-- Get the essay category ID
DO $$
DECLARE
    essay_category_id INT;
BEGIN
    SELECT id INTO essay_category_id FROM post_categories WHERE name = 'essay';

    -- Insert Sample Essay Posts
    INSERT INTO posts (author_id, author_name, author_avatar, body, category_id, score, created_at)
    VALUES
    -- Essay 1: Mental Health and Achievement
    (NULL,
     'Sarah Chen',
     'https://i.pravatar.cc/100?u=sarah',
     'I spent three years of college chasing a 4.0 GPA like it was the only thing that mattered. I triple-majored, slept four hours a night, and wore my exhaustion like a badge of honor. Everyone around me seemed to be doing the same—we competed over who had less sleep, who had more on their plate, who could handle the most pressure.

It all crashed sophomore spring when I had a panic attack during finals week. Not the kind where you feel stressed—the kind where you genuinely think you''re dying and end up in the ER at 2am. That was my wake-up call.

Here''s what I wish someone had told me freshman year: Your GPA doesn''t measure your worth. The dean''s list doesn''t care about you. That A+ in a class you hated while sacrificing your mental health? Not worth it.

I dropped one of my majors junior year. My GPA fell to 3.7. And you know what? I got the same internship offers. I got into grad school. But more importantly, I remembered why I loved learning in the first place.

The "high-achieving" culture on campus is toxic. We celebrate burnout. We glorify stress. We make mental health issues into competition ("I had TWO panic attacks this week"). The university offers counseling but doesn''t address the structural problems that make students sick in the first place.

My advice: Define success for yourself. Not based on what gets you the most Instagram congratulations or LinkedIn engagement. Based on what actually makes you feel fulfilled and healthy. Sometimes that means choosing the B+ and eight hours of sleep. Sometimes that means saying no to another club leadership position.

You are not a resume. You are a human being. Act like it.',
     essay_category_id,
     156,
     NOW() - INTERVAL '3 days'),

    -- Essay 2: Academic Integrity
    (NULL,
     'Marcus Johnson',
     'https://i.pravatar.cc/100?u=marcus',
     'My freshman year roommate was also in my CS 106A section. We studied together constantly—it was great until the final project. I saw him copying code directly from GitHub for his submission. Not just getting inspiration or using a library—literally copying the entire solution.

I froze. Do I report him? Do I talk to him first? What if he gets expelled? What if he gets mad and makes my living situation hell for the rest of the year?

I convinced myself it wasn''t my problem. "Mind your own business," I thought. But it ate at me. Every time someone complained about how hard the project was, I thought about my roommate getting the same grade for stolen work.

Finally, I talked to him. I didn''t threaten to report him—I just asked him why. His answer surprised me: "Everyone does it. Half the class is using CourseHero. At least I''m learning by reading the code."

That''s when I realized this wasn''t just about one person cheating. It''s about a system where students feel so much pressure to perform that they rationalize dishonesty. It''s about a culture where "everyone does it" becomes an excuse instead of a red flag.

I didn''t report him. But I did stop helping him study. And I told him that if he was going to be an engineer, he needed to actually learn this stuff—not just for the grade, but because someone''s life might depend on his code someday.

Looking back, I don''t know if I made the right choice. Maybe I should have reported him. Maybe I enabled him by staying silent. But I learned something important: academic integrity isn''t just about following rules. It''s about building the foundation of who you want to be professionally.

To students facing similar situations: Have the hard conversation. Don''t let loyalty to friends override your values. And remember—the point of college isn''t the degree. It''s what you actually learn to become.',
     essay_category_id,
     132,
     NOW() - INTERVAL '5 days'),

    -- Essay 3: AI Ethics
    (NULL,
     'Priya Patel',
     'https://i.pravatar.cc/100?u=priya',
     'During my internship at a major tech company, I worked on an ML model for content moderation. Sounds straightforward, right? Remove hate speech, keep the platform safe.

But three weeks in, I discovered our training data was heavily biased. We were flagging AAVE (African American Vernacular English) as "aggressive" at three times the rate of standard English. Our model was essentially encoding racial bias into algorithmic decisions.

I brought it up in our weekly team meeting. My manager acknowledged it was "an interesting observation" and said we''d "keep it in mind for the next iteration." Translation: we''re shipping this anyway.

I had a choice: stay quiet and let biased AI go into production, or push back and risk being labeled "difficult" as an intern. I was 20 years old, three weeks into my first real tech job, surrounded by senior engineers who all seemed fine with shipping this.

I pushed back. I wrote a detailed memo documenting the bias, the potential harm, and some possible solutions. I sent it to my manager, his manager, and the ML ethics team.

The response? Mixed. The ethics team thanked me. My manager was annoyed that I "went over his head." The project timeline didn''t change. They added a note to the documentation about "known limitations" and shipped it anyway.

This experience taught me several painful truths:

1. "Move fast and break things" often means "move fast and break marginalized communities."
2. Ethics in AI isn''t just a technical problem—it''s a power problem.
3. Speaking up as an intern (or junior employee) can cost you, even when you''re right.
4. Companies love talking about "responsible AI" in press releases but hate it when it slows down quarterly goals.

I don''t regret speaking up. But I''m not naive anymore about how much companies actually care about ethics when it conflicts with profits.

My advice to other students: Develop your ethical framework BEFORE you''re in the room making decisions. Know your red lines. And remember—sometimes the most important code you write is the code you refuse to write.',
     essay_category_id,
     198,
     NOW() - INTERVAL '1 week'),

    -- Essay 4: Privilege and Belonging
    (NULL,
     'Alex Rivera',
     'https://i.pravatar.cc/100?u=alex',
     'I''m a first-generation college student. My parents are immigrants who work in restaurants. I got into Stanford on a full ride, and everyone back home treated me like I''d won the lottery.

Then I got to campus and realized I''d entered a completely different world.

My roommate casually mentioned his "gap year" backpacking through Europe. My suitemate complained about her "small" trust fund. People talked about their high school internships at their parents'' companies like it was normal. Someone asked me where I summered. I said "at my job" and got confused looks.

The imposter syndrome was crushing. Everyone seemed so confident, so prepared, so... wealthy. I felt like someone was going to realize I didn''t belong here and revoke my acceptance.

But here''s the thing: I also had advantages I didn''t initially recognize. I''m light-skinned. I''m male. English is my first language. I can code-switch. These privileges made navigating elite spaces easier for me than for some of my peers who faced additional barriers.

It took me two years to understand that privilege and imposter syndrome can coexist. I can be disadvantaged in some ways and advantaged in others. The system is rigged, but it''s rigged in complex ways that benefit some people on some axes while hurting them on others.

What''s helped me navigate this:

1. Finding community with other first-gen students. We get it in ways others don''t.
2. Recognizing when imposter syndrome is actually just me being underprepared due to lack of access—and doing the work to catch up.
3. Using my advantages to help others who face barriers I don''t face.
4. Being honest about what I don''t know instead of pretending.
5. Remembering that I earned my place here—not despite my background but including all of it.

The uncomfortable truth is that elite universities love talking about diversity while maintaining structures that benefit the already-privileged. They admit students like me for the stats, but don''t actually restructure for equity.

Financial aid isn''t enough when your classmates are doing unpaid internships you can''t afford. Diversity initiatives aren''t enough when the curriculum centers only certain perspectives. Access isn''t equity.

We belong here. But "here" needs to change to actually deserve us.',
     essay_category_id,
     224,
     NOW() - INTERVAL '2 weeks'),

    -- Essay 5: Unpaid Internships
    (NULL,
     'Jessica Wu',
     'https://i.pravatar.cc/100?u=jessica',
     'I turned down an unpaid internship at my dream non-profit to work a paid retail job the summer after sophomore year. My friends thought I was crazy. "It''s for the experience!" they said. "It''ll look amazing on your resume!"

Here''s what they didn''t say: they could afford to work for free. I couldn''t.

That summer, they posted Instagram photos from their internships—museum openings, NGO conferences, meeting important people in their fields. I posted nothing because who wants to see me folding clothes at a mall?

But here''s the thing: I needed that $4,000 to pay for books, food, and emergencies the next academic year. Without it, I would have had to take out more loans or drop out. The "opportunity" of an unpaid internship was a luxury I literally could not afford.

The unpaid internship system is designed to exclude poor students from entire career paths. Publishing, fashion, politics, non-profits, museums—all the "prestige" industries rely heavily on unpaid labor. The message is clear: if you need money to live, you don''t deserve access to these careers.

The worst part? It''s legal. Companies call you an "intern" instead of an employee, claim you''re "learning" instead of working, and get free labor while maintaining class barriers to entry.

Junior year, I found a paid internship in tech. It wasn''t my passion. But it paid $25/hour, gave me real skills, and didn''t require me to choose between my career and eating.

My friends who took unpaid internships? Some got full-time offers in their dream fields. Good for them. Others got "great experience" and no job—and now have student loans to pay back with entry-level salaries.

Meanwhile, I graduated with less debt and marketable skills. I might not be working at my "dream organization," but I''m financially stable and can actually save money. That''s its own kind of dream.

Here''s my advice:

1. Don''t let anyone make you feel guilty for needing to earn money.
2. If you can afford an unpaid internship, acknowledge your privilege and advocate for pay.
3. If you''re hiring, PAY YOUR INTERNS. Period.
4. Passion doesn''t pay rent. Don''t let companies exploit you with "opportunity."

The system is broken. But you don''t have to break yourself trying to succeed in it.',
     essay_category_id,
     187,
     NOW() - INTERVAL '3 weeks');

END $$;
