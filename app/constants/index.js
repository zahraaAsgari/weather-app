import {
    FaSun,
    FaCloud,
    FaCloudRain,
    FaSnowflake,
    FaCloudShowersHeavy,
    FaBolt,
  } from "react-icons/fa";

  // Weather Icons Mapping
   export const weather_icons = {
    sun: <FaSun className="text-yellow-400" size={40} />,
    cloud: <FaCloud className="text-gray-400" size={40} />,
    rain: <FaCloudRain className="text-blue-400" size={40} />,
    snow: <FaSnowflake className="text-blue-200" size={40} />,
    shower: <FaCloudShowersHeavy className="text-blue-500" size={40} />,
    thunder: <FaBolt className="text-yellow-500" size={40} />,
  };

   
  // Days of the Week
  export const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];