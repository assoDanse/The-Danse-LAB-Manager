import React, { ChangeEvent } from "react";

interface PriceInputProps {
  value: string;
  onChange: (price: string) => void;
}

const PriceInput: React.FC<PriceInputProps> = ({ value, onChange }) => {
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handlePriceChange}
      placeholder="Prix"
    />
  );
};

export default PriceInput;
