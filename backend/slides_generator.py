import json
import os

from openai import AsyncAzureOpenAI

client = AsyncAzureOpenAI(
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT", ""),
    api_key=os.getenv("AZURE_OPENAI_API_KEY", ""),
    api_version=os.getenv("AZURE_OPENAI_API_VERSION", "2024-10-21"),
)
DEPLOYMENT = os.getenv("AZURE_OPENAI_DEPLOYMENT", "gpt-4o-mini")

SLIDE_GENERATION_PROMPT = """Generate a 6-slide presentation on the topic: "{topic}"

Return ONLY valid JSON matching this exact schema:
{{
  "topic": "<topic title>",
  "total_slides": 6,
  "slides": [
    {{
      "id": 1,
      "title": "<slide title, 5-8 words>",
      "bullets": ["<3-4 concise bullet points>"],
      "speaker_notes": "<2-3 natural sentences a presenter would say, 50-80 words>",
      "keywords": ["<3-5 key terms>"],
      "visual_hint": "<brief description of an image or diagram that would complement this slide>"
    }}
  ]
}}

Make slides build progressively on each other. Speaker notes must flow naturally when read aloud."""


async def generate_slides_from_topic(topic: str) -> dict:
    response = await client.chat.completions.create(
        model=DEPLOYMENT,
        messages=[{"role": "user", "content": SLIDE_GENERATION_PROMPT.format(topic=topic)}],
        response_format={"type": "json_object"},
        max_completion_tokens=2000,
    )
    raw = response.choices[0].message.content
    return json.loads(raw)

