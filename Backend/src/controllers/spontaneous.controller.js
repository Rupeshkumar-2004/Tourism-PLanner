import { spontaneousQuerySchema } from "../schemas/spontaneous.schema.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { getCityFromCoordinates, getTouristPlacesByCoords, getWeatherForCoordinates, getStaticMapUrl, getPexelsImageForPlace } from "../services/externalApi.service.js";
import { generateSpontaneousItineraries } from "../services/ai.service.js";



export const getSpontaneousAdventures = asyncHandler(async (req, res) => {
    const parsed = spontaneousQuerySchema.safeParse(req.query);
    if (!parsed.success) {
        throw new ApiError(400, parsed.error.errors.map(err => err.message).join(', '));
    }

    const { lat, lon } = parsed.data;

    // 1. Get Location Name from Coordinates
    const locationData = await getCityFromCoordinates(lat, lon);

    // Fallback if not found, though unlikely for valid coords
    const city = locationData?.city || "Unknown Location";
    const state = locationData?.state || "";

    // 2. Fetch Weather for Coordinates
    let weather = null;
    try {
        const weatherData = await getWeatherForCoordinates(lat, lon);
        if (weatherData && weatherData.current_weather) {
            weather = {
                temperature: weatherData.current_weather.temperature,
                weathercode: weatherData.current_weather.weathercode,
                // Simple weather code mapping for UI display
                condition: weatherData.current_weather.weathercode <= 3 ? "Clear/Cloudy" : "Rain/Overcast",
                icon: weatherData.current_weather.weathercode <= 3 ? "wb_sunny" : "cloudy"
            };
        }
    } catch (e) {
        console.error("Failed to fetch weather:", e);
    }

    // 3. Get Tourist Places nearby (20km radius)
    const places = await getTouristPlacesByCoords(lat, lon, 20);

    // 4. Generate AI Suggestions based on places
    let itineraries = { suggestions: [], paths: [] };
    if (places && places.length > 0) {
        itineraries = await generateSpontaneousItineraries(places, city);
    }

    // 5. Fetch Pexels images for the suggestions and paths
    // To speed this up, we fetch them concurrently
    const fetchImage = async (item, fallbackQuery) => {
        const query = item.imageQuery || fallbackQuery;
        const images = await getPexelsImageForPlace(query, 1);
        return images.length > 0 ? images[0] : "https://images.pexels.com/photos/3476860/pexels-photo-3476860.jpeg"; // Fallback image
    };

    const suggestionsPromises = (itineraries.suggestions || []).map(async (sug) => {
        sug.image = await fetchImage(sug, `${sug.title} ${city} tourism`);
        return sug;
    });

    const pathsPromises = (itineraries.paths || []).map(async (path) => {
        path.image = await fetchImage(path, `${path.title} ${city} landscape`);
        return path;
    });

    const [suggestions, paths] = await Promise.all([
        Promise.all(suggestionsPromises),
        Promise.all(pathsPromises)
    ]);

    // 6. Generate Static Map URL with markers for the suggestions
    const mapMarkers = suggestions.map(s => ({ lat: s.lat, lon: s.lon }));
    const mapUrl = getStaticMapUrl(lat, lon, 12, mapMarkers);

    // 7. Return aggregated response
    return res.status(200).json(
        new ApiResponse(200, {
            location: {
                city,
                state,
                lat,
                lon,
                formatted: locationData?.formatted || city
            },
            weather,
            mapUrl,
            suggestions,
            paths
        }, "Spontaneous adventures generated successfully")
    );
});
