import axios from "axios";
import { RAPID_API_KEY, RAPID_API_HOST } from "@/config";

const api = axios.create({
  baseURL: `https://${RAPID_API_HOST}`,
  headers: {
    "X-RapidAPI-Key": RAPID_API_KEY,
    "X-RapidAPI-Host": RAPID_API_HOST,
  },
});

export async function getGamesForDate(date: string) {
  const response = await api.get(`/games/date/${date}`);
  return response.data;
}

export async function getPlayerData(playerName: string) {
  const response = await api.get("/api/wnba_player_data", {
    params: { player_name: playerName },
  });
  return response.data;
}

export async function getPlayerAvgStats(playerName: string) {
  const response = await api.get("/api/wnba_player_avg_stats", {
    params: { player_name: playerName },
  });
  return response.data;
}
