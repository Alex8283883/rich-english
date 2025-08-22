export default function handler(req, res) {
  res.status(200).json({
    hasKey: process.env.COHERE_API_KEY ? true : false,
    preview: process.env.COHERE_API_KEY 
      ? process.env.COHERE_API_KEY.slice(0, 6) + "..." 
      : "not set"
  });
}
