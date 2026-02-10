import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT, CATEGORIES, MAX_INPUT_LENGTH } from "@/lib/constants";

const VALID_CATEGORIES = CATEGORIES.map((c) => c.id);

export async function POST(req: NextRequest) {
  try {
    const { category, rawPrompt } = await req.json();

    if (!rawPrompt?.trim()) {
      return NextResponse.json(
        { error: "Please describe your idea first." },
        { status: 400 }
      );
    }

    if (category && !VALID_CATEGORIES.includes(category)) {
      return NextResponse.json(
        { error: "Invalid category." },
        { status: 400 }
      );
    }

    const sanitizedPrompt = rawPrompt.trim().slice(0, MAX_INPUT_LENGTH);

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://promptforge.vercel.app",
          "X-Title": "PromptForge",
        },
        body: JSON.stringify({
          model: "stepfun/step-3.5-flash:free",
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT.replace(
                "{{category}}",
                category || "General"
              ),
            },
            {
              role: "user",
              content: `[USER INPUT START]\n${sanitizedPrompt}\n[USER INPUT END]`,
            },
          ],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenRouter error:", errorData);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const enhancedPrompt = data.choices?.[0]?.message?.content?.trim();

    if (!enhancedPrompt) {
      return NextResponse.json(
        { error: "No prompt was generated. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ enhancedPrompt });
  } catch (error) {
    console.error("Forge API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
