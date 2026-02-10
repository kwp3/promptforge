# PromptForge — Content Strategy
**Author:** Pyrex 📋 | **Date:** 2026-02-09 | **Status:** Draft

---

## 1. Prompt Categories

| # | Emoji | Category | Description |
|---|-------|----------|-------------|
| 1 | 💻 | Coding | Software development, debugging, architecture, code review, DevOps |
| 2 | ✍️ | Writing | Blog posts, essays, fiction, copywriting, editing, academic writing |
| 3 | 💼 | Business | Emails, proposals, strategy docs, presentations, meeting agendas |
| 4 | 🎨 | Creative | Art prompts, brainstorming, storytelling, worldbuilding, music, design |
| 5 | 📚 | Education | Lesson plans, explanations, study guides, tutoring, curriculum design |
| 6 | 📢 | Marketing | Ad copy, social media, SEO content, campaigns, brand voice, newsletters |

---

## 2. Starter Templates (3 per Category)

### 💻 Coding

**Template 1: Code Review Assistant**
- *Description:* Get a thorough code review with actionable feedback
- *Example Input:* "Review my React component that fetches user data"
- *Example Output:* "Act as a senior React developer conducting a code review. Analyze the provided React component that fetches user data. Evaluate: 1) Hook usage and lifecycle management, 2) Error handling and loading states, 3) Performance (unnecessary re-renders, memoization opportunities), 4) TypeScript type safety, 5) Accessibility concerns. For each issue found, explain WHY it's a problem and provide a corrected code snippet. Rate the overall code quality on a scale of 1-10."

**Template 2: Debug Detective**
- *Description:* Systematic debugging approach for tricky bugs
- *Example Input:* "My API calls work locally but fail in production with CORS errors"
- *Example Output:* "Act as a senior backend engineer specializing in API architecture and CORS configuration. I'm experiencing an issue where API calls succeed in my local development environment but fail in production with CORS errors. Walk me through a systematic debugging process: 1) List the most common causes of CORS discrepancies between local and production environments, 2) Provide specific diagnostic steps to identify the root cause (browser DevTools checks, server header inspection, proxy configuration review), 3) For each potential cause, provide the exact configuration fix with code examples for [Node.js/Express, Nginx, and cloud platforms]. Include both quick fixes and proper long-term solutions."

**Template 3: Architecture Planner**
- *Description:* Design system architecture for a new project
- *Example Input:* "Plan a real-time chat app with file sharing"
- *Example Output:* "Act as a solutions architect designing a real-time chat application with file sharing capabilities. Provide a comprehensive architecture document covering: 1) **Tech Stack Selection** — recommend specific technologies with justification (frontend framework, backend, database, real-time protocol, file storage), 2) **System Architecture Diagram** — describe the component layout (in text/ASCII), 3) **Data Model** — key entities and relationships, 4) **Real-time Strategy** — WebSocket vs SSE vs polling with trade-offs, 5) **File Handling** — upload flow, storage (S3/equivalent), CDN, size limits, virus scanning, 6) **Scalability Plan** — how to handle 100, 10K, 1M concurrent users, 7) **Security** — authentication, encryption, rate limiting. Keep recommendations practical for a small team starting an MVP."

---

### ✍️ Writing

**Template 1: Blog Post Architect**
- *Description:* Structure and outline a compelling blog post
- *Example Input:* "Write about why developers should learn Rust in 2026"
- *Example Output:* "Act as an experienced tech blogger with 10+ years of writing for developer audiences. Write a compelling, well-structured blog post about why developers should learn Rust in 2026. Requirements: 1) **Hook** — open with a surprising statistic or provocative statement, 2) **Structure** — use H2 headers for main sections, H3 for subsections, 3) **Content** — cover: the current Rust ecosystem, real-world adoption stories, performance benchmarks vs Go/C++, the learning curve reality, career opportunities, 4) **Tone** — conversational but authoritative, avoid hype, acknowledge trade-offs honestly, 5) **Length** — 1,500-2,000 words, 6) **SEO** — naturally incorporate relevant keywords, 7) **CTA** — end with actionable next steps for the reader. Include code snippets where relevant."

**Template 2: Story Seed Expander**
- *Description:* Develop a story concept into a rich narrative outline
- *Example Input:* "A librarian discovers books are disappearing and rewriting themselves"
- *Example Output:* "Act as a creative writing mentor and published fiction author. Take this story concept — 'A librarian discovers books are disappearing and rewriting themselves' — and develop it into a rich narrative outline. Include: 1) **Genre & Tone** — suggest the ideal genre and tonal approach, 2) **Protagonist** — detailed character profile (name, background, personality, flaw, desire), 3) **World Rules** — how does this book phenomenon work? What are the rules and limits? 4) **Plot Structure** (3-act): inciting incident, rising complications (3-4 escalating events), midpoint twist, crisis, climax, resolution, 5) **Supporting Characters** — 2-3 key characters with roles in the story, 6) **Thematic Core** — what deeper question does this story explore? 7) **Opening Scene** — write the first 200 words to establish voice. Make it literary fiction with speculative elements."

**Template 3: Email Polisher**
- *Description:* Transform rough email drafts into professional communications
- *Example Input:* "Tell my boss I need Friday off for a dentist appointment"
- *Example Output:* "Act as a professional communications coach. Transform this rough email intent into a polished, professional email. Context: Requesting Friday off for a dentist appointment, writing to my direct manager. Generate: 1) **Subject line** — clear and specific, 2) **Email body** — professional but warm tone, concise (under 100 words), includes: the request, the date, brief reason, any coverage plan for your responsibilities, 3) **Three versions**: a) Formal (traditional corporate), b) Professional-casual (modern workplace), c) Brief (for a manager you have a close working relationship with). Each version should feel natural, not robotic. Also suggest the best time to send it for maximum likelihood of approval."

---

### 💼 Business

**Template 1: Proposal Builder**
- *Description:* Create a professional business proposal framework
- *Example Input:* "Propose migrating our company from Slack to Microsoft Teams"
- *Example Output:* "Act as a senior IT consultant preparing a business proposal for C-suite executives. Create a comprehensive proposal for migrating from Slack to Microsoft Teams. Structure: 1) **Executive Summary** (2-3 sentences), 2) **Current State Assessment** — Slack costs, limitations, integration gaps, 3) **Proposed Solution** — Teams benefits, M365 ecosystem advantages, 4) **Cost Analysis** — current Slack spend vs Teams (include per-user pricing tiers), TCO over 3 years, 5) **Migration Plan** — phased timeline (pilot → department → full rollout), 6) **Risk Assessment** — top 5 risks with mitigation strategies, 7) **Change Management** — training plan, adoption metrics, champion program, 8) **Success Metrics** — KPIs to measure post-migration success, 9) **Recommendation** — clear recommendation with confidence level. Use professional business language. Include placeholder spots for company-specific data."

**Template 2: Meeting Agenda Creator**
- *Description:* Structure an effective meeting agenda
- *Example Input:* "Quarterly team retrospective for a 12-person engineering team"
- *Example Output:* "Act as an experienced engineering manager and certified Scrum Master. Create a structured, time-boxed agenda for a quarterly retrospective with a 12-person engineering team. Include: 1) **Pre-meeting prep** — what attendees should prepare/reflect on before the meeting, 2) **Agenda** with time allocations for a 90-minute session: opening/icebreaker, what went well, what needs improvement, action item brainstorming, voting/prioritization, action item assignment, closing, 3) **Facilitation Notes** — tips for keeping discussion productive, handling dominant voices, encouraging quiet team members, 4) **Templates** — provide the actual Miro/whiteboard layout description, 5) **Follow-up Plan** — how to track action items post-meeting. Format as a ready-to-share document."

**Template 3: SWOT Analysis Generator**
- *Description:* Comprehensive SWOT analysis for business decisions
- *Example Input:* "SWOT analysis for launching a SaaS product in the project management space"
- *Example Output:* "Act as a business strategy consultant with expertise in SaaS markets. Conduct a thorough SWOT analysis for launching a new SaaS product in the project management space. For each quadrant, provide 5-7 specific, actionable points: 1) **Strengths** — what advantages could a new entrant have? 2) **Weaknesses** — realistic challenges for a startup in this space, 3) **Opportunities** — market trends, underserved segments, emerging needs, 4) **Threats** — established competitors, market saturation, economic factors. Then provide: 5) **Strategic Recommendations** — 3 strategies that leverage strengths to capture opportunities, 3 strategies that address weaknesses to mitigate threats, 6) **Go/No-Go Assessment** — honest evaluation of market viability with conditions for success. Base analysis on current 2026 market conditions."

---

### 🎨 Creative

**Template 1: Art Direction Brief**
- *Description:* Create detailed prompts for AI image generation
- *Example Input:* "A cozy coffee shop in a cyberpunk city"
- *Example Output:* "Act as an art director creating a detailed visual brief for AI image generation. Concept: 'A cozy coffee shop in a cyberpunk city.' Generate: 1) **Primary prompt** — detailed scene description (composition, lighting, mood, key elements, style), optimized for AI image generators, 2) **Style variations** — provide 3 different artistic interpretations: a) Photorealistic, b) Anime/manga style, c) Oil painting style, 3) **Technical specs** — recommended aspect ratio, suggested negative prompts, style keywords, 4) **Color palette** — describe the dominant colors and mood they create, 5) **Composition notes** — foreground/midground/background elements, focal point, leading lines. Each prompt should be 50-100 words, rich with visual detail."

**Template 2: Brainstorm Catalyst**
- *Description:* Generate creative ideas for any project
- *Example Input:* "Unique team-building activities for a remote company"
- *Example Output:* "Act as a creative director known for innovative, outside-the-box thinking. Generate a comprehensive brainstorm of unique team-building activities for a fully remote company. Provide: 1) **10 Activity Ideas** — each with: name, description (2-3 sentences), time required, group size, tools needed, estimated cost, 2) **Categorize them**: low-effort/high-fun, creative/artistic, competitive, learning-focused, casual social, 3) **3 Deep Dives** — pick the 3 most unique ideas and flesh them out with step-by-step implementation guides, 4) **Inclusion Notes** — how to make each activity accessible across time zones, introvert-friendly, and culturally sensitive, 5) **Wildcard** — one completely unconventional idea that might seem crazy but could be amazing. Push beyond the obvious (no virtual happy hours or trivia nights)."

**Template 3: Worldbuilding Framework**
- *Description:* Build rich fictional worlds for stories or games
- *Example Input:* "A world where music has magical properties"
- *Example Output:* "Act as a worldbuilding expert and fantasy author. Develop a rich fictional world where music has magical properties. Cover: 1) **Magic System** — how does music create magic? Rules, limitations, costs, scales of power, 2) **Society & Culture** — how has musical magic shaped civilization? Social hierarchy, education, economy, 3) **Geography** — 3-4 distinct regions influenced by musical magic, 4) **History** — key historical events (the discovery of musical magic, wars fought with it, a golden age, a catastrophe), 5) **Conflicts** — 3 major tensions in this world (political, social, existential), 6) **Characters** — 3 character archetypes unique to this world, 7) **Sensory Details** — what does this world sound, look, feel like? 8) **Story Hooks** — 5 compelling story premises set in this world. Be specific and internally consistent."

---

### 📚 Education

**Template 1: Lesson Plan Designer**
- *Description:* Create engaging, structured lesson plans
- *Example Input:* "Teach 10th graders about the causes of World War I"
- *Example Output:* "Act as an experienced high school history teacher with a passion for interactive learning. Create a detailed lesson plan for teaching 10th graders about the causes of World War I. Include: 1) **Learning Objectives** (3-4, aligned to Bloom's taxonomy), 2) **Warm-Up** (5 min) — engaging hook activity, 3) **Direct Instruction** (15 min) — key content with primary source integration, 4) **Interactive Activity** (20 min) — student-centered activity (debate, simulation, group analysis), 5) **Assessment** — formative check for understanding, 6) **Differentiation** — modifications for advanced learners, struggling students, and ELL students, 7) **Materials List** — everything needed, 8) **Homework/Extension** — meaningful follow-up task. Total class time: 50 minutes. Make it engaging — no 50-minute lectures."

**Template 2: Concept Explainer**
- *Description:* Explain complex topics at any level
- *Example Input:* "Explain how neural networks learn, for a high school student"
- *Example Output:* "Act as a gifted science communicator (think: 3Blue1Brown meets Bill Nye). Explain how neural networks learn to a high school student with basic algebra knowledge. Requirements: 1) **Start with analogy** — relatable comparison from everyday life, 2) **Build up in layers**: a) What is a neural network? (simple diagram description), b) What are weights and biases? (use a concrete example), c) How does training work? (forward pass, loss, backpropagation — no calculus), d) Why does it work? (intuition, not math), 3) **Include** — 2-3 specific examples of neural networks they use daily, 4) **Common misconceptions** — address 2-3 things people get wrong, 5) **Check understanding** — 3 questions they should be able to answer after reading, 6) **Go deeper** — suggest 2-3 resources for students who want to learn more. Use casual, encouraging tone. Avoid jargon or define it immediately."

**Template 3: Study Guide Builder**
- *Description:* Create comprehensive study materials for any subject
- *Example Input:* "AP Chemistry exam prep for thermodynamics unit"
- *Example Output:* "Act as an AP Chemistry teacher who consistently gets 90%+ of students to score 4 or 5. Create a comprehensive study guide for the thermodynamics unit. Include: 1) **Key Concepts List** — every concept students must know, organized by importance, 2) **Essential Equations** — with explanations of when to use each one, 3) **Common Exam Question Types** — 5 categories with example problems and solutions, 4) **Misconception Alerts** — top 5 mistakes students make on thermodynamics questions, 5) **Practice Problems** — 10 problems graduated from basic → AP exam difficulty, with detailed solutions, 6) **Memory Aids** — mnemonics, visual tricks, conceptual shortcuts, 7) **Quick Reference Card** — one-page summary of everything (designed to fit on an index card). Focus on exam strategy, not just content."

---

### 📢 Marketing

**Template 1: Social Media Campaign**
- *Description:* Plan a multi-platform social media campaign
- *Example Input:* "Launch campaign for a new plant-based protein bar"
- *Example Output:* "Act as a social media marketing strategist at a top agency. Create a comprehensive launch campaign for a new plant-based protein bar. Include: 1) **Campaign Concept** — central theme/hook, hashtag, campaign name, 2) **Platform Strategy** — tailored content plan for Instagram, TikTok, Twitter/X, and LinkedIn, 3) **Content Calendar** — 2-week launch schedule with specific post ideas (15-20 posts total), 4) **Post Examples** — write 3 actual posts per platform with captions, hashtags, and visual descriptions, 5) **Influencer Strategy** — target influencer tiers and outreach approach, 6) **Paid Strategy** — recommended ad spend allocation and targeting parameters, 7) **KPIs** — success metrics for each platform, 8) **UGC Plan** — how to encourage user-generated content. Budget assumption: $5K total for launch month."

**Template 2: SEO Content Brief**
- *Description:* Create an SEO-optimized content brief
- *Example Input:* "SEO article targeting 'best standing desks 2026'"
- *Example Output:* "Act as a senior SEO content strategist with a track record of ranking pages #1. Create a detailed content brief for an article targeting 'best standing desks 2026.' Include: 1) **Primary Keyword** + 10 secondary/LSI keywords to include naturally, 2) **Search Intent Analysis** — what is the searcher really looking for? 3) **Recommended Structure** — H1, H2s, H3s with suggested headings, 4) **Content Requirements** — word count, tone, reading level, must-include sections (comparison table, buying guide, FAQ), 5) **Competitor Analysis** — what the current top 3 results do well and miss, 6) **Featured Snippet Opportunity** — format a section to win the snippet, 7) **Internal/External Linking** — strategy for links, 8) **Meta Title & Description** — optimized with click-worthy copy. Target: 2,500-3,000 words, 8+ minute read time."

**Template 3: Email Sequence Builder**
- *Description:* Design an automated email marketing sequence
- *Example Input:* "Welcome email sequence for a SaaS free trial"
- *Example Output:* "Act as an email marketing specialist who has optimized sequences for 100+ SaaS companies. Design a 7-email welcome sequence for a SaaS free trial (14-day trial period). For each email provide: 1) **Send timing** (day/trigger), 2) **Subject line** (+ A/B variant), 3) **Preview text**, 4) **Email body** (full copy), 5) **CTA** (primary + secondary), 6) **Goal** of this specific email. Sequence flow: Email 1 (Day 0): Welcome + quick start, Email 2 (Day 1): Key feature highlight, Email 3 (Day 3): Social proof/case study, Email 4 (Day 5): Advanced feature + tip, Email 5 (Day 8): Check-in + offer help, Email 6 (Day 11): Urgency + upgrade benefits, Email 7 (Day 13): Final CTA + limited offer. Include segmentation triggers — if user activates key feature, skip certain emails. Optimize for conversion, not just opens."

---

## 3. System Prompt (for API)

```
You are PromptForge, an expert prompt engineer. Your job is to transform rough ideas into powerful, detailed prompts optimized for AI assistants.

CATEGORY: {{category}}
USER INPUT: {{input}}

Transform the user's rough input into a comprehensive, well-structured prompt. Follow these rules:

1. Add a clear ROLE for the AI to assume (relevant expert/specialist)
2. Expand vague requests into specific, actionable instructions
3. Add STRUCTURE — numbered steps, sections, or deliverables
4. Include CONSTRAINTS — word count, tone, format, audience level
5. Add QUALITY MARKERS — what "good" looks like for this request
6. Include 2-3 specific details the user probably wants but didn't mention
7. Keep the enhanced prompt under 300 words
8. Match the prompt style to the category (technical for coding, creative for art, professional for business)
9. Write in second person ("Act as...", "Provide...", "Include...")
10. Never explain what you're doing — just output the enhanced prompt

Output ONLY the enhanced prompt. No preamble, no explanation, no meta-commentary.
```

---

## 4. Tone Guidelines

### Voice
- **Warm** — friendly, approachable, never cold or robotic
- **Confident** — we know prompts, and it shows
- **Playful** — light touches of humor, forge/fire metaphors welcome
- **Inclusive** — anyone can use this, no gatekeeping
- **Concise** — respect the user's time, don't over-explain

### Do
- Use contractions (it's, you'll, don't)
- Use emoji sparingly but effectively (🔥 is our signature)
- Speak directly to the user ("you" not "users")
- Celebrate the output ("Nice — that's a solid prompt")
- Keep instructions under 10 words when possible

### Don't
- Use jargon without context
- Be condescending ("It's easy!" "Simply just...")
- Over-promise ("The BEST prompt EVER")
- Use corporate speak ("leverage", "synergize", "optimize your workflow")
- Apologize unnecessarily
