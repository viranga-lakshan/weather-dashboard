import React, { useEffect, useState } from 'react';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
import Loader from './components/Loader';
import Error from './components/Error';
import { fetchCurrentWeather, fetchForecast } from './api/weatherApi';

const DEFAULT_LOCATION = {
  lat: 6.9271,
  lon: 79.8612,
  name: 'London, UK', // For demo, match image
};

const App = () => {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWeather = async () => {
      setLoading(true);
      setError('');
      try {
        const currentData = await fetchCurrentWeather(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lon);
        const forecastData = await fetchForecast(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lon);
        setCurrent({ ...currentData, locationName: DEFAULT_LOCATION.name });
        setForecast(forecastData.list);
      } catch (err) {
        setError('Failed to load weather data.');
      } finally {
        setLoading(false);
      }
    };
    loadWeather();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 via-blue-400 to-blue-500 flex flex-col items-center py-10 px-2">
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold flex items-center justify-center gap-2 text-white drop-shadow">
          <span role="img" aria-label="weather">🌤️</span> Weather Dashboard
        </h1>
        <p className="text-blue-100 mt-2 text-lg">Your personal weather companion</p>
      </header>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message={error} />
      ) : (
        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-10 h-[540px]">
          <div className="flex-1 flex justify-center items-stretch">
            <WeatherCard data={current} fullHeight />
          </div>
          <div className="flex-[2] flex items-stretch">
            <ForecastList forecast={forecast} fullHeight />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;