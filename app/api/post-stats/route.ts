import { NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";
import { TWITTER_CONFIG } from "@/config";
import { getFormattedDate } from "@/utils/date-utils";
import {
  getGamesForDate,
  getPlayerData,
  getPlayerAvgStats,
} from "@/utils/api-utils";

const client = new TwitterApi(TWITTER_CONFIG);

interface PlayerStats {
  points: number;
  assists: number;
  rebounds: number;
}

async function getCaitlinClarkStats(): Promise<PlayerStats | null> {
  try {
    const today = getFormattedDate(new Date());
    const games = await getGamesForDate(today);
    const feverGame = games.find(
      (game: any) =>
        game.home_team === "Indiana Fever" || game.away_team === "Indiana Fever"
    );

    if (!feverGame) {
      console.log("No Fever game today");
      return null;
    }

    const playerData = await getPlayerData("Caitlin Clark");
    const latestGame = playerData[0]; // Assuming the API returns data sorted by date

    return {
      points: latestGame.points,
      assists: latestGame.assists,
      rebounds: latestGame.rebounds,
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return null;
  }
}

async function getAverageStats(): Promise<PlayerStats | null> {
  try {
    const avgStats = await getPlayerAvgStats("Caitlin Clark");
    return {
      points: avgStats.avg_points,
      assists: avgStats.avg_assists,
      rebounds: avgStats.avg_rebounds,
    };
  } catch (error) {
    console.error("Error fetching average stats:", error);
    return null;
  }
}

async function postTweet(
  stats: PlayerStats,
  avgStats: PlayerStats
): Promise<void> {
  const tweet = `Caitlin Clark's latest WNBA stats:
Points: ${stats.points} (Season avg: ${avgStats.points})
Assists: ${stats.assists} (Season avg: ${avgStats.assists})
Rebounds: ${stats.rebounds} (Season avg: ${avgStats.rebounds})
#CaitlinClark #WNBA`;

  await client.v2.tweet(tweet);
}

export async function POST() {
  try {
    const stats = await getCaitlinClarkStats();
    const avgStats = await getAverageStats();

    if (stats && avgStats) {
      await postTweet(stats, avgStats);
      return NextResponse.json(
        { message: "Tweet posted successfully!", stats, avgStats },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "No stats available for Caitlin Clark today." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { message: "Error posting tweet", error },
      { status: 500 }
    );
  }
}
