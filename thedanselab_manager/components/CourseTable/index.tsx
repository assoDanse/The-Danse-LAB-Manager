// components/CourseTable.tsx
import React, { useEffect, useState } from "react";
import TableSkeleton from "../TableSkeleton";
import { useRouter } from "next/navigation";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase-config";

interface Course {
  id: string;
  titre: string;
  description: string;
  date_heure_debut: {
    seconds: number;
    nanoseconds: number;
  };
  duree: {
    heures: number;
    minutes: number;
  };
}

const CourseTable: React.FC = () => {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);

      try {
        const querySnapshot = await getDocs(collection(db, "cours"));
        const courseList: Course[] = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((course) => {
            const courseDate = new Date(course.date_heure_debut.seconds * 1000);
            return courseDate >= new Date();
          }) as Course[];
        setCourses(courseList);
      } catch (err) {
        setError("Erreur lors de la récupération des cours");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce cours ?");
    if (confirmed) {
      try {
        await deleteDoc(doc(db, "cours", id));
        setCourses((prevCourses) => prevCourses?.filter((course) => course.id !== id) || null);
      } catch (err) {
        console.error("Erreur lors de la suppression du cours", err);
        setError("Erreur lors de la suppression du cours");
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/edit-course/${id}`);
  };

  if (loading) {
    return <TableSkeleton />;
  }

  if (error) {
    return <div className="flex justify-center items-center w-full">{error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Titre</th>
            <th className="py-2 px-4 border-b text-center">Date et Heure</th>
            <th className="py-2 px-4 border-b text-center">Durée</th>
            <th className="py-2 px-4 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses && courses.map((course) => {
            const courseDate = new Date(course.date_heure_debut.seconds * 1000);
            return (
              <tr key={course.id}>
                <td className="py-2 px-4 border-b text-center">{course.titre}</td>
                <td className="py-2 px-4 border-b text-center">
                  {courseDate.toLocaleString()}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {course.duree.heures} heures {course.duree.minutes} minutes
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() => handleEdit(course.id)}
                    className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
