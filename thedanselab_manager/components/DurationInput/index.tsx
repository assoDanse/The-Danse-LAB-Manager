import React, { ChangeEvent } from "react";

interface DurationInputProps {
  value: string;
  onChange: (duration: string) => void;
}

const DurationInput: React.FC<DurationInputProps> = ({ value, onChange }) => {
  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleDurationChange}
      placeholder="Durée"
    />
  );
};

export default DurationInput;
