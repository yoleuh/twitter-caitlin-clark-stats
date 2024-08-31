import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const RAPID_API_KEY = process.env.RAPID_API_KEY;
  const RAPID_API_HOST = "wnba-stats-projections.p.rapidapi.com";

  try {
    const response = await axios.get(
      `https://${RAPID_API_HOST}/api/wnba_player_data`,
      {
        params: { player_name: "Caitlin Clark" },
        headers: {
          "X-RapidAPI-Key": RAPID_API_KEY,
          "X-RapidAPI-Host": RAPID_API_HOST,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Error fetching stats" });
  }
}
