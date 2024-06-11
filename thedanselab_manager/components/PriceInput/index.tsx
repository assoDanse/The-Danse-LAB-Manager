import React, { ChangeEvent } from "react";

interface PriceInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PriceInput: React.FC<PriceInputProps> = ({ value, onChange }) => {
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label htmlFor="price" className="block text-sm font-medium text-gray-700">
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
