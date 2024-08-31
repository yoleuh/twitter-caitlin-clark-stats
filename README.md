# Caitlin Clark WNBA Stats Twitter Bot

This project is a Twitter bot that posts Caitlin Clark's latest WNBA game stats and season averages.

## Setup

1. Clone this repository
2. Run `npm install` to install dependencies
3. Create a `.env.local` file in the root directory and add your API keys:

```
RAPID_API_KEY=your_rapid_api_key_here
TWITTER_APP_KEY=your_twitter_app_key_here
TWITTER_APP_SECRET=your_twitter_app_secret_here
TWITTER_ACCESS_TOKEN=your_twitter_access_token_here
TWITTER_ACCESS_TOKEN_SECRET=your_twitter_access_token_secret_here
```

4. Run `npm run dev` to start the development server

## Usage

Send a POST request to `/api/post-stats` to trigger the bot. It will check if there's a game today, fetch the latest stats and season averages, and post a tweet if data is available.

## Deployment

Deploy this Next.js application to your preferred hosting platform (e.g., Vercel, Netlify). Set up a cron job or scheduled task to hit the `/api/post-stats` endpoint daily during the WNBA season.
