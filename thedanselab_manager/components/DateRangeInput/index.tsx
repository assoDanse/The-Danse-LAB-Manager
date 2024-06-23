// DateRangeInput.tsx
import React from "react";

interface DateRangeInputProps {
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
}

const DateRangeInput: React.FC<DateRangeInputProps> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label
          htmlFor="start-date"
          className="block text-sm font-medium text-gray-700"
        >
          Date et Heure de Début
        </label>
        <input
          type="datetime-local"
          id="start-date"
          value={startDate}
          onChange={handleStartDateChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="end-date"
          className="block text-sm font-medium text-gray-700"
        >
          Date et Heure de Fin
        </label>
        <input
          type="datetime-local"
          id="end-date"
          value={endDate}
          onChange={handleEndDateChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default DateRangeInput;
