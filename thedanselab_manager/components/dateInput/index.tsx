import React from "react";
import { Datepicker } from "flowbite-react";

type DateInputProps = {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholderText?: string;
  className?: string;
  // Nouvelles propriétés pour l'heure
  time?: string; // Format HH:mm
  onTimeChange?: (time: string) => void;
};

const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  placeholderText = "Select a date",
  className = "",
  time,
  onTimeChange,
}) => {
  const handleDateChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    // Parse the input value to a Date object
    const date = event.target.valueAsDate;
    // Call the parent component's onChange function with the parsed date
    onChange(date);
  };

  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    // Call the parent component's onTimeChange function with the new time value
    onTimeChange?.(event.target.value);
  };

  return (
    <div>
      <Datepicker
        selected={value}
        onChange={handleDateChange}
        placeholderText={placeholderText}
        className={className}
      />
      {/* Input for time */}
      <input
        type="time"
        value={time}
        onChange={handleTimeChange}
        placeholder="Select a time"
        className={className}
      />
    </div>
  );
};

export default DateInput;

