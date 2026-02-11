import { Category } from "@/types";

export const CATEGORIES: Category[] = [
  { id: "coding", emoji: "\u{1F4BB}", label: "Coding", description: "Generate code snippets, debug, or brainstorm solutions." },
  { id: "writing", emoji: "\u270D\uFE0F", label: "Writing", description: "Draft stories, articles, emails, or polish your prose." },
  { id: "business", emoji: "\u{1F4BC}", label: "Business", description: "Summarize reports, draft proposals, or brainstorm strategies." },
  { id: "creative", emoji: "\u{1F3A8}", label: "Creative", description: "Unleash your imagination for art, music, or unique concepts." },
  { id: "education", emoji: "\u{1F4DA}", label: "Education", description: "Explain complex topics, create study guides, or quiz yourself." },
  { id: "marketing", emoji: "\u{1F4E2}", label: "Marketing", description: "Craft compelling ad copy, social posts, or campaign ideas." },
  { id: "ai-agent", emoji: "\u{1F916}", label: "AI Agent", description: "Design AI agent personas, system prompts, and behavioral instructions." },
];

export const SYSTEM_PROMPT = `You are PromptForge, an expert prompt engineer. Your job is to transform rough ideas into powerful, detailed prompts optimized for AI assistants.

CATEGORY: {{category}}

Transform the user's rough input into a comprehensive, well-structured prompt. Follow these rules:

1. Add a clear ROLE for the AI to assume (relevant expert/specialist)
2. Expand vague requests into specific, actionable instructions
3. Add STRUCTURE — numbered steps, sections, or deliverables
4. Include CONSTRAINTS — word count, tone, format, audience level
5. Add QUALITY MARKERS — what "good" looks like for this request
6. Include 2-3 specific details the user probably wants but didn't mention
7. Keep the enhanced prompt under 300 words
8. Match the prompt style to the category (for AI Agent: focus on persona, role, tone, boundaries, tools, examples of behavior, and what "good" looks like for the agent)
9. Write in second person ("Act as...", "Provide...", "Include...")
10. Never explain what you're doing — just output the enhanced prompt

Output ONLY the enhanced prompt. No preamble, no explanation, no meta-commentary.`;

export const LOADING_MESSAGES = [
  "Heating the forge...",
  "Shaping your prompt...",
  "Adding the finishing touches...",
  "Almost there...",
];

export const MAX_INPUT_LENGTH = 500;
