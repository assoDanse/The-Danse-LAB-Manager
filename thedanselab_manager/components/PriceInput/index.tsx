// PriceInput.tsx
import React, { ChangeEvent } from "react";

interface PriceInputProps {
  price: string;
  setPrice: (price: string) => void;
}

const PriceInput: React.FC<PriceInputProps> = ({ price, setPrice }) => {
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  return (
    <input
      type="text"
      value={price}
      onChange={handlePriceChange}
      placeholder="Prix"
    />
  );
};

export default PriceInput;
