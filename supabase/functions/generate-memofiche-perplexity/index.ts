
// deno-lint-ignore-file no-explicit-any
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Récupération de la clé API Perplexity depuis les secrets Supabase
const perplexityApiKey = Deno.env.get("PERPLEXITY_API_KEY");

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
    // DEBUG: Vérification de la clé API
    if (!perplexityApiKey) {
      console.error("[DEBUG Perplexity API] PERPLEXITY_API_KEY absente ou vide.");
      return new Response(
        JSON.stringify({ error: "Clé API Perplexity absente dans l'env (Supabase secret: PERPLEXITY_API_KEY)." }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log(`[DEBUG Perplexity API] PERPLEXITY_API_KEY loaded successfully`);

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

    // Prompt Perplexity optimisé pour rechercher des infos actualisées
    let systemPrompt = `Tu es un assistant expert en pharmacie qui génère des mémofiches basées sur des sources fiables et actualisées. 

Génère une mémofiche structurée sous format JSON avec les sections suivantes :
{
  "title": "Titre de la mémofiche (ex : ${theme})",
  "subtitle": "Sous-titre concis",
  "description": "Résumé de la pathologie ou du conseil",
  "sections": [
    { "id": "memo", "label": "Mémo", "content": "Synthèse des points clés" },
    { "id": "cas", "label": "Cas comptoir", "content": "Bref exemple clinique ou dialogue patient-pharmacien" },
    { "id": "questions", "label": "Questions à poser", "content": "Questions essentielles à poser au patient" },
    { "id": "orienter", "label": "Quand orienter vers le médecin", "content": "Signes d'alarme justifiant une orientation" },
    { "id": "pathologie", "label": "Pathologie et signes typiques", "content": "Définition et symptômes majeurs" },
    { "id": "conseils", "label": "Conseils produit principal", "content": "Conseil sur le médicament à privilégier" },
    { "id": "associes", "label": "Produits associés", "content": "Conseils complémentaires éventuels" },
    { "id": "hygiene", "label": "Hygiène de vie & Alimentation", "content": "Conseils pratiques hors médicament" },
    { "id": "references", "label": "Références bibliographiques", "content": "Sources fiables à citer ou URL utiles" }
  ]
}

Utilise des phrases concises et précises adaptées à un étudiant en pharmacie.
Recherche des informations récentes et fiables sur le sujet.
Réponds uniquement par un objet JSON, sans explications autour.`;

    if (pastedContext) {
      systemPrompt = `CONTEXTE fourni par l'utilisateur : 
""" 
${pastedContext}
"""

${systemPrompt}`;
    }

    console.log("[DEBUG Perplexity API] Début de l'appel API");

    // Appel API Perplexity avec headers corrigés
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${perplexityApiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-large-128k-online',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `Sujet : ${theme}`
          }
        ],
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 1200,
        return_images: false,
        return_related_questions: false,
        search_recency_filter: 'month',
        frequency_penalty: 1,
        presence_penalty: 0
      }),
    });

    console.log(`[DEBUG Perplexity API] Statut de la réponse: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[DEBUG Perplexity API] Erreur ${response.status}: ${errorText}`);
      return new Response(JSON.stringify({
        error: `Erreur API Perplexity (${response.status}): ${errorText}`,
        raw: errorText
      }), {
        status: response.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const data = await response.json();
    console.log("[DEBUG Perplexity API] Réponse reçue avec succès");

    // Extraction du contenu
    const rawContent = data.choices?.[0]?.message?.content || "";

    // Parsing JSON
    let parsed: any;
    try {
      parsed = typeof rawContent === "object"
        ? rawContent
        : JSON.parse(rawContent);
    } catch (e) {
      // Essayer d'extraire un bloc JSON
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
      console.error("[DEBUG Perplexity API] Impossible de parser la réponse JSON");
      return new Response(JSON.stringify({
        error: "La réponse Perplexity n'est pas au format attendu.",
        raw: rawContent
      }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    console.log("[DEBUG Perplexity API] Mémofiche générée avec succès");
    return new Response(JSON.stringify({ memofiche: parsed }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("[DEBUG Perplexity API] Erreur dans catch:", err);
    return new Response(JSON.stringify({ error: err?.message || "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
