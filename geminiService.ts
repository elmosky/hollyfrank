import { GoogleGenAI, Type } from "@google/genai";
import { BlogPost } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate 4 short, futuristic, thought-provoking blog posts about the intersection of technology, philosophy, and human evolution. Make them sound like they are written by a visionary engineer.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              date: { type: Type.STRING },
              summary: { type: Type.STRING },
              content: { type: Type.STRING },
              tags: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["id", "title", "date", "summary", "content", "tags"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as BlogPost[];
    }
    return [];
  } catch (error) {
    console.error("Failed to generate blog posts:", error);
    // Fallback data in case of API failure or missing key
    return [
      {
        id: "1",
        title: "The Silent Interface",
        date: "2024-10-15",
        summary: "Why the best UI is no UI at all.",
        content: "As we move towards neural interfaces, the screen becomes obsolete...",
        tags: ["Design", "Future"]
      },
      {
        id: "2",
        title: "Digital Botany",
        date: "2024-11-02",
        summary: "Growing algorithms like plants in a digital garden.",
        content: "Genetic algorithms are not just code; they are life...",
        tags: ["AI", "Code"]
      }
    ];
  }
};
