import React from 'react'

export const WeatherInfo = ({weatherIcon,weatherData}) => {
  return (
    <div className="p-6 rounded-lg shadow-md flex flex-col gap-4 items-center justify-between bg-white/30 backdrop-blur-lg">
  <div className="flex items-center justify-center gap-6">
    <h1 className="font-bold text-3xl">{weatherData?.current?.temp_c}°C</h1>
    {weatherIcon}
  </div>
  <h3 className="text-lg font-semibold">{weatherData?.location?.name}</h3>
  <h4>{weatherData?.location?.country}</h4>
</div>
  )
}
  
  
