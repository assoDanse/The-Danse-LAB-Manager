// components/StudentTable.tsx
"use client";
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase-config";
import TableSkeleton from "../TableSkeleton";

interface Student {
  id: string;
  firstName: string;
  name: string;
  email: string;
  credits: number;
}

const StudentTable: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError(null);

      try {
        const q = query(collection(db, "users"), where("status", "==", "eleve"));
        const querySnapshot = await getDocs(q);
        const studentsList: Student[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          firstName: doc.data().firstName,
          name: doc.data().name,
          email: doc.data().email,
          credits: doc.data().credits,
        }));
        setStudents(studentsList);
      } catch (err) {
        setError("Erreur lors de la récupération des élèves");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return <TableSkeleton />;
  }

  if (error) {
    return <div className="flex justify-center items-center w-full">{error}</div>;
  }

  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b text-center">Nom</th>
          <th className="py-2 px-4 border-b text-center">Prénom</th>
          <th className="py-2 px-4 border-b text-center">Email</th>
          <th className="py-2 px-4 border-b text-center">Crédits</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td className="py-2 px-4 border-b text-center">{student.name}</td>
            <td className="py-2 px-4 border-b text-center">{student.firstName}</td>
            <td className="py-2 px-4 border-b text-center">{student.email}</td>
            <td className="py-2 px-4 border-b text-center">{student.credits}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
