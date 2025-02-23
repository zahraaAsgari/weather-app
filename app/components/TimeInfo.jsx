import React from 'react'

const TimeInfo = ({currentTime}) => {
  return (
    <div className="mb-2 p-4 bg-white/30 backdrop-blur-lg rounded-lg text-center flex flex-col gap-2">
    <p className="text-xl font-bold">{currentTime.toLocaleTimeString()}</p>
    <p className="text-lg">
      {currentTime.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </p>
  </div>
  )
}

export default TimeInfo;