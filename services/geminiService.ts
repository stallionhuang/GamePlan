import { GoogleGenAI, Type } from '@google/genai';
import { Game } from '../types';

// Fix: Removed 'as string' to align with @google/genai coding guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      sport: { type: Type.STRING },
      league: { type: Type.STRING },
      startTime: { 
        type: Type.STRING,
        description: "Game start time in ISO 8601 format (UTC)."
      },
      status: {
        type: Type.STRING,
        enum: ['UPCOMING', 'LIVE', 'FINAL']
      },
      homeTeam: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          abbreviation: { type: Type.STRING }
        },
        required: ['name', 'abbreviation']
      },
      awayTeam: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          abbreviation: { type: Type.STRING }
        },
        required: ['name', 'abbreviation']
      },
      homeScore: { 
        // Fix: Removed type constraint to allow for `null` values as described,
        // which is expected for upcoming games. The model will infer the type
        // from the prompt and description.
        description: "Home team's score. Should be null if game is not final or live."
      },
      awayScore: {
        // Fix: Removed type constraint to allow for `null` values as described,
        // which is expected for upcoming games. The model will infer the type
        // from the prompt and description.
        description: "Away team's score. Should be null if game is not final or live."
      },
      broadcast: {
        type: Type.STRING,
        description: "The TV channel or streaming service broadcasting the game, e.g., 'ESPN', 'TNT', 'FOX'."
      }
    },
    required: ['sport', 'league', 'startTime', 'status', 'homeTeam', 'awayTeam', 'broadcast']
  }
};


export async function fetchSportsData(sports: string[]): Promise<Game[]> {
  const today = new Date().toISOString();
  const prompt = `
    You are a sports data provider. Your task is to return a JSON array of sporting events based on the sports I provide.
    Today's date is ${today}.
    Please provide game information for the following sports leagues: ${sports.join(', ')}.
    The response must include:
    1. All games happening today.
    2. If no games are happening today for a given sport, provide the most recent past games' scores from yesterday.
    3. Also include any upcoming games in the next 2 days.

    Return the data as a JSON array adhering to the provided schema.
    - startTime must be in ISO 8601 format.
    - status must be one of 'UPCOMING', 'LIVE', or 'FINAL'.
    - homeScore and awayScore should be a number for LIVE or FINAL games, and null for UPCOMING games.
    - If a game is live, provide the current score.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
      console.warn("Gemini API returned an empty response.");
      return [];
    }
    
    const data = JSON.parse(jsonText);
    return data as Game[];
  } catch (error) {
    console.error("Error fetching sports data from Gemini API:", error);
    throw new Error("Failed to fetch sports data. The model may be unavailable or the request failed.");
  }
}
