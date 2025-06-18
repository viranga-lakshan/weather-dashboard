import React from 'react';

/**
 * WeatherDetails displays additional weather metrics.
 * @param {object} props
 * @param {number} props.humidity
 * @param {number} props.wind
 * @param {number} props.pressure
 * @param {number} props.feelsLike
 */
const WeatherDetails = ({ humidity, wind, pressure, feelsLike }) => (
  <div className="grid grid-cols-2 gap-4 w-full text-center mb-2">
    {/* Humidity */}
    <div className="bg-[#f1f4f4] rounded-lg p-4">
      <div className="text-xs text-gray-500">Humidity</div>
      <div className="font-bold text-lg text-gray-700">{humidity}%</div>
    </div>
    {/* Wind Speed */}
    <div className="bg-[#f1f4f4] rounded-lg p-4">
      <div className="text-xs text-gray-500">Wind Speed</div>
      <div className="font-bold text-lg text-gray-700">{wind} km/h</div>
    </div>
    {/* Pressure */}
    <div className="bg-[#f1f4f4] rounded-lg p-4">
      <div className="text-xs text-gray-500">Pressure</div>
      <div className="font-bold text-lg text-gray-700">{pressure} hPa</div>
    </div>
    {/* Feels Like */}
    <div className="bg-[#f1f4f4] rounded-lg p-4">
      <div className="text-xs text-gray-500">Feels Like</div>
      <div className="font-bold text-lg text-gray-700">{Math.round(feelsLike)}°C</div>
    </div>
  </div>
);

export default WeatherDetails;
