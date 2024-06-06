import React from 'react';

type TypeDeCoursInputProps = {
  typeDeCours: string;
  setTypeDeCours: (typeDeCours: string) => void;
};

const TypeDeCoursInput: React.FC<TypeDeCoursInputProps> = ({ typeDeCours, setTypeDeCours }) => {
  const typesDeCours = [
    "Ballet",
    "Hip Hop",
    "Salsa",
    "Tango",
    "Jazz",
    "Contemporary",
  ];

  return (
    <select
      value={typeDeCours}
      onChange={(e) => setTypeDeCours(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded"
      style={{ fontSize: '14px' }} // Ajout de la taille de la police
    >
      <option value="" disabled>
        Sélectionnez un type de cours
      </option>
      {typesDeCours.map((type, index) => (
        <option key={index} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
};

export default TypeDeCoursInput;
