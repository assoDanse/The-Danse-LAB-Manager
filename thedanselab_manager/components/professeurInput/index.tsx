import React, { useEffect, useState } from "react";
import { db } from "@/config/firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";

interface ProfesseurInputProps {
  professorId: string;
  setProfessorId: (professorId: string) => void;
  setProfessorName: (professorName: string) => void;
}

const ProfesseurInput: React.FC<ProfesseurInputProps> = ({ professorId, setProfessorId, setProfessorName }) => {
  const [professors, setProfessors] = useState<{ id: string, name: string }[]>([]);

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const q = query(collection(db, "users"), where("status", "==", "professeur"));
        const querySnapshot = await getDocs(q);
        const profList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: `${doc.data().firstName} ${doc.data().name}`,
        }));
        setProfessors(profList);
      } catch (error) {
        console.error("Error fetching professors:", error);
      }
    };

    fetchProfessors();
  }, []);

  const handleProfessorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProfessor = professors.find(prof => prof.id === e.target.value);
    if (selectedProfessor) {
      setProfessorId(selectedProfessor.id);
      setProfessorName(selectedProfessor.name);
    }
  };

  return (
    <div>
      <label htmlFor="professor" className="block text-sm font-medium text-gray-700">
        Professeur
      </label>
      <select
        id="professor"
        value={professorId}
        onChange={handleProfessorChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">Sélectionnez un professeur</option>
        {professors.map((prof) => (
          <option key={prof.id} value={prof.id}>
            {prof.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProfesseurInput;
