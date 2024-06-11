import React, { useEffect, useState } from "react";
import { db } from "@/config/firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";

interface ProfesseurInputProps {
  professor: string;
  setProfessor: (professor: string) => void;
}

const ProfesseurInput: React.FC<ProfesseurInputProps> = ({ professor, setProfessor }) => {
  const [professors, setProfessors] = useState<{ id: string, name: string }[]>([]);

  useEffect(() => {
    const fetchProfessors = async () => {
      const q = query(collection(db, "users"), where("status", "==", "professeur"));
      const querySnapshot = await getDocs(q);
      const profList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        name: `${doc.data().firstName} ${doc.data().name}`,
      }));
      setProfessors(profList);
    };

    fetchProfessors();
  }, []);

  return (
    <div>
      <label htmlFor="professor" className="block text-sm font-medium text-gray-700">
        Professeur
      </label>
      <select
        id="professor"
        value={professor}
        onChange={(e) => setProfessor(e.target.value)}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">Sélectionnez un professeur</option>
        {professors.map((prof) => (
          <option key={prof.id} value={prof.name}>
            {prof.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProfesseurInput;
