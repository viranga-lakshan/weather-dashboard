import React from 'react';
import { getWeatherIcon } from '../utils/weatherIcons';
import { formatDate } from '../utils/formatDate';

const ForecastCard = ({ day, onClick, selected }) => {
  const { dt_txt, main, weather } = day;
  const icon = weather?.[0]?.icon;
  const description = weather?.[0]?.main;

  return (
    <button
      className={`flex flex-col items-center bg-white bg-opacity-80 rounded-lg p-3 shadow hover:shadow-lg transition border-2 ${selected ? 'border-blue-500' : 'border-transparent'}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      <div className="text-xs text-gray-500 mb-1">{formatDate(dt_txt)}</div>
      <img src={getWeatherIcon(icon)} alt={description} className="w-12 h-12" />
      <div className="font-bold mt-1">{Math.round(main.temp_max)}° / {Math.round(main.temp_min)}°</div>
      <div className="text-xs text-gray-600">{description}</div>
    </button>
  );
};

export default ForecastCard; 