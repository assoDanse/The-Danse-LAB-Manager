// components/StudentTable.tsx
import React, { useEffect, useState } from "react";
import TableSkeleton from "../TableSkeleton/intex";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  credits: number;
}

const StudentTable: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch("/api/students");
      const data = await response.json();
      setStudents(data);
      setLoading(false);
    };

    fetchStudents();
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
          <th className="py-2">Email</th>
          <th className="py-2">Crédits</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td className="py-2 px-4">{student.id}</td>
            <td className="py-2 px-4">{student.lastName}</td>
            <td className="py-2 px-4">{student.firstName}</td>
            <td className="py-2 px-4">{student.email}</td>
            <td className="py-2 px-4">{student.credits}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
