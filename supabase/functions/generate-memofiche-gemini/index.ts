// deno-lint-ignore-file no-explicit-any
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Récupération de la clé API Gemini depuis les secrets Supabase
const geminiApiKey = Deno.env.get("GEMINI_API_KEY");
console.log("[DEBUG Gemini API key] GEMINI_API_KEY starts with:", geminiApiKey?.substring(0, 5) ?? "undefined");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { theme, supplement } = await req.json();

    if (!theme || typeof theme !== "string") {
      return new Response(JSON.stringify({ error: "Missing or invalid theme" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Prise en compte du texte collé
    const pastedContext: string = (supplement && typeof supplement.text === "string" && supplement.text.trim().length > 0)
      ? supplement.text.trim()
      : "";

    // Prompt Gemini
    let fullPrompt = `Tu es un assistant expert pour aider des étudiants en pharmacie. Génère une mémofiche structurée sous format JSON avec les sections suivantes :
{
  "title": "Titre de la mémofiche (ex : ${theme})",
  "subtitle": "Sous-titre concis",
  "description": "Résumé de la pathologie ou du conseil",
  "sections": [
    { "id": "memo", "label": "Mémo", "content": "Synthèse des points clés" },
    { "id": "cas", "label": "Cas comptoir", "content": "Bref exemple clinique ou dialogue patient-pharmacien" },
    { "id": "questions", "label": "Questions à poser", "content": "Questions essentielles à poser au patient" },
    { "id": "orienter", "label": "Quand orienter vers le médecin", "content": "Signes d’alarme justifiant une orientation" },
    { "id": "pathologie", "label": "Pathologie et signes typiques", "content": "Définition et symptômes majeurs" },
    { "id": "conseils", "label": "Conseils produit principal", "content": "Conseil sur le médicament à privilégier" },
    { "id": "associes", "label": "Produits associés", "content": "Conseils complémentaires éventuels" },
    { "id": "hygiene", "label": "Hygiène de vie & Alimentation", "content": "Conseils pratiques hors médicament" },
    { "id": "references", "label": "Références bibliographiques", "content": "Sources fiables à citer ou URL utiles" }
  ]
}
- Utilise des phrases concises et précises adaptées à un étudiant.
- Réponds uniquement par un objet JSON, sans explications autour.`;

    if (pastedContext) {
      fullPrompt = `CONTEXTE fourni par l'utilisateur : 
""" 
${pastedContext}
"""

${fullPrompt}`;
    }

    // Appel Gemini API (model: gemini-1.5-flash, prompt texte)
    // Gemini attend le prompt dans "contents".
    const geminiFetch = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + geminiApiKey, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          { role: "user", parts: [{ text: fullPrompt }] },
          { role: "user", parts: [{ text: `Sujet : ${theme}` }] }
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 1100
        }
      })
    });

    const geminiData = await geminiFetch.json();

    // Gemini structure sa réponse dans candidates[].content.parts[].text
    let rawContent = "";
    try {
      rawContent = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    } catch {
      rawContent = "";
    }

    // Extraction et parsing JSON
    let parsed: any;
    try {
      parsed = typeof rawContent === "object"
        ? rawContent
        : JSON.parse(rawContent);
    } catch (e) {
      // Essayer d’extraire un bloc JSON si Gemini a entouré de texte
      const m = rawContent.match(/\{[\s\S]*\}/);
      if (m) {
        try {
          parsed = JSON.parse(m[0]);
        } catch {
          parsed = null;
        }
      }
    }

    if (!parsed) {
      return new Response(JSON.stringify({
        error: "La réponse Gemini n’est pas au format attendu.",
        raw: rawContent
      }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ memofiche: parsed }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
