// DateInput.tsx
import React, { ChangeEvent } from "react";

interface DateInputProps {
  date: string;
  setDate: (date: string) => void;
}

const DateInput: React.FC<DateInputProps> = ({ date, setDate }) => {
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  return (
    <input
      type="date"
      value={date}
      onChange={handleDateChange}
    />
  );
};

export default DateInput;
