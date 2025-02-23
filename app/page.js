"use client";

import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {weather_icons,daysOfWeek} from "./constants";
import { WeatherInfo } from "./components/WeatherInfo";
import SearchInput from "./components/SearchInput";
import WeekDays from "./components/WeekDays";
import TimeInfo from "./components/TimeInfo";

const WEATHER_API_KEY ='7b4ac08ec8cc418da2a193214252102';
const UNSPLASH_ACCESS_KEY ='KlftTWuliEUezcHrgS6E99IkZ2-bDXaqa0vIJJJkRL8';

// Fetch Weather Data
async function fetchWeather(city) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=4&aqi=no&alerts=no`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch weather data: ${response.statusText}`);
  }
  return response.json();
}

// Fetch Background Image
async function fetchBackground(city) {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${city}&client_id=${UNSPLASH_ACCESS_KEY}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch background image: ${response.statusText}`);
  }
  return response.json();
}

// Helper Function to Get Weather Icon
const getWeatherIcon = (condition) => {
  if (!condition) return weather_icons.sun;
  const conditionKey = Object.keys(weather_icons).find((key) =>
    condition.toLowerCase().includes(key)
  );
  return conditionKey ? weather_icons[conditionKey] : weather_icons.sun;
};


const Home = () => {
  const [city, setCity] = useState("Tehran");
  const [selectedDay, setSelectedDay] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update Time Every Second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 10000);
    return () => clearInterval(timer);
  }, []);

  // Fetch Weather Data
  const { data: weatherData, isLoading, error } = useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchWeather(city),
    onError: (error) => {
      console.error("Error fetching weather data:", error);
    },
  });

  // Fetch Background Image
  const { data: backgroundData } = useQuery({
    queryKey: ["background", city],
    queryFn: () => fetchBackground(city),
    enabled: !!city,
    onError: (error) => {
      console.error("Error fetching background image:", error);
    },
  });

  // Memoized Background Image
  const backgroundImage = backgroundData?.urls?.regular || "";

  // Memoized Weather Icon
  const weatherIcon = useMemo(
    () =>
      getWeatherIcon(weatherData?.forecast?.forecastday[selectedDay]?.day?.condition?.text),
    [weatherData, selectedDay]
  );

  const ForcastsNames=["Today'sForecast","HourlyForecast","DailyForecast"];

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-md"
        style={{ backgroundImage: `url(${backgroundImage})`,objectFit:"cover" }}
      ></div>

      {/* Weather Content */}
      <div className="flex-col gap-5 items-center justify-between p-6 rounded-lg shadow-xl text-black-700 max-h-[90vh] w-[90vw] relative z-10 flex"  style={{ backgroundImage: `url(${backgroundImage})`,objectFit:"cover" }}>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching weather data: {error.message}</p>
        ) : (
          <>
          <div className="flex justify-between  gap-8">
            <WeatherInfo weatherIcon={weatherIcon} weatherData={weatherData} />
            <SearchInput setCity={setCity} />
            {/* Current Time and Week Days */}
            <div className="flex flex-col gap-2">
              <TimeInfo currentTime={currentTime} />
              <WeekDays
                daysOfWeek={daysOfWeek}
                selectedDay={selectedDay}
                onSelectDay={setSelectedDay}
              />
            </div>
          </div>
          <div className="p-6 rounded-lg shadow-md flex gap-2 min-w-[90vw] flex-1 items-start justify-between bg-white/10 backdrop-blur-md">
          <div className="flex flex-col gap-2">
<div className="flex items-center justify-center gap-8 ">
  {ForcastsNames.map((name,index)=>(
    <a key={index}>
{name}
    </a>
  ))}
  <hr className="border-b-2 border-gray-800 my-4" />
</div>
<div className="flex gap-6 items-start justify-between py-6">
<div className="flex flex-col gap-3 items-center justify-between">
<p>humidity</p>
<p>visibility</p>
<p>uv index</p>
  
  </div>
  <div className="flex flex-col gap-3 items-center justify-between" >
  <p>pressure</p>
  <p>wind</p>
  <p>dew point</p>
  
</div>
</div>
</div>
          </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;


{/* 

<h2 className="mt-4 text-lg font-semibold">Hourly Forecast</h2>
<div className="flex gap-2 overflow-x-auto">
  {weatherData?.forecast?.forecastday[0]?.hour.map((hour, index) => (
    <div key={index} className="bg-white/30 p-2 rounded-lg text-center">
      <p>{hour.time.split(" ")[1]}</p>
      <p>{hour.temp_c}°C</p>
    </div>
  ))}
</div>

<h2 className="mt-4 text-lg font-semibold">7-Day Forecast</h2>
<div className="grid grid-cols-2 gap-2">
  {weatherData?.forecast?.forecastday.map((day, index) => (
    <div key={index} className="bg-white/30 p-2 rounded-lg text-center">
      <p>{day.date}</p>
      <p>{day.day.avgtemp_c}°C</p>
    </div>
  ))}
</div> */}




