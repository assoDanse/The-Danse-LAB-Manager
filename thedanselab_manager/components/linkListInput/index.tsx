import React, { useState, ChangeEvent } from "react";

interface LinkListInputProps {
  value: string[];
  onChange: (links: string[]) => void;
}

const LinkListInput: React.FC<LinkListInputProps> = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddLink = () => {
    if (inputValue.trim() !== "") {
      onChange([...value, inputValue]);
      setInputValue("");
    }
  };

  const handleRemoveLink = (index: number) => {
    const updatedLinks = value.filter((_, i) => i !== index);
    onChange(updatedLinks);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Ajouter un lien"
      />
      <button onClick={handleAddLink}>Ajouter</button>
      <ul>
        {value && value.map((link, index) => (
          <li key={index}>
            {link}
            <button onClick={() => handleRemoveLink(index)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LinkListInput;

