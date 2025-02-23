import React from 'react'

const WeekDays = ({daysOfWeek, selectedDay, onSelectDay}) => {

    return (
      <div className="flex justify-between gap-2 mb-4">
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className={`flex-1 p-1 rounded-lg text-center cursor-pointer ${
              selectedDay === index ? "bg-white/50" : ""
            }`}
            onClick={() => onSelectDay(index)}
          >
            <p>{day}</p>
          </div>
        ))}
      </div>
    );
  };
  

export default WeekDays