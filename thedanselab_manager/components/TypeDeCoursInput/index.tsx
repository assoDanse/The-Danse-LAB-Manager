import React from "react";

interface TypeDeCoursInputProps {
  typeDeCours: string;
  setTypeDeCours: (typeDeCours: string) => void;
}

const TypeDeCoursInput: React.FC<TypeDeCoursInputProps> = ({ typeDeCours, setTypeDeCours }) => {
  return (
    <div>
      <label htmlFor="typeDeCours" className="block text-sm font-medium text-gray-700">
        Type de Cours
      </label>
      <select
        id="typeDeCours"
        value={typeDeCours}
        onChange={(e) => setTypeDeCours(e.target.value)}
        className="border-gray-300 rounded mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">Sélectionnez un type</option>
        <option value="Salsa">Salsa</option>
        <option value="Hip-Hop">Hip-Hop</option>
        <option value="Danse contemporaine">Danse Contemporaine</option>
        <option value="Danse moderne">Danse moderne</option>
        {/* Ajoutez d'autres options ici */}
      </select>
    </div>
  );
};

export default TypeDeCoursInput;
