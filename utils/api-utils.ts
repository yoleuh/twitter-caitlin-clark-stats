import axios from "axios";

const RAPID_API_KEY = process.env.RAPID_API_KEY;
const RAPID_API_HOST = "wnba-stats-projections.p.rapidapi.com";

export async function getLatestStats() {
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
    const latestGame = response.data[0]; // Assuming the API returns data sorted by date
    return {
      points: latestGame.points,
      assists: latestGame.assists,
      rebounds: latestGame.rebounds,
      date: latestGame.game_date,
      opponent: latestGame.opponent,
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    throw error;
  }
}

export async function postTweet(stats: any) {
  try {
    const response = await axios.post("/api/post-stats", stats);
    return response.data;
  } catch (error) {
    console.error("Error posting tweet:", error);
    throw error;
  }
}
