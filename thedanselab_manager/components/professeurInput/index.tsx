import React, { useEffect, useState } from 'react';

type ProfesseurInputProps = {
  professeur: string;
  setProfesseur: (professeur: string) => void;
};

const ProfesseurInput: React.FC<ProfesseurInputProps> = ({ professeur, setProfesseur }) => {
  const [professeurs, setProfesseurs] = useState<string[]>([]);

  useEffect(() => {
    // Fetch the list of professeurs from the API
    const fetchProfesseurs = async () => {
      try {
        const response = await fetch('/api/professeurs'); // Change the URL to your actual API endpoint
        const data = await response.json();
        setProfesseurs(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des professeurs:', error);
      }
    };

    fetchProfesseurs();
  }, []);

  return (
    <select
      value={professeur}
      onChange={(e) => setProfesseur(e.target.value)}
      style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
    >
      <option value="" disabled>
        Sélectionnez un professeur
      </option>
      {professeurs.map((prof, index) => (
        <option key={index} value={prof}>
          {prof}
        </option>
      ))}
    </select>
  );
};

export default ProfesseurInput;
