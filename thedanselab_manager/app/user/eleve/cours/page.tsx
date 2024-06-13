"use client";
import React, { useState, useEffect } from "react";
import CardcoursVisiteur from "@/components/CardCoursVisiteur";

const CoursEleve: React.FC = () => {
  const [courses, setCourses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    // Logique pour récupérer les données des cours depuis la base de données
    const fetchData = async () => {
      try {
        const response = await fetch("/api/courses");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données des cours:", error);
      }
    };

    fetchData();
  }, []);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedCourse(null);
  };

  return (
    <div className="flex flex-wrap justify-center items-center w-full">
      {courses.length === 0 ? (
        <p className="text-center text-gray-600 font-semibold">Aucun cours disponible pour le moment.</p>
      ) : (
        courses.map((course, index) => (
          <div key={index} onClick={() => handleCourseClick(course)} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
            <CardcoursVisiteur
              titre={course.titre}
              description={course.description}
              image={course.image}
              prix={course.prix}
              date={new Date(course.date)}
              heure={course.heure}
              duree={course.duree}
            />
          </div>
        ))
      )}
      
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">{selectedCourse.titre}</h2>
            <p>{/* Contenu du popup avec les détails du cours */}</p>
            <div className="mt-4 flex justify-between">
              <button onClick={handleClosePopup} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                Annuler
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                Utiliser les crédits
              </button>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                Payer avec Halloasso
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursEleve;
