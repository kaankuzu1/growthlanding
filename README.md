# Audience Labs, first landing page

The first marketing site for Audience Labs, from its early days as a done-for-you clip growth service for Kick and Twitch streamers: we cut streams into vertical clips and pushed them to TikTok, Instagram Reels and YouTube Shorts.

Audience Labs has since become a self-serve tool and is in private beta. The current site is [audiencelabs.net](https://audiencelabs.net), where you can [request access](https://audiencelabs.net/request-access). This repo is kept as the earlier version.

![Hero](docs/hero.png)

## What's in it

- Next.js 16 (App Router) with React 19
- Scroll and entrance animations with Framer Motion
- English and Turkish content on `/en` and `/tr` routes, with a small middleware that picks the locale from the Accept-Language header
- WebGL background effect built with OGL
- Dark, Twitch-adjacent visual style

![Services](docs/services.png)

## The product behind it

The platform is a separate app in a private repo, now in private beta. It takes a Twitch or Kick VOD URL, transcribes it with Whisper on GPU, has an LLM find and score the moments worth clipping, then renders vertical clips with word-level captions and schedules them for publishing. Next.js dashboard, Python worker (yt-dlp, FFmpeg, faster-whisper), Supabase for data and realtime.

![Audience Labs app](docs/app-clips.png)

## Running locally

```bash
git clone https://github.com/kaankuzu1/growthlanding.git
cd growthlanding
npm install
npm run dev
```

Then open http://localhost:3000. The middleware redirects to `/en` or `/tr` based on your browser language.
