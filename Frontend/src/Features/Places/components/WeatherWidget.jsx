
import useWeather from '../hooks/useWeather';
import { 
    Sun, Cloud, CloudSun, CloudRain, CloudSnow, CloudLightning, 
    CloudFog, Loader2, CloudDrizzle, ThermometerSun 
} from 'lucide-react';

// Open-Meteo WMO Weather interpretation codes
const getWeatherDetails = (code, isDay = 1) => {
    switch (true) {
        case (code === 0):
            return { label: 'Clear sky', icon: isDay ? Sun : Sun, color: 'text-amber-500' };
        case (code === 1 || code === 2 || code === 3):
            return { label: 'Partly cloudy', icon: CloudSun, color: 'text-blue-400' };
        case (code === 45 || code === 48):
            return { label: 'Fog', icon: CloudFog, color: 'text-gray-400' };
        case (code >= 51 && code <= 57):
            return { label: 'Drizzle', icon: CloudDrizzle, color: 'text-blue-300' };
        case (code >= 61 && code <= 67):
            return { label: 'Rain', icon: CloudRain, color: 'text-blue-500' };
        case (code >= 71 && code <= 77):
            return { label: 'Snow', icon: CloudSnow, color: 'text-sky-200' };
        case (code >= 80 && code <= 82):
            return { label: 'Rain showers', icon: CloudRain, color: 'text-blue-600' };
        case (code === 85 || code === 86):
            return { label: 'Snow showers', icon: CloudSnow, color: 'text-sky-300' };
        case (code >= 95 && code <= 99):
            return { label: 'Thunderstorm', icon: CloudLightning, color: 'text-indigo-500' };
        default:
            return { label: 'Unknown', icon: Cloud, color: 'text-gray-400' };
    }
};

const WeatherWidget = ({ destinationId }) => {
    const { weatherData, isLoading, error } = useWeather(destinationId);

    if (isLoading) {
        return (
            <div className="bg-surface-container-lowest border border-surface-variant rounded-2xl p-8 flex flex-col items-center justify-center min-h-[200px] shadow-sm text-center">
                <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                <p className="text-label-md text-outline">Loading weather data...</p>
            </div>
        );
    }

    if (error || !weatherData || !weatherData.current_weather) {
        return (
            <div className="bg-surface-container-lowest border border-surface-variant rounded-2xl p-8 flex flex-col items-center justify-center min-h-[200px] shadow-sm text-center">
                <CloudSun className="w-12 h-12 text-outline mb-4 opacity-50" />
                <h3 className="font-headline-md text-headline-md text-on-surface-variant opacity-70 mb-2">Weather Unavailable</h3>
                <p className="text-label-md text-error">{error || "Could not fetch weather data."}</p>
            </div>
        );
    }

    const { current_weather, daily } = weatherData;
    const currentDetails = getWeatherDetails(current_weather.weathercode, current_weather.is_day);
    const CurrentIcon = currentDetails.icon;

    return (
        <div className="bg-gradient-to-br from-surface-container-lowest to-surface-container border border-surface-variant rounded-2xl p-6 shadow-sm flex flex-col relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
            {/* Header / Current Weather */}
            <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                    <h3 className="font-label-lg text-on-surface-variant mb-1 uppercase tracking-wider">Current Weather</h3>
                    <div className="flex items-end gap-3">
                        <span className="font-display text-5xl font-bold text-on-surface">
                            {Math.round(current_weather.temperature)}°C
                        </span>
                        <span className="font-label-lg text-on-surface-variant mb-1">
                            {currentDetails.label}
                        </span>
                    </div>
                </div>
                <div className={`p-4 rounded-full bg-surface-container-highest ${currentDetails.color} bg-opacity-20`}>
                    <CurrentIcon className={`w-10 h-10 ${currentDetails.color}`} />
                </div>
            </div>

            <div className="h-px w-full bg-surface-variant mb-4"></div>

            {/* 3-Day Forecast */}
            <div className="flex justify-between items-center relative z-10 gap-2">
                {daily.time.slice(0, 3).map((time, index) => {
                    const date = new Date(time);
                    const dayName = index === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });
                    const details = getWeatherDetails(daily.weathercode[index]);
                    const Icon = details.icon;
                    const maxTemp = Math.round(daily.temperature_2m_max[index]);
                    const minTemp = Math.round(daily.temperature_2m_min[index]);

                    return (
                        <div key={time} className="flex flex-col items-center flex-1 bg-surface-container-lowest py-3 rounded-xl border border-surface-variant/50">
                            <span className="font-label-sm text-on-surface-variant mb-2">{dayName}</span>
                            <Icon className={`w-6 h-6 mb-2 ${details.color}`} />
                            <div className="flex gap-2 font-label-md">
                                <span className="text-on-surface">{maxTemp}°</span>
                                <span className="text-outline">{minTemp}°</span>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {/* Background decoration */}
            <CurrentIcon className={`absolute -right-10 -bottom-10 w-48 h-48 opacity-[0.03] ${currentDetails.color} group-hover:scale-110 transition-transform duration-700 pointer-events-none`} />
        </div>
    );
};

export default WeatherWidget;
