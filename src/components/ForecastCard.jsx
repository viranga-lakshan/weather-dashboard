import React from 'react';
import { getWeatherIcon } from '../utils/weatherIcons';
import { formatDate } from '../utils/formatDate';

const ForecastCard = ({ day, onClick, selected }) => {
  const { dt_txt, main, weather } = day;
  const icon = weather?.[0]?.icon;
  const description = weather?.[0]?.main;

  return (
    <button
      className={`flex flex-col items-center bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition border-2 min-w-[150px] max-w-[120px] min-h-[170px] ${selected ? 'border-blue-500' : 'border-transparent'}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      <div className="text-sm text-gray-500 mb-1 font-semibold">{formatDate(dt_txt)}</div>
      <img src={getWeatherIcon(icon)} alt={description} className="w-14 h-14 mb-1" />
      <div className="font-bold text-lg mt-1">{Math.round(main.temp_max)}° <span className="text-gray-400">/</span> {Math.round(main.temp_min)}°</div>
      <div className="text-xs text-gray-600 mt-1">{description}</div>
    </button>
  );
};

export default ForecastCard; 