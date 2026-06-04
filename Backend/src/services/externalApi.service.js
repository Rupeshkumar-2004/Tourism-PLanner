import { ApiError } from "../utils/ApiError.js";

/**
 * Helper to fetch high-quality cover images for a destination from Pexels.
 */
export const getPexelsImageForPlace = async (searchQuery, limit = 5) => {
    const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
    if (!PEXELS_API_KEY) {
        console.warn("PEXELS_API_KEY is not set. Falling back to empty images.");
        return [];
    }

    try {
        const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchQuery)}&per_page=${limit}`;
        const response = await fetch(url, {
            headers: {
                Authorization: PEXELS_API_KEY
            },
            signal: AbortSignal.timeout(8000)
        });

        if (!response.ok) {
            console.error(`[Pexels API] Error ${response.status} ${response.statusText} for query "${searchQuery}"`);
            if (response.status === 429) console.error("[Pexels API] Rate limit exceeded!");
            return [];
        }

        console.log(`[Pexels API] Successfully fetched images for "${searchQuery}"`);

        const data = await response.json();
        // Return an array of landscape image URLs
        return data.photos.map(photo => photo.src.landscape);
    } catch (error) {
        console.error("Failed to fetch image from Pexels:", error);
        return [];
    }
};

/**
 * Gets latitude, longitude, state, and country for a given city name using Geoapify Geocoding API.
 */
export const getCoordinatesForCity = async (cityName) => {
    const GEOAPIFY_API_KEY = process.env.GEOAPIFY_API_KEY;
    if (!GEOAPIFY_API_KEY) {
        throw new ApiError(500, "GEOAPIFY_API_KEY is not configured on the server.");
    }

    try {
        const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(cityName)}&type=city&format=json&apiKey=${GEOAPIFY_API_KEY}`;
        const response = await fetch(url, { signal: AbortSignal.timeout(8000) });

        if (!response.ok) {
            console.error(`[Geoapify Geocoding API] Error ${response.status} ${response.statusText} for city "${cityName}"`);
            if (response.status === 429) console.error("[Geoapify Geocoding API] Rate limit exceeded!");
            throw new Error(`Geoapify Geocoding API failed: ${response.statusText}`);
        }
        
        console.log(`[Geoapify Geocoding API] Successfully fetched coords for "${cityName}"`);

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            return null; // City not found
        }

        // Pick the best match
        const bestMatch = data.results[0];

        return {
            lat: bestMatch.lat,
            lon: bestMatch.lon,
            city: bestMatch.city || cityName, // Fallback to provided name
            state: bestMatch.state || "Unknown State",
            country: bestMatch.country || "Unknown Country"
        };
    } catch (error) {
        console.error("Geocoding Error:", error);
        throw new ApiError(500, "Failed to resolve location coordinates.");
    }
};

/**
 * Gets city, state, and country from latitude and longitude using Geoapify Reverse Geocoding API.
 */
export const getCityFromCoordinates = async (lat, lon) => {
    const GEOAPIFY_API_KEY = process.env.GEOAPIFY_API_KEY;
    if (!GEOAPIFY_API_KEY) {
        throw new ApiError(500, "GEOAPIFY_API_KEY is not configured on the server.");
    }

    try {
        const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${GEOAPIFY_API_KEY}`;
        const response = await fetch(url, { signal: AbortSignal.timeout(8000) });

        if (!response.ok) {
            console.error(`[Geoapify Reverse Geocoding API] Error ${response.status} ${response.statusText} for coords ${lat},${lon}`);
            if (response.status === 429) console.error("[Geoapify Reverse Geocoding API] Rate limit exceeded!");
            throw new Error(`Geoapify Reverse Geocoding API failed: ${response.statusText}`);
        }
        
        console.log(`[Geoapify Reverse Geocoding API] Successfully reversed coords ${lat},${lon}`);

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            return null; // Location not found
        }

        // Pick the best match
        const bestMatch = data.results[0];

        return {
            city: bestMatch.city || bestMatch.county || "Unknown City",
            state: bestMatch.state || "Unknown State",
            country: bestMatch.country || "Unknown Country",
            formatted: bestMatch.formatted
        };
    } catch (error) {
        console.error("Reverse Geocoding Error:", error);
        throw new ApiError(500, "Failed to resolve location name from coordinates.");
    }
};

/**
 * Gets real-time weather and 3-day forecast using Open-Meteo API using coordinates.
 */
export const getWeatherForCoordinates = async (lat, lon) => {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto&forecast_days=3`;

        const response = await fetch(url, { signal: AbortSignal.timeout(8000) });

        if (!response.ok) {
            console.error(`[Open-Meteo API] Error ${response.status} ${response.statusText} for coords ${lat},${lon}`);
            if (response.status === 429) console.error("[Open-Meteo API] Rate limit exceeded!");
            throw new Error(`Open-Meteo API failed: ${response.statusText}`);
        }
        
        console.log(`[Open-Meteo API] Successfully fetched weather for coords ${lat},${lon}`);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Weather Fetch Error:", error);
        throw new ApiError(500, "Failed to fetch weather data.");
    }
};

/**
 * Gets real-time weather and 3-day forecast using Open-Meteo API.
 */
export const getWeatherForCity = async (cityName) => {
    try {
        const coords = await getCoordinatesForCity(cityName);
        if (!coords) {
            throw new Error("City not found");
        }

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto&forecast_days=3`;

        const response = await fetch(url, { signal: AbortSignal.timeout(8000) });

        if (!response.ok) {
            console.error(`[Open-Meteo API] Error ${response.status} ${response.statusText} for city "${cityName}"`);
            if (response.status === 429) console.error("[Open-Meteo API] Rate limit exceeded!");
            throw new Error(`Open-Meteo API failed: ${response.statusText}`);
        }

        console.log(`[Open-Meteo API] Successfully fetched weather for city "${cityName}"`);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Weather Fetch Error:", error);
        throw new ApiError(500, "Failed to fetch weather data.");
    }
};

/**
 * Fetches tourist attractions around a specific latitude and longitude using Geoapify Places API.
 */
export const getTouristPlacesByCoords = async (lat, lon, limit = 10) => {
    const GEOAPIFY_API_KEY = process.env.GEOAPIFY_API_KEY;
    if (!GEOAPIFY_API_KEY) {
        throw new ApiError(500, "GEOAPIFY_API_KEY is not configured on the server.");
    }

    try {
        // Find places in 'tourism' category within a 20km radius (20000 meters)
        const radius = 20000;
        const url = `https://api.geoapify.com/v2/places?categories=tourism&filter=circle:${lon},${lat},${radius}&bias=proximity:${lon},${lat}&limit=${limit}&apiKey=${GEOAPIFY_API_KEY}`;

        const response = await fetch(url);

        if (!response.ok) {
            console.error(`[Geoapify Places API] Error ${response.status} ${response.statusText} for coords ${lat},${lon}`);
            if (response.status === 429) console.error("[Geoapify Places API] Rate limit exceeded!");
            throw new Error(`Geoapify Places API failed: ${response.statusText}`);
        }

        console.log(`[Geoapify Places API] Successfully fetched places for coords ${lat},${lon}`);

        const data = await response.json();

        if (!data.features || data.features.length === 0) {
            return [];
        }

        return data.features;
    } catch (error) {
        console.error("Places API Error:", error);
        throw new ApiError(500, "Failed to fetch tourist places.");
    }
};

/**
 * Fetches data for a single destination (city) and formats it.
 */
export const fetchAndFormatDestination = async (searchQuery) => {
    // 1. Convert search query (city name) to coordinates
    const locationData = await getCoordinatesForCity(searchQuery);

    if (!locationData) {
        return null; // Location could not be resolved
    }

    // 2. Fetch beautiful cover images for the city from Pexels
    const imageQuery = `${locationData.city}, ${locationData.country} tourism`;
    const images = await getPexelsImageForPlace(imageQuery, 5);

    // 3. Generate beautiful AI description for the city
    const { generateDestinationDescription } = await import("./ai.service.js");
    const aiDescription = await generateDestinationDescription(locationData.city, locationData.state, locationData.country);

    // 4. Format as a single Destination
    return {
        name: locationData.city,
        city: locationData.city,
        state: locationData.state,
        country: locationData.country,
        description: aiDescription,
        category: "city",
        tags: ["city", "travel", "explore"],
        images: images,
        estimatedBudget: 0,
        bestTimeToVisit: "Varies by season"
    };
};

/**
 * Fetches tourist places for a given Destination and formats them.
 */
export const fetchAndFormatPlaces = async (destinationDoc) => {
    // We need the city coordinates to find places. We can re-fetch or rely on the fact 
    // that we can get coords for the destination city.
    const locationData = await getCoordinatesForCity(destinationDoc.city);

    if (!locationData) {
        return [];
    }

    const places = await getTouristPlacesByCoords(locationData.lat, locationData.lon, 12);

    if (places.length === 0) {
        return [];
    }

    // 1. Extract valid places and their names
    const validPlaces = places.filter(feature => feature.properties.name);
    const placeNames = validPlaces.map(feature => feature.properties.name);

    // 2. Batch generate descriptions using Gemini
    let descriptionsMap = {};
    if (placeNames.length > 0) {
        const { generatePlaceDescriptions } = await import("./ai.service.js");
        descriptionsMap = await generatePlaceDescriptions(destinationDoc.city, placeNames);
    }

    const formattedPlacesPromises = validPlaces.map(async (feature) => {
        const props = feature.properties;

        const mainCategory = "attraction";

        // Get AI description or fallback
        const description = descriptionsMap[props.name] || `A notable ${mainCategory.replace(/_/g, ' ')} located in ${destinationDoc.city}. ${props.address_line2 || ""}`.trim();

        // Fetch 2 images per place from Pexels
        const imageQuery = `${props.name} ${destinationDoc.city} tourism`;
        const images = await getPexelsImageForPlace(imageQuery, 2);

        return {
            destination: destinationDoc._id,
            name: props.name,
            description: description,
            category: mainCategory,
            tags: [mainCategory],
            images: images,
            lat: props.lat,
            lon: props.lon,
            address: props.formatted || ""
        };
    });
    const formattedPlaces = await Promise.all(formattedPlacesPromises);

    return formattedPlaces;
};

/**
 * Generates a Static Map URL using Geoapify
 */
export const getStaticMapUrl = (lat, lon, zoom = 14, markers = []) => {
    const GEOAPIFY_API_KEY = process.env.GEOAPIFY_API_KEY;
    if (!GEOAPIFY_API_KEY) {
        return "";
    }

    // Default marker for user location
    let markerString = `lonlat:${lon},${lat};type:awesome;color:#c2652a`;

    // Add additional markers if provided
    markers.forEach((m, i) => {
        if (m.lat && m.lon) {
            // Using a different color (teal) for suggestions
            markerString += `|lonlat:${m.lon},${m.lat};type:material;color:#0f766e;text:${i + 1}`;
        }
    });

    return `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=800&height=500&center=lonlat:${lon},${lat}&zoom=${zoom}&marker=${encodeURIComponent(markerString)}&apiKey=${GEOAPIFY_API_KEY}`;
};
