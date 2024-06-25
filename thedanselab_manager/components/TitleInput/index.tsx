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
      {/* <label
        htmlFor="title"
        className="block text-sm font-medium text-gray-700"
      >
        Titre
      </label> */}
      <input
        type="text"
        id="title"
        value={title}
        onChange={handleChange}
        placeholder="Titre"
        maxLength={100}
        className="w-full px-3 py-2 border rounded"
      />
    </div>
  );
};

export default TitleInput;
