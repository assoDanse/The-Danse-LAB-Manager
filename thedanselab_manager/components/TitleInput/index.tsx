import React, { ChangeEvent } from "react";

interface TitleInputProps {
  title: string;
  setTitle: (title: string) => void;
}

const TitleInput: React.FC<TitleInputProps> = ({ title, setTitle }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 100) {
      setTitle(inputValue);
    }
  };

  return (
    <div>
      <label
        htmlFor="title"
        className="block text-sm font-medium text-gray-700"
      >
        Titre
      </label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={handleChange}
        placeholder="Titre"
        maxLength={100}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />

    </div>
  );
};

export default TitleInput;
