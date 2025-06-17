import React from 'react';
import WeatherDetails from './WeatherDetails';
import { getWeatherIcon } from '../utils/weatherIcons';

const WeatherCard = ({ data }) => {
  if (!data) return null;
  const { weather, main, wind, name, locationName } = data;
  const icon = weather?.[0]?.icon;
  const description = weather?.[0]?.main;

  return (
    <div className="bg-white bg-opacity-80 rounded-xl shadow-md p-6 flex flex-col items-center w-full max-w-xs mx-auto">
      <img
        src={getWeatherIcon(icon)}
        alt={description}
        className="w-24 h-24 mb-2"
      />
      <div className="text-4xl font-bold">{Math.round(main.temp)}°C</div>
      <div className="text-lg text-gray-600 mb-2">{description}</div>
      <div className="text-blue-600 underline mb-4">{locationName || name}</div>
      <WeatherDetails
        humidity={main.humidity}
        wind={wind.speed}
        pressure={main.pressure}
        feelsLike={main.feels_like}
      />
      <button className="mt-4 px-4 py-2 border border-blue-400 rounded text-blue-500 bg-blue-50 hover:bg-blue-100 transition text-sm" disabled>
        + Add to Favorites
      </button>
    </div>
  );
};

export default WeatherCard; 