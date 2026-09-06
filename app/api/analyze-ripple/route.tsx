import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const rippleSchema = {
  type: "object",
  properties: {
    title: {
  type: "string",
  description:
    "A short, compelling title for this community need. Maximum 10 words.",
},
    category: {
      type: "string",
      description: "The main category of the community need.",
    },
    need: {
      type: "string",
      description: "A concise description of what is needed.",
    },
    impact: {
      type: "string",
      description:
        "Who could benefit. Do not invent numbers if none are provided.",
    },
    urgency: {
      type: "string",
      enum: ["LOW", "MEDIUM", "HIGH"],
    },
    description: {
      type: "string",
      description: "A clear and compassionate summary of the request.",
    },
  },
 required: [
  "category",
  "title",
  "need",
  "impact",
  "urgency",
  "description",
],
};

export async function POST(request: Request) {
  try {
    console.log(" API route reached");

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("GEMINI_API_KEY is missing");

      return NextResponse.json(
        {
          error:
            "Gemini API key is missing. Add GEMINI_API_KEY to .env.local",
        },
        { status: 500 }
      );
    }

    console.log("API key found");

    const body = await request.json();
    const userNeed = body.need;

    if (!userNeed || typeof userNeed !== "string") {
      return NextResponse.json(
        { error: "Please provide a need." },
        { status: 400 }
      );
    }

    console.log("Sending request to Gemini...");

    const ai = new GoogleGenAI({
      apiKey,
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `
You are the AI engine behind Ripple, a platform built around generosity.

Turn the user's description into a clear community-help request.

Rules:
- Do not invent facts.
- If no number of people impacted is given, say "Not specified".
- Keep the need practical and understandable.
- Choose an appropriate category.
- Assess urgency conservatively.
- Do not exaggerate.

User's description:
${userNeed}
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: rippleSchema,
      },
    });

    console.log(" Gemini responded");

    const text = response.text;

    if (!text) {
      throw new Error("Gemini returned an empty response");
    }

    const ripple = JSON.parse(text);

console.log("🗄️ Saving Ripple to Supabase...");

const { data, error } = await supabase
  .from("ripples")
  .insert({
    category: ripple.category,
    title: ripple.title,
    description: ripple.description,
    impact: ripple.impact,
    urgency: ripple.urgency,
    progress: 0,
    contributors: 0,
    location: "Community",
  })
  .select()
  .single();

if (error) {
  console.error(" Supabase error:", error);

  throw new Error(`Database error: ${error.message}`);
}

console.log(" Ripple saved:", data.id);

return NextResponse.json(data);
  } catch (error) {
    console.error("Ripple AI error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to analyze the Ripple.",
      },
      { status: 500 }
    );
  }
}