import { ApiError } from "../utils/ApiError.js";

/**
 * Helper to fetch a high-quality cover image for a destination from Unsplash.
 */
export const getUnsplashImageForPlace = async (searchQuery) => {
    const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
    if (!UNSPLASH_ACCESS_KEY) {
        console.warn("UNSPLASH_ACCESS_KEY is not set. Falling back to empty images.");
        return [];
    }

    try {
        const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&orientation=landscape&per_page=3&client_id=${UNSPLASH_ACCESS_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
            console.error("Unsplash API Error:", await response.text());
            return [];
        }

        const data = await response.json();
        // Return an array of regular-sized image URLs
        return data.results.map(photo => photo.urls.regular);
    } catch (error) {
        console.error("Failed to fetch image from Unsplash:", error);
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
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Geoapify Geocoding API failed: ${response.statusText}`);
        }

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
            throw new Error(`Geoapify Places API failed: ${response.statusText}`);
        }

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

    // 2. Fetch beautiful cover images for the city
    const imageQuery = `${locationData.city}, ${locationData.state}, ${locationData.country}`;
    const images = await getUnsplashImageForPlace(imageQuery);

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

    const formattedPlaces = [];

    for (const feature of validPlaces) {
        const props = feature.properties;

        const rawCategories = props.categories || [];
        const tags = rawCategories
            .map(c => c.split('.').pop())
            .filter(tag => tag !== "tourism");

        const mainCategory = tags.length > 0 ? tags[0] : "attraction";

        // Get AI description or fallback
        const description = descriptionsMap[props.name] || `A notable ${mainCategory.replace(/_/g, ' ')} located in ${destinationDoc.city}. ${props.address_line2 || ""}`.trim();

        formattedPlaces.push({
            destination: destinationDoc._id,
            name: props.name,
            description: description,
            category: mainCategory,
            tags: tags.slice(0, 5),
            images: [], // We skip Unsplash for places to avoid rate limits and irrelevant photos
            lat: props.lat,
            lon: props.lon,
            address: props.formatted || ""
        });
    }

    return formattedPlaces;
};
