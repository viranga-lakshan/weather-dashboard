import React from 'react';

const WeatherDetails = ({ humidity, wind, pressure, feelsLike }) => (
  <div className="grid grid-cols-2 gap-3 w-full text-center mb-2">
    <div className="bg-blue-50 rounded p-2">
      <div className="text-xs text-gray-500">Humidity</div>
      <div className="font-semibold">{humidity}%</div>
    </div>
    <div className="bg-blue-50 rounded p-2">
      <div className="text-xs text-gray-500">Wind Speed</div>
      <div className="font-semibold">{wind} km/h</div>
    </div>
    <div className="bg-blue-50 rounded p-2">
      <div className="text-xs text-gray-500">Pressure</div>
      <div className="font-semibold">{pressure} hPa</div>
    </div>
    <div className="bg-blue-50 rounded p-2">
      <div className="text-xs text-gray-500">Feels Like</div>
      <div className="font-semibold">{Math.round(feelsLike)}°C</div>
    </div>
  </div>
);

export default WeatherDetails; 