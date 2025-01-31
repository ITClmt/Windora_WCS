import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const API_KEY = process.env.VITE_API_KEY;
  if (!API_KEY) {
    return res.status(500).json({ error: "API key missing" });
  }
  try {
    const { type, ...params } = req.query;
    let baseUrl: string;
    switch (type) {
      case "geo":
        baseUrl = "http://api.openweathermap.org/geo/1.0/direct";
        break;
      case "weather":
        baseUrl = "https://api.openweathermap.org/data/2.5/weather";
        break;
      case "forecast":
        baseUrl = "https://api.openweathermap.org/data/2.5/forecast";
        break;
      default:
        return res.status(400).json({ error: "Invalid request type" });
    }
    const queryParams = new URLSearchParams({
      ...params,
      appid: API_KEY,
    } as Record<string, string>);

    const response = await fetch(`${baseUrl}?${queryParams}`);
    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json(data);
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
