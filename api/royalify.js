export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }

  try {
    const response = await fetch("https://api.cohere.ai/v1/chat", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command-r",  // works as per your Colab test
        message: `Rewrite this into short royal/archaic English (max one sentence, no long paragraphs):\n\n"${text}"`,
      }),
    });

    const data = await response.json();
    const royalText = data.text?.trim() || text;

    res.status(200).json({ royal_text: royalText });
  } catch (err) {
    console.error("Cohere API Error:", err);
    res.status(500).json({ error: "Failed to contact AI" });
  }
}
