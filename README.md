# Caption & Hashtag Generator

This project is a multi-brand Instagram caption and hashtag generator with an AI-assisted backend powered by Google AI Studio (Gemini). It lets you select a brand, upload an optional image, describe the post you want to share, and receive polished captions and hashtag sets tailored to the brand.

## Prerequisites

- Node.js 18 or newer (for native `fetch` support) or Node.js 16+ with the provided `node-fetch` fallback.
- A Google AI Studio (Generative Language / Gemini) API key.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment template and add your API key:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set `GOOGLE_AI_STUDIO_API_KEY` to your Google AI Studio key. The user-provided key can be placed here.

3. Start the Express server:

   ```bash
   npm start
   ```

4. Open the application:

   Visit [http://localhost:3000](http://localhost:3000) in your browser. The frontend will fetch brand metadata from `brandData.json` and use the `/api/generate` endpoint to request AI-generated captions and hashtags.

## API Notes

- The backend calls the `gemini-1.5-flash` model via Google AI Studio.
- Requests include optional inline image data when an image is uploaded.
- Responses are normalized to ensure the frontend always receives caption and hashtag arrays.

## Environment Variables

- `GOOGLE_AI_STUDIO_API_KEY`: (Required) Your Google AI Studio API key. Alternately you can use `GOOGLE_API_KEY` or `GOOGLE_STUDIO_API_KEY` for compatibility.
- `PORT`: (Optional) Override the default Express port (3000).

## Development Tips

- Brand configuration lives in `brandData.json` and is shared between the frontend and backend.
- AI usage metadata (token counts and optional notes) is displayed in the UI when available.
- If the AI response is malformed, the backend provides deterministic fallbacks using the brand configuration.
