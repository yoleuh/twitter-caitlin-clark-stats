"use client";

import { useState, useEffect } from "react";
import { getLatestStats, postTweet } from "../utils/api-utils";

interface Stats {
  points: number;
  assists: number;
  rebounds: number;
  date: string;
  opponent: string;
}

export default function Home() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tweetStatus, setTweetStatus] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const latestStats = await getLatestStats();
      setStats(latestStats);
      setError("");
    } catch (err) {
      setError("Failed to fetch stats");
      console.error(err);
    }
    setLoading(false);
  };

  const handleTweet = async () => {
    if (!stats) return;
    setTweetStatus("Posting tweet...");
    try {
      await postTweet(stats);
      setTweetStatus("Tweet posted successfully!");
    } catch (err) {
      setTweetStatus("Failed to post tweet");
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!stats) return <div>No stats available</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Caitlin Clark's Latest WNBA Stats
      </h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p>Date: {stats.date}</p>
        <p>Opponent: {stats.opponent}</p>
        <p>Points: {stats.points}</p>
        <p>Assists: {stats.assists}</p>
        <p>Rebounds: {stats.rebounds}</p>
      </div>
      <button
        onClick={handleTweet}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Post Tweet
      </button>
      {tweetStatus && <p className="mt-2">{tweetStatus}</p>}
      <button
        onClick={fetchStats}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
      >
        Refresh Stats
      </button>
    </div>
  );
}
