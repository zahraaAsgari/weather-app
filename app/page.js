"use client";

import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {weather_icons,daysOfWeek} from "./constants";
import { WeatherInfo } from "./components/WeatherInfo";
import SearchInput from "./components/SearchInput";
import WeekDays from "./components/WeekDays";
import TimeInfo from "./components/TimeInfo";
import {WiHumidity} from "react-icons/wi";
import {MdDewPoint, MdVisibility} from "react-icons/md";
import { TbUvIndex } from "react-icons/tb";
import { FaWind } from "react-icons/fa";
import {PiThermometerCold} from "react-icons/pi"

const WEATHER_API_KEY ='7b4ac08ec8cc418da2a193214252102';
const UNSPLASH_ACCESS_KEY ='KlftTWuliEUezcHrgS6E99IkZ2-bDXaqa0vIJJJkRL8';

// Fetch Weather Data
async function fetchWeather(city) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=7&aqi=no&alerts=no`
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
  //getting Hourly Forecast
  const getHourlyForecast = (forecast) => {
    if (!forecast) return [];
  
    const hours = [6, 12, 18, 22]; // صبح، ظهر، عصر، شب
    return hours.map((hour) => {
      const data = forecast.find((item) => new Date(item.time).getHours() === hour);
      return data ? {
        time: hour,
        temp: data.temp_c,
        icon: getWeatherIcon(data.condition.text)
      } : null;
    }).filter(Boolean);
  };
  const hourlyForecast = getHourlyForecast(weatherData?.forecast?.forecastday[0]?.hour);

  // Memoized Background Image
  const backgroundImage = backgroundData?.urls?.regular || "";

  // Memoized Weather Icon
  const weatherIcon = useMemo(
    () =>
      getWeatherIcon(weatherData?.forecast?.forecastday[selectedDay]?.day?.condition?.text),
    [weatherData, selectedDay]
  );
  console.log(weatherData);

  const ForcastsNames=["Today'sForecast","HourlyForecast","DailyForecast"];

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-md"
        style={{ backgroundImage: `url(${backgroundImage})`,objectFit:"cover"}}
      ></div>

      {/* Weather Content */}
      <div className="flex-col gap-5 bg-cover items-center justify-between p-6 rounded-lg shadow-xl text-black-700 min-h-[90vh] w-[90vw] relative z-10 flex"  style={{ backgroundImage: `url(${backgroundImage})`,objectFit:"cover" }}>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching weather data: {error.message}</p>
        ) : (
          <>
          <div className="flex justify-between gap-[10rem]">
            <WeatherInfo weatherIcon={weatherIcon} weatherData={weatherData} />
            <SearchInput setCity={setCity} />
            <div className="flex flex-col gap-2">
              <TimeInfo currentTime={currentTime} />
              <WeekDays
                daysOfWeek={daysOfWeek}
                selectedDay={selectedDay}
                onSelectDay={setSelectedDay}
              />
            </div>
          </div>
          
          <div className="px-6 pt-4 rounded-lg shadow-md flex gap-8 min-w-[90vw] h-auto items-start justify-between bg-white/10 backdrop-blur-md">
          <div className="flex items-center justify-between gap-[13rem]">
          <div className="flex flex-col gap-2">
<div className="flex items-center justify-center gap-10 ">
  {ForcastsNames.map((name,index)=>(
    <a key={index}>
{name}
    </a>
  ))}
  <hr className="border-b-2 border-gray-800 my-4" />
</div>
<div className="flex gap-8 items-start justify-between py-6">
<div className="flex flex-col gap-3 items-start justify-between">
<div className="flex gap-8 items-center justify-between"><span ><WiHumidity/> </span><p className="text-sm"> Humidity</p> {weatherData?.current?.humidity} %</div>
<div className="flex gap-8 items-center justify-between"><span ><MdVisibility/> </span><p className="text-sm"> Visibility</p>{weatherData?.current?.vis_km}</div>
<div className="flex gap-8 items-center justify-between"><span ><TbUvIndex/> </span><p className="text-sm"> UV Index</p>{weatherData?.current?.uv}</div>
  </div>
  <div className="flex flex-col gap-3 items-start justify-between" >
  <div className="flex gap-8 items-center justify-between"><span ><PiThermometerCold/> </span><p className="text-sm">Pressure</p>{weatherData?.current?.pressure_mb} mb</div>
  <div className="flex gap-8 items-center justify-between"><span ><FaWind/> </span><p className="text-sm">Wind</p>{weatherData?.current?.wind_kph} km/h</div>
  <div className="flex gap-8 items-center justify-between"><span ><MdDewPoint/> </span><p className="text-sm">Dew Point</p>{weatherData?.current?.dewpoint_f}</div>
</div>
</div>
</div>
<div className="flex gap-8 p-2 items-center justify-between">
  {hourlyForecast.map((item, index) => (
    <div key={index} className="p-8 flex flex-col items-center justify-between bg-white/20 backdrop-blur-lg shadow-xl rounded-lg text-center">
      {/* <img src={weatherIcon} alt="weather icon" className="w-12 h-12 mx-auto" /> */}
      {weatherIcon}
      <p className="text-sm">{["Morning", "Noon", "Evening", "Night"][index]}</p>
      <p className="font-bold">{item.temp}°C</p>
    </div>
  ))}
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

