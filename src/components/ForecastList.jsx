import React, { useState } from 'react';
import ForecastCard from './ForecastCard';

// Helper to get one forecast per day (at noon)
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

const ForecastList = ({ forecast }) => {
  const daily = getDailyForecast(forecast);
  const [selected, setSelected] = useState(0);

  return (
    <div className="bg-white bg-opacity-80 rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">5-Day Forecast</h2>
      <div className="flex gap-3 flex-wrap justify-between">
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