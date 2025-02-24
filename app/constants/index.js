import {
    FaCloud,
    FaCloudRain,
    FaSnowflake,
    FaCloudShowersHeavy,
    FaBolt,
  } from "react-icons/fa";
 import {IoMdSunny} from "react-icons/io"
  // Weather Icons Mapping
   export const weather_icons = {
    sun: <IoMdSunny className="" size={40} />,
    cloud: <FaCloud className="" size={40} />,
    rain: <FaCloudRain className="" size={40} />,
    snow: <FaSnowflake className="" size={40} />,
    shower: <FaCloudShowersHeavy className="" size={40} />,
    thunder: <FaBolt className="" size={40} />,
  };

   
  // Days of the Week
  export const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
