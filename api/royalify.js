export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }

  try {
    // Call Cohere API with GENERATION model
    const response = await fetch("https://api.cohere.ai/v1/generate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command-r", // or "command-r-plus" if you have access
        prompt: `Rewrite this into royal, archaic English:\n\n"${text}"`,
        max_tokens: 60,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const royalText = data.generations?.[0]?.text?.trim() || text;

    res.status(200).json({ royal_text: royalText });
  } catch (err) {
    console.error("Cohere API Error:", err);
    res.status(500).json({ error: "Failed to contact AI" });
  }
}
