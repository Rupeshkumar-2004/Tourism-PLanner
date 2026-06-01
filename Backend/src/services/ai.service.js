/**
 * Service to interact with the Gemini API to generate content.
 */

export const generatePlaceDescriptions = async (cityName, placeNames) => {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
        console.warn("GEMINI_API_KEY is not set. Falling back to default descriptions.");
        return {};
    }

    try {
        const prompt = `I have a list of tourist attractions in ${cityName}. 
Write a 2-sentence engaging travel description for each place. 
Return a strict JSON object where the key is the exact place name provided, and the value is the description.
Do not wrap the JSON in Markdown code blocks like \`\`\`json. Return only the raw JSON string.
Places: ${JSON.stringify(placeNames)}`;

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    response_mime_type: "application/json",
                }
            })
        });

        if (!response.ok) {
            console.error("Gemini API Error:", await response.text());
            return {};
        }

        const data = await response.json();
        
        // Extract the text response from Gemini
        if (data.candidates && data.candidates.length > 0) {
            const rawText = data.candidates[0].content.parts[0].text;
            try {
                // Parse the JSON string returned by Gemini
                return JSON.parse(rawText);
            } catch (parseError) {
                console.error("Failed to parse Gemini response as JSON:", rawText);
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
        const prompt = `Write a beautiful, engaging 2-paragraph travel guide overview for ${cityName}, ${stateName || ""}, ${countryName || ""}. 
Highlight its most famous cultural aspects, history, or natural beauty. 
Return only the raw text, no markdown formatting.`;

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        if (!response.ok) {
            console.error("Gemini API Error for Destination Description:", await response.text());
            return `A beautiful travel destination located in ${stateName || ""}, ${countryName || ""}. Explore local attractions, culture, and nature.`;
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates.length > 0) {
            return data.candidates[0].content.parts[0].text.trim();
        }
        
        return `A beautiful travel destination located in ${stateName || ""}, ${countryName || ""}. Explore local attractions, culture, and nature.`;
    } catch (error) {
        console.error("Error generating destination description:", error);
        return `A beautiful travel destination located in ${stateName || ""}, ${countryName || ""}. Explore local attractions, culture, and nature.`;
    }
};
