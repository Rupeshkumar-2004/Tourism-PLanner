/**
 * Service to interact with the Gemini API to generate content.
 */
import { GoogleGenAI } from '@google/genai';

export const generatePlaceDescriptions = async (cityName, placeNames) => {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
        console.warn("GEMINI_API_KEY is not set. Falling back to default descriptions.");
        return {};
    }

    try {
        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

        const prompt = `I have a list of tourist attractions in ${cityName}. 
                        Write a 2-sentence engaging travel description for each place. 
                        Return a strict JSON object where the key is the exact place name provided, and the value is the description.
                        Do not wrap the JSON in Markdown code blocks like \`\`\`json. Return only the raw JSON string.
                        Places: ${JSON.stringify(placeNames)}`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        });

        if (response.text) {
            try {
                // Parse the JSON string returned by Gemini
                return JSON.parse(response.text);
            } catch (parseError) {
                console.error("Failed to parse Gemini response as JSON:", response.text);
                return {};
            }
        }

        return {};
    } catch (error) {
        console.error("Error communicating with Gemini API:", error);
        return {};
    }
};

export const generateDestinationDescription = async (cityName, stateName, countryName) => {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
        return `A beautiful travel destination located in ${stateName || ""}, ${countryName || ""}. Explore local attractions, culture, and nature.`;
    }

    try {
        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

        const prompt = `Write a beautiful, engaging 2-paragraph travel guide overview for ${cityName}, ${stateName || ""}, ${countryName || ""}. 
                        Highlight its most famous cultural aspects, history, or natural beauty. 
                        Return only the raw text, no markdown formatting.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });

        if (response.text) {
            return response.text.trim();
        }

        return `A beautiful travel destination located in ${stateName || ""}, ${countryName || ""}. Explore local attractions, culture, and nature.`;
    } catch (error) {
        console.error("Error generating destination description:", error);
        return `A beautiful travel destination located in ${stateName || ""}, ${countryName || ""}. Explore local attractions, culture, and nature.`;
    }
};

/**
 * Curates a list of Geoapify places into structured spontaneous itineraries.
 */
export const generateSpontaneousItineraries = async (places, city) => {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
        return { suggestions: [], paths: [] };
    }

    try {
        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

        // Pick top 15 places to avoid context overload
        const simplifiedPlaces = places.slice(0, 15).map(p => ({
            name: p.properties.name,
            categories: p.properties.categories,
            distance: p.properties.distance, // distance in meters from the user's location
            lat: p.properties.lat,
            lon: p.properties.lon
        }));

        const prompt = `I am building a "Spontaneous Adventures" page for a travel app.
        The user is currently in ${city}.
        Here is a list of nearby places/attractions (with distance in meters):
        ${JSON.stringify(simplifiedPlaces)}

        Please curate these into two categories, matching this exact JSON structure:
        {
            "suggestions": [
                {
                    "title": "Short creative title (e.g. Riverside Coracle & Sundowners)",
                    "description": "2-sentence engaging description",
                    "tag": "e.g. 3h Adventure or Half-Day or Immediate",
                    "distance": "e.g. 1.2km",
                    "cost": "e.g. $15 est. or No Booking",
                    "imageQuery": "A search query to find an image for this (e.g. 'Hampi Riverside Sunset')",
                    "lat": "exact latitude from the provided list",
                    "lon": "exact longitude from the provided list"
                },
                // exactly 3 suggestions
            ],
            "paths": [
                {
                    "title": "Creative title for a full-day or half-day itinerary (e.g. The Hidden Valley Trail)",
                    "description": "2-sentence engaging description combining multiple places.",
                    "tag": "e.g. Full Day Loop",
                    "imageQuery": "A search query to find an image for this"
                },
                // exactly 2 paths
            ]
        }
        
        Make the descriptions sound luxurious, adventurous, and authentic.
        Return ONLY the raw JSON string. Do not wrap in markdown \`\`\`json blocks.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        });

        if (response.text) {
            try {
                return JSON.parse(response.text.trim());
            } catch (e) {
                console.error("Failed to parse Gemini response:", response.text);
            }
        }
        return { suggestions: [], paths: [] };
    } catch (error) {
        console.error("Error generating spontaneous itineraries:", error);
        return { suggestions: [], paths: [] };
    }
};
