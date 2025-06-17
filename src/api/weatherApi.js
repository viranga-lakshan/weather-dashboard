// API utility for weather data

const API_KEY = '80aaa1df191b9d581c282dd90ca1413f';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchCurrentWeather = async (lat, lon) => {
  try {
    const res = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    if (!res.ok) throw new Error('Failed to fetch current weather');
    return await res.json();
  } catch (err) {
    throw err;
  
  }
};

export const fetchForecast = async (lat, lon) => {
  try {
    const res = await fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    if (!res.ok) throw new Error('Failed to fetch forecast');
    return await res.json();
  } catch (err) {
    throw err;
  }
}; 