import React from 'react';
import WeatherDetails from './WeatherDetails';
import { getWeatherIcon } from '../utils/weatherIcons';

const WeatherCard = ({ data, fullHeight }) => {
  if (!data) return null;
  const { weather, main, wind, name, locationName } = data;
  const icon = weather?.[0]?.icon;
  const description = weather?.[0]?.main;

  return (
    <div className={`bg-white bg-opacity-90 rounded-2xl shadow-xl p-10 flex flex-col items-center w-full max-w-sm min-w-[320px] min-h-[500px] ${fullHeight ? 'h-full' : ''}`}>
      <img
        src={getWeatherIcon(icon)}
        alt={description}
        className="w-32 h-32 mb-0"
      />
      <div className="text-5xl font-bold mb-2">{Math.round(main.temp)}°C</div>
      <div className="text-xl text-gray-600 mb-2">{description}</div>
      <div className="flex items-center gap-1 text-blue-600 underline mb-6">
        <span className="text-lg">📍</span>
        <a href="#" className="hover:text-blue-800">{locationName || name}</a>
      </div>
      <WeatherDetails
        humidity={main.humidity}
        wind={wind.speed}
        pressure={main.pressure}
        feelsLike={main.feels_like}
      />
      <button className="mt-0 px-5 py-2 border border-blue-300 rounded-lg text-blue-500 bg-blue-50 hover:bg-blue-100 transition text-base font-semibold flex items-center gap-2 shadow-sm">
        <span role="img" aria-label="star">⭐</span> Add to Favorites
      </button>
    </div>
  );
};

export default WeatherCard; 