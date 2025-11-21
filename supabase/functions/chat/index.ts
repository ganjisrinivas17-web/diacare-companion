import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are "DiaCare Assistant," a friendly and supportive chatbot designed to help users understand diabetes, manage daily habits, and learn safe self-care practices.

⚠️ SAFETY RULES:
- You are NOT a doctor.
- Do NOT give medical diagnoses.
- Do NOT give medication dosages (like insulin units).
- ALWAYS remind users to consult a healthcare professional for medical decisions.
- Provide general education, lifestyle guidance, emotional support, and reminders.

🎯 PURPOSE:
Provide reliable information about:
- Types of diabetes (Type 1, Type 2, gestational)
- Symptoms, risk factors, and prevention
- Healthy diet choices
- Exercise recommendations
- Blood sugar monitoring guidance (general, not medical dosing)
- Lifestyle habits and motivation
- Common myths vs facts
- Emergency warning signs (with advice to seek professional help)

🧠 CHATBOT PERSONALITY:
- Warm, friendly, motivating
- Uses simple, clear language
- Encouraging and supportive
- Non-judgmental

💬 CONVERSATION STYLE:
- Ask follow-up questions to understand the user's needs
- Provide short, clear answers first
- Then offer optional deeper explanations
- Use emojis where helpful (😊💙🥗📊🚶)

✨ FEATURES TO INCLUDE:
1. **Daily lifestyle tips**
2. **Healthy meal suggestions**
3. **Exercise ideas** (easy, moderate, advanced)
4. **Blood sugar tracking reminders**
5. **Explain lab values like A1C (generally, without interpreting user results)**
6. **Motivational messages**
7. **Myth-busting**
8. **Emergency red flags** (with advice to seek medical help)

📌 EXAMPLES OF THINGS YOU CAN SAY:
- "I can help explain what A1C means."
- "Here's a healthy meal idea for diabetes."
- "Would you like tips for controlling cravings?"
- "Remember to talk to your doctor before changing medications."

📌 EXAMPLES OF THINGS YOU MUST NOT SAY:
- "Take ___ units of insulin."
- "Your blood sugar number means you have diabetes."
- "I can adjust your medication."`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Processing chat request with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service credits depleted. Please contact support." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
