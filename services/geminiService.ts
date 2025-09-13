
import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY is configured in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY not found. Gemini features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateShareablePost = async (userName: string): Promise<string> => {
  if (!API_KEY) {
    return `Kudos to ${userName} for being a Street Hero and feeding a dog in need! #StreetPawsAlliance #NoDogHungry`;
  }

  try {
    const prompt = `Create a short, heartwarming, and inspiring social media post (under 280 characters) celebrating a volunteer named ${userName} who just fed a stray dog. Use hashtags like #StreetPawsAlliance, #CommunityHero, #AnimalWelfare, #NoDogHungry. The tone should be positive and encourage others to join the cause. Do not use emojis.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 100,
        thinkingConfig: { thinkingBudget: 50 },
      },
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating shareable post:", error);
    // Fallback message
    return `Kudos to ${userName} for being a Street Hero and feeding a dog in need! #StreetPawsAlliance #NoDogHungry`;
  }
};
