// components/CoursesTable.tsx
"use client";
import React, { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase-config";
import TableSkeleton from "../TableSkeleton";

interface Cours {
  id: string;
  date_heure_debut: any;  // Utiliser any pour le type de timestamp de Firebase
  description: string;
  duree: {
    heures: number;
    minutes: number;
  };
  id_professeur: string;
  nom_professeur: string;
  periodicite: number;
  photo: string;
  places_restantes: number;
  titre: string;
  type: string;
}

const CoursesTable: React.FC = () => {
  const [courses, setCourses] = useState<Cours[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);

      try {
        const q =query(collection(db, "cours"));
        const querySnapshot =  await getDocs(q);
        const coursesList: Cours[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          date_heure_debut: doc.data().date_heure_debut.toDate(),  // Convertir le timestamp en Date
          description: doc.data().description,
          duree: doc.data().duree,
          id_professeur: doc.data().id_professeur,
          nom_professeur: doc.data().nom_professeur,
          periodicite: doc.data().periodicite,
          photo: doc.data().photo,
          places_restantes: doc.data().places_restantes,
          titre: doc.data().titre,
          type: doc.data().type,
        }));
        setCourses(coursesList);
      } catch (err) {
        setError("Erreur lors de la récupération des cours");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
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
          <th className="py-2 px-4 border-b text-center">Titre</th>
          <th className="py-2 px-4 border-b text-center">Type</th>
          <th className="py-2 px-4 border-b text-center">Date et Heure</th>
          <th className="py-2 px-4 border-b text-center">Durée</th>
          <th className="py-2 px-4 border-b text-center">Professeur</th>
          <th className="py-2 px-4 border-b text-center">Places Restantes</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course) => (
          <tr key={course.id}>
            <td className="py-2 px-4 border-b text-center">{course.titre}</td>
            <td className="py-2 px-4 border-b text-center">{course.type}</td>
            <td className="py-2 px-4 border-b text-center">{course.date_heure_debut.toLocaleString()}</td>
            <td className="py-2 px-4 border-b text-center">
              {course.duree.heures}h {course.duree.minutes}m
            </td>
            <td className="py-2 px-4 border-b text-center">{course.nom_professeur}</td>
            <td className="py-2 px-4 border-b text-center">{course.places_restantes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CoursesTable;
