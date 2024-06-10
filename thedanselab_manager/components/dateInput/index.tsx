// components/dateInput/index.tsx

import React, { useState } from "react";
import { Datepicker } from "flowbite-react";

const DateInput: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <div className="flex flex-col">
      <label>Date</label>
      <Datepicker
        selected={selectedDate}
        onChange={handleChange}
        placeholder="Select a date"
        className="w-full border rounded-md p-2"
      />
    </div>
  );
};

export default DateInput;
