import React, { useState } from 'react';
import ForecastCard from './ForecastCard';

/**
 * Helper to get one forecast per day (at noon) from 3-hourly data.
 * @param {Array} forecast - Array of forecast objects from API.
 * @returns {Array} - Array of daily forecast objects.
 */
const getDailyForecast = (forecast) => {
  const daily = [];
  const seen = new Set();
  forecast.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!seen.has(date) && item.dt_txt.includes('12:00:00')) {
      daily.push(item);
      seen.add(date);
    }
  });
  return daily.slice(0, 5);
};

/**
 * ForecastList displays a row of 5-day forecast cards.
 * @param {object} props
 * @param {Array} props.forecast - Array of forecast data.
 * @param {boolean} props.fullHeight - If true, stretches to fill parent height.
 */
const ForecastList = ({ forecast, fullHeight }) => {
  const daily = getDailyForecast(forecast);
  const [selected, setSelected] = useState(0);

  return (
    <div className={`bg-white bg-opacity-90 rounded-2xl shadow-xl p-4 md:p-10 min-h-[300px] md:min-h-[350px] w-full flex flex-col ${fullHeight ? 'h-full' : ''}`}>
      <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">5-Day Forecast</h2>
      <div className="flex gap-3 md:gap-5 justify-start md:justify-between items-center w-full flex-nowrap overflow-x-auto pb-2 md:pb-0">
        {daily.map((day, idx) => (
          <ForecastCard
            key={day.dt}
            day={day}
            selected={selected === idx}
            onClick={() => setSelected(idx)}
          />
        ))}
      </div>
      {/* Optionally, show more details for selected day here */}
    </div>
  );
};

export default ForecastList; 