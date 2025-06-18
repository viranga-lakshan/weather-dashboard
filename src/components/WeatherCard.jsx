import React from 'react';
import WeatherDetails from './WeatherDetails';
import { getWeatherIcon } from '../utils/weatherIcons';

/**
 * WeatherCard displays the current weather for a given location.
 * @param {object} props
 * @param {object} props.data - Weather data object from OpenWeatherMap API.
 * @param {boolean} props.fullHeight - If true, stretches card to fill parent height.
 */
const WeatherCard = ({ data, fullHeight }) => {
  if (!data) return null;
  const { weather, main, wind, name, locationName } = data;
  const icon = weather?.[0]?.icon;
  const description = weather?.[0]?.main;

  return (
    <div
      className={`bg-white bg-opacity-90 rounded-2xl shadow-xl p-4 flex flex-col items-center w-full max-w-sm min-w-[320px] min-h-[500px] ${fullHeight ? 'h-full' : ''}`}
    >
      {/* Weather Icon */}
      <img
        src={getWeatherIcon(icon)}
        alt={description}
        className="w-32 h-32 mb-0"
      />
      {/* Temperature */}
      <div className="text-5xl font-bold mb-2">{Math.round(main.temp)}°C</div>
      {/* Weather Description */}
      <div className="text-xl text-gray-600 mb-2">{description}</div>
      {/* Location */}
      <div className="flex items-center gap-1 text-blue-600 underline mb-6">
        <span className="text-lg">📍</span>
        <a href="#" className="hover:text-blue-800">{locationName || name}</a>
      </div>
      {/* Weather Details (humidity, wind, etc.) */}
      <WeatherDetails
        humidity={main.humidity}
        wind={wind.speed}
        pressure={main.pressure}
        feelsLike={main.feels_like}
      />
      {/* Add to Favorites Button */}
      <button className="mt-0 px-5 py-2 border border-blue-300 rounded-lg text-blue-500 bg-blue-50 hover:bg-blue-100 transition text-base font-semibold flex items-center gap-2 shadow-sm">
        <span role="img" aria-label="star">⭐</span> Add to Favorites
      </button>
    </div>
  );
};

export default WeatherCard; 