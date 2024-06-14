// PriceInput.tsx
import React, { ChangeEvent } from "react";

interface PriceInputProps {
  price: string;
  setPrice: (value: string) => void;
}

const PriceInput: React.FC<PriceInputProps> = ({ price, setPrice }) => {
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  return (
    <div>
      <label
        htmlFor="price"
        className="block text-sm font-medium text-gray-700"
      >
        Prix
      </label>
      <input
        type="text"
        id="price"
        value={value}
        onChange={handlePriceChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default PriceInput;
