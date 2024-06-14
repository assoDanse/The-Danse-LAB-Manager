// components/ProfessorTable.tsx
import React, { useEffect, useState } from "react";
import TableSkeleton from "../TableSkeleton/intex";

interface Professor {
  id: string;
  firstName: string;
  lastName: string;
  description: string;
}

const ProfessorTable: React.FC = () => {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfessors = async () => {
      const response = await fetch("/api/professors");
      const data = await response.json();
      setProfessors(data);
      setLoading(false);
    };

    fetchProfessors();
  }, []);

  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2">ID</th>
          <th className="py-2">Nom</th>
          <th className="py-2">Prénom</th>
          <th className="py-2">Description</th>
        </tr>
      </thead>
      <tbody>
        {professors.map((professor) => (
          <tr key={professor.id}>
            <td className="py-2 px-4">{professor.id}</td>
            <td className="py-2 px-4">{professor.lastName}</td>
            <td className="py-2 px-4">{professor.firstName}</td>
            <td className="py-2 px-4">{professor.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProfessorTable;
