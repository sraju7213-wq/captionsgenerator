const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const fetch = global.fetch || ((...args) => import('node-fetch').then(({ default: fetchFn }) => fetchFn(...args)));

const app = express();
const PORT = process.env.PORT || 3000;
const GOOGLE_API_KEY = process.env.GOOGLE_AI_STUDIO_API_KEY || process.env.GOOGLE_API_KEY || process.env.GOOGLE_STUDIO_API_KEY;

const brandData = require('./brandData.json');

app.use(cors());
app.use(express.json({ limit: '12mb' }));

app.use(express.static(path.join(__dirname)));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/generate', async (req, res) => {
  try {
    if (!GOOGLE_API_KEY) {
      return res.status(500).json({ error: 'AI API key not configured on server' });
    }

    const { brandId, context, imageDataUrl } = req.body || {};

    if (!brandId) {
      return res.status(400).json({ error: 'brandId is required' });
    }

    const brand = brandData.brands.find((item) => item.id === brandId);
    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    const prompt = buildPrompt({
      brand,
      context,
      brandData,
      hasImage: Boolean(imageDataUrl)
    });

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GOOGLE_API_KEY}`;

    const parts = [{ text: prompt }];
    if (imageDataUrl) {
      const parsed = parseDataUrl(imageDataUrl);
      if (parsed) {
        parts.push({
          inlineData: {
            mimeType: parsed.mimeType,
            data: parsed.data
          }
        });
      }
    }

    const payload = {
      contents: [
        {
          role: 'user',
          parts
        }
      ]
    };

    const aiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI request failed', aiResponse.status, errorText);
      return res.status(502).json({ error: 'AI service failed to generate content' });
    }

    const responseBody = await aiResponse.json();
    const aiText = extractTextFromResponse(responseBody);

    if (!aiText) {
      console.error('AI response did not include text payload', responseBody);
      return res.status(502).json({ error: 'AI service returned an empty response' });
    }

    let parsed;
    try {
      const cleaned = aiText.replace(/```json/gi, '').replace(/```/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch (error) {
      console.error('Unable to parse AI response', error, aiText);
      return res.status(502).json({ error: 'AI service returned malformed JSON' });
    }

    const captions = normalizeCaptions(parsed.captions, brand);
    const hashtags = normalizeHashtags(parsed.hashtags, brand, brandData);

    const metadata = {
      model: responseBody.model,
      usage: responseBody.usageMetadata || null,
      notes: typeof parsed.notes === 'string' ? parsed.notes.trim() : null
    };

    res.json({ captions, hashtags, metadata });
  } catch (error) {
    console.error('Unexpected error while generating content', error);
    res.status(500).json({ error: 'Unexpected server error during generation' });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Caption generator server running on http://localhost:${PORT}`);
  });
}

function parseDataUrl(dataUrl) {
  if (typeof dataUrl !== 'string') return null;
  const matches = dataUrl.match(/^data:(.*?);base64,(.*)$/);
  if (!matches || matches.length < 3) return null;
  return {
    mimeType: matches[1],
    data: matches[2]
  };
}

function buildPrompt({ brand, context, brandData, hasImage }) {
  const industryKey = getIndustryKey(brand.id);
  const locationKey = getLocationKey(brand.id);

  const industryHashtags = industryKey ? (brandData.industryHashtags[industryKey] || []) : [];
  const locationHashtags = locationKey ? (brandData.locationHashtags[locationKey] || []) : [];
  const trending = brandData.trendingHashtags2025 || [];

  const contextSection = context && context.trim().length > 0
    ? `The marketer provided the following context to inspire the copy:\n"""${context.trim()}"""`
    : 'No additional context was provided. Create an evergreen yet timely update that still feels specific and engaging.';

  const imageSection = hasImage
    ? 'An image asset is attached to this request. Reference likely visual storytelling cues in the captions without inventing unrealistic details.'
    : 'No image asset was provided. Focus on copy that stands on its own.';

  return `You are an expert social media copywriter helping a marketing team create Instagram-ready captions and hashtag sets. Use the brand information and supporting hashtag libraries below to produce polished results. Always reply with valid JSON that matches the requested schema and do not wrap the JSON in Markdown fences. Avoid angle brackets, trailing comments, or any additional prose outside of the JSON.\n\nBrand Information:\n- Name: ${brand.name}\n- Description: ${brand.description}\n- Industry: ${brand.industry}\n- Tone: ${brand.tone}\n- Target audience: ${brand.target}\n- Key messages: ${brand.keywords.join(', ')}\n- Website: ${brand.website || 'N/A'}\n- Signature hashtags: ${brand.hashtags.join(' ')}\n- Sample captions: ${brand.sampleCaptions.join(' | ')}\n\n${contextSection}\n${imageSection}\n\nReference Hashtag Libraries:\n- Industry pool (${industryKey || 'general'}): ${industryHashtags.join(' ')}\n- Location pool (${locationKey || 'general'}): ${locationHashtags.join(' ')}\n- 2025 trending inspiration: ${trending.join(' ')}\n\nReturn JSON in the following structure:\n{\n  "captions": [\n    { "type": "Short", "text": "25-60 character hook caption" },\n    { "type": "Medium", "text": "1-2 sentence caption with strong CTA" },\n    { "type": "Long", "text": "Multi-sentence storytelling caption" },\n    { "type": "Brand Style", "text": "Caption that mirrors the brand voice" }\n  ],\n  "hashtags": [\n    { "category": "Brand Specific", "hashtags": ["#tag", "#tag"] },\n    { "category": "Industry Relevant", "hashtags": ["#tag", "#tag"] },\n    { "category": "Location Based", "hashtags": ["#tag", "#tag"] },\n    { "category": "Trending", "hashtags": ["#tag", "#tag"] }\n  ],\n  "notes": "One sentence with optional strategic guidance."\n}\n\nRules:\n1. Populate every caption slot. Types must match exactly (Short, Medium, Long, Brand Style).\n2. Captions should follow the brand tone and include emojis where they feel natural.\n3. Each hashtag list must contain 8-12 unique entries that begin with '#'. Use brand, industry, location, and trending pools as inspiration while avoiding duplicates across sets.\n4. The response must be valid JSON with double quotes around every string.`;
}

function getIndustryKey(brandId) {
  const map = {
    furniturehub12: 'furniture',
    asian_bazaar: 'furniture',
    exportofindia: 'furniture',
    blissofwellness: 'wellness',
    hotel_kspalace: 'tourism',
    houseboat_holidays_kashmir: 'tourism',
    valleyweddingcars: 'automotive'
  };
  return map[brandId] || null;
}

function getLocationKey(brandId) {
  const map = {
    hotel_kspalace: 'kashmir',
    houseboat_holidays_kashmir: 'kashmir',
    valleyweddingcars: 'kashmir',
    asian_bazaar: 'sydney'
  };
  return map[brandId] || 'india';
}

function normalizeCaptions(captions, brand) {
  if (!Array.isArray(captions)) {
    return buildCaptionFallback(brand);
  }

  const cleaned = captions
    .map((entry) => ({
      type: typeof entry.type === 'string' ? entry.type.trim() : 'Caption',
      text: typeof entry.text === 'string' ? entry.text.trim() : ''
    }))
    .filter((entry) => entry.text.length > 0);

  if (cleaned.length === 0) {
    return buildCaptionFallback(brand);
  }

  const expectedTypes = ['Short', 'Medium', 'Long', 'Brand Style'];
  const prioritized = [];

  expectedTypes.forEach((type) => {
    const matchIndex = cleaned.findIndex((entry) => entry.type.toLowerCase() === type.toLowerCase());
    if (matchIndex >= 0) {
      prioritized.push({ type, text: cleaned[matchIndex].text });
    }
  });

  cleaned.forEach((entry) => {
    const exists = prioritized.some((item) => item.text === entry.text);
    if (!exists) {
      prioritized.push(entry);
    }
  });

  return prioritized;
}

function normalizeHashtags(hashtags, brand, brandData) {
  if (!Array.isArray(hashtags)) {
    return buildHashtagFallback(brand, brandData);
  }

  const cleaned = hashtags
    .map((entry) => ({
      category: typeof entry.category === 'string' ? entry.category.trim() : 'General',
      hashtags: Array.isArray(entry.hashtags)
        ? entry.hashtags.map((tag) => sanitizeHashtag(tag)).filter(Boolean)
        : []
    }))
    .filter((entry) => entry.hashtags.length > 0);

  if (cleaned.length === 0) {
    return buildHashtagFallback(brand, brandData);
  }

  return cleaned;
}

function sanitizeHashtag(tag) {
  if (typeof tag !== 'string') return null;
  const cleaned = tag.trim();
  if (!cleaned) return null;
  return cleaned.startsWith('#') ? cleaned : `#${cleaned.replace(/^#+/, '')}`;
}

function buildCaptionFallback(brand) {
  const sample = brand.sampleCaptions && brand.sampleCaptions.length > 0
    ? brand.sampleCaptions[0]
    : `Discover ${brand.name}`;
  return [
    { type: 'Brand Style', text: sample }
  ];
}

function buildHashtagFallback(brand, brandData) {
  const industryKey = getIndustryKey(brand.id);
  const locationKey = getLocationKey(brand.id);
  const fallbackSets = [
    {
      category: 'Brand Specific',
      hashtags: brand.hashtags.slice(0, 10)
    },
    {
      category: 'Industry Relevant',
      hashtags: (industryKey ? brandData.industryHashtags[industryKey] : []).slice(0, 10)
    },
    {
      category: 'Location Based',
      hashtags: (locationKey ? brandData.locationHashtags[locationKey] : []).slice(0, 10)
    }
  ];

  const trending = (brandData.trendingHashtags2025 || []).slice(0, 10);
  if (trending.length) {
    fallbackSets.push({
      category: 'Trending',
      hashtags: trending
    });
  }

  return fallbackSets;
}

function extractTextFromResponse(responseBody) {
  const candidate = responseBody?.candidates?.[0];
  if (!candidate || !candidate.content || !Array.isArray(candidate.content.parts)) {
    return null;
  }

  return candidate.content.parts
    .map((part) => part.text || '')
    .join('')
    .trim();
}

module.exports = app;
