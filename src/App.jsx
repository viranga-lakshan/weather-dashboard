 import React, { useEffect, useState } from 'react';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
import Loader from './components/Loader';
import Error from './components/Error';
import { fetchCurrentWeather, fetchForecast } from './api/weatherApi';
 

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
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex flex-col items-center py-6 px-2">
      <header className="mb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-2">
          <span role="img" aria-label="weather">🌤️</span> Weather Dashboard
        </h1>
        <p className="text-blue-100 mt-1">Your personal weather companion</p>
      </header>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message={error} />
      ) : (
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <WeatherCard data={current} />
          </div>
          <div className="flex-[2]">
            <ForecastList forecast={forecast} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;