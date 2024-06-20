import React, { useState, ChangeEvent } from "react";

interface DurationInputProps {
  duration: { hours: number; minutes: number };
  setDuration: (duration: { hours: number; minutes: number }) => void;
}

const DurationInput: React.FC<DurationInputProps> = ({
  duration,
  setDuration,
}) => {
  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hours = parseInt(e.target.value, 10);
    setDuration({ ...duration, hours: isNaN(hours) ? 0 : hours });
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minutes = parseInt(e.target.value, 10);
    setDuration({ ...duration, minutes: isNaN(minutes) ? 0 : minutes });
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Durée</label>
      <div className="flex space-x-2 mt-1">
        <div>
          <label htmlFor="hours" className="sr-only">
            Heures
          </label>
          <input
            type="number"
            id="hours"
            value={duration.hours}
            onChange={handleHoursChange}
            min="0"
            max="8"
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Heures"
          />
        </div>
        <div>
          <label htmlFor="minutes" className="sr-only">
            Minutes
          </label>
          <input
            type="number"
            id="minutes"
            value={duration.minutes}
            onChange={handleMinutesChange}
            min="0"
            max="59"
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Minutes"
          />
        </div>
      </div>
    </div>
  );
};

export default DurationInput;
