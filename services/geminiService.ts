
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateVideoDescription = async (title: string): Promise<string> => {
  if (!API_KEY) {
    return "This is a sample description. Set up your Gemini API key to generate dynamic descriptions.";
  }

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Generate a compelling and brief video description (around 2-3 sentences) for a video titled "${title}". Focus on themes relevant to African culture, lifestyle, or entertainment.`,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating description with Gemini:", error);
    return "Failed to generate a description. Please try again.";
  }
};
