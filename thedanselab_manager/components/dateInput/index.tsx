// DateInput.tsx
import React, { ChangeEvent } from "react";
import { Label, Select, Datepicker } from "flowbite-react";

interface DateInputProps {
  date: string;
  setDate: (date: string) => void;
}

const DateInput: React.FC<DateInputProps> = ({ date, setDate }) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  return (
    <div>
      <Label htmlFor="date">Date et Heure de Début</Label>
      <Datepicker onChange={handleDateChange} />
      {/* <input
        type="datetime-local"
        id="date"
        value={date}
        onChange={handleDateChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      /> */}
    </div>
  );
};

export default DateInput;
