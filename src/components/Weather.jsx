import React, { useEffect, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('London');

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  useEffect(() => {
    search(city);
  }, []);

  const handleSearch = () => {
    search(city);
  }

  const getWeatherIcon = () => {
    if (!weatherData) return clear_icon;
    const weatherMain = weatherData.weather[0].main.toLowerCase();
    switch (weatherMain) {
      case 'clear': return clear_icon;
      case 'clouds': return cloud_icon;
      case 'drizzle': return drizzle_icon;
      case 'rain': return rain_icon;
      case 'snow': return snow_icon;
      default: return clear_icon;
    }
  }

  return (
    <div className='weather'>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder='Search' 
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <img 
          src={search_icon} 
          alt="" 
          onClick={handleSearch}
          style={{ cursor: 'pointer' }}
        />
      </div>
      
      {weatherData && (
        <>
          <img src={getWeatherIcon()} alt="" className='weather-icon' />
          <p className='temp'>{Math.round(weatherData.main.temp)}°c</p>
          <p className='location'>{weatherData.name}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weatherData.main.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData.wind.speed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Weather