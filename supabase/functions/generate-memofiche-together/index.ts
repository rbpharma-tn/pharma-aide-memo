
// deno-lint-ignore-file no-explicit-any
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Utilise la clé déjà stockée dans les secrets
const apiKey = Deno.env.get("DEEPSEEK_API_KEY"); // renomme si tu veux un secret spécifique à Together

const TOGETHER_CHAT_URL = "https://api.together.xyz/v1/chat/completions";
const DEFAULT_MODEL = "togethercomputer/llama-3-70b-chat"; // Change ici pour le modèle voulu

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
    // On récupère aussi le "supplement.text" (texte collé)
    const { theme, supplement, model } = await req.json();

    if (!theme || typeof theme !== "string") {
      return new Response(JSON.stringify({ error: "Missing or invalid theme" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // On extrait le texte collé fourni, s’il y en a
    const pastedContext: string = (supplement && typeof supplement.text === "string" && supplement.text.trim().length > 0)
      ? supplement.text.trim()
      : "";

    // Prompt structuré avec contextualisation si texte collé fourni
    let systemPrompt = `Tu es un assistant expert pour aider des étudiants en pharmacie. Génère une mémofiche structurée sous format JSON avec les sections suivantes :
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

    // Ajoute le contexte si du texte collé est fourni
    if (pastedContext) {
      systemPrompt = `CONTEXTE fourni par l'utilisateur : 
""" 
${pastedContext}
"""

${systemPrompt}`;
    }

    // Appel Together Chat Completions
    const togetherResponse = await fetch(TOGETHER_CHAT_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: typeof model === "string" && model.length > 0 ? model : DEFAULT_MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Sujet : ${theme}` }
        ],
        max_tokens: 1100,
        temperature: 0.3
      }),
    });

    const togetherData = await togetherResponse.json();

    // Extraction du résultat
    const rawContent =
      togetherData.choices?.[0]?.message?.content ||
      togetherData.choices?.[0]?.data?.[0]?.text ||
      "";

    // Vérifier : JSON direct ou stringifiable ?
    let parsed: any;
    try {
      parsed = typeof rawContent === "object"
        ? rawContent
        : JSON.parse(rawContent);
    } catch (e) {
      // Peut-être mal formaté, essayer d’extraire un bloc JSON
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
        error: "La réponse IA n’est pas au format attendu.",
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
