import React, { useEffect, useState } from 'react';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
import Loader from './components/Loader';
import Error from './components/Error';
import LocationSelector from './components/LocationSelector';
import { fetchCurrentWeather, fetchForecast } from './api/weatherApi';

const DEFAULT_LOCATION = {
  lat: 6.9271,
  lon: 79.8612,
  name: 'London, UK', // For demo, match image
};

const getStoredFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  } catch {
    return [];
  }
};

const App = () => {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [city, setCity] = useState(DEFAULT_LOCATION.name);
  const [coords, setCoords] = useState({ lat: DEFAULT_LOCATION.lat, lon: DEFAULT_LOCATION.lon });
  const [favorites, setFavorites] = useState(getStoredFavorites());

  // Fetch weather by coordinates
  const loadWeather = async (lat, lon, cityName) => {
    setLoading(true);
    setError('');
    try {
      const currentData = await fetchCurrentWeather(lat, lon);
      const forecastData = await fetchForecast(lat, lon);
      setCurrent({ ...currentData, locationName: cityName });
      setForecast(forecastData.list);
    } catch (err) {
      setError('Failed to load weather data.');
    } finally {
      setLoading(false);
    }
  };

  // Geocode city name to coordinates
  const geocodeCity = async (cityName) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=80aaa1df191b9d581c282dd90ca1413f`);
      const data = await res.json();
      if (data && data[0]) {
        setCoords({ lat: data[0].lat, lon: data[0].lon });
        setCity(cityName);
        loadWeather(data[0].lat, data[0].lon, cityName);
      } else {
        setError('City not found.');
        setLoading(false);
      }
    } catch {
      setError('Failed to search city.');
      setLoading(false);
    }
  };

  // On mount, load default city
  useEffect(() => {
    loadWeather(coords.lat, coords.lon, city);
    // eslint-disable-next-line
  }, []);

  // Add to favorites
  const handleAddFavorite = () => {
    if (!favorites.some(fav => fav.name === city)) {
      const newFavs = [...favorites, { name: city, lat: coords.lat, lon: coords.lon }];
      setFavorites(newFavs);
      localStorage.setItem('favorites', JSON.stringify(newFavs));
    }
  };

  // Remove from favorites
  const handleRemoveFavorite = (name) => {
    const newFavs = favorites.filter(fav => fav.name !== name);
    setFavorites(newFavs);
    localStorage.setItem('favorites', JSON.stringify(newFavs));
  };

  // Select favorite
  const handleSelectFavorite = (name) => {
    const fav = favorites.find(f => f.name === name);
    if (fav) {
      setCity(fav.name);
      setCoords({ lat: fav.lat, lon: fav.lon });
      loadWeather(fav.lat, fav.lon, fav.name);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 via-blue-400 to-blue-500 flex flex-col items-center py-6 px-2 md:py-10 md:px-4">
      <header className="mb-4 md:mb-6 text-center w-full">
        <h1 className="text-3xl md:text-5xl font-bold flex items-center justify-center gap-2 text-white drop-shadow">
          <span role="img" aria-label="weather">🌤️</span> Weather Dashboard
        </h1>
        <p className="text-blue-100 mt-2 text-base md:text-lg">Your personal weather companion</p>
      </header>
      <LocationSelector
        onSearch={geocodeCity}
        favorites={favorites}
        onSelectFavorite={handleSelectFavorite}
        onRemoveFavorite={handleRemoveFavorite}
        currentCity={city}
      />
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message={error} />
      ) : (
        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6 md:gap-10 h-auto md:h-[540px]">
          <div className="flex-1 flex justify-center items-stretch mb-6 md:mb-0">
            <WeatherCard 
              data={current} 
              fullHeight 
              onAddFavorite={handleAddFavorite}
            />
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