import React, { useState, ChangeEvent } from "react";

interface DurationInputProps {
  duration: string;
  setDuration: (duration: string) => void;
}

const DurationInput: React.FC<DurationInputProps> = ({ duration, setDuration }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDuration(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={duration}
        onChange={handleInputChange}
        placeholder="Enter la duré"
      />
    </div>
  );
};

export default DurationInput;
