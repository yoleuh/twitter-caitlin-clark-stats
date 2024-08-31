import { NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";

const client = new TwitterApi({
  appKey: process.env.TWITTER_APP_KEY!,
  appSecret: process.env.TWITTER_APP_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
});

export async function POST(request: Request) {
  try {
    const stats = await request.json();
    const tweet = `Caitlin Clark's latest WNBA stats vs ${stats.opponent} (${stats.date}):
Points: ${stats.points}
Assists: ${stats.assists}
Rebounds: ${stats.rebounds}
#CaitlinClark #WNBA`;

    await client.v2.tweet(tweet);
    return NextResponse.json(
      { message: "Tweet posted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { message: "Error posting tweet", error },
      { status: 500 }
    );
  }
}
