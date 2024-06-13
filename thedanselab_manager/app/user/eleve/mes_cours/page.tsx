"use client";

import React, { useState } from "react";
import CardcoursEleve from "@/components/CardCoursEleve";

const MesCours: React.FC = () => {
  // État pour stocker les données des cours
  const [coursData, setCoursData] = useState<any[]>([]);
  // État pour stocker l'index du cours sur lequel l'utilisateur a cliqué
  const [selectedCourseIndex, setSelectedCourseIndex] = useState<number | null>(
    null
  );
  // État pour stocker le lien vidéo à ajouter
  const [videoLink, setVideoLink] = useState<string>("");

  // Fonction pour gérer l'ouverture du popup et la sélection du cours
  const handleCourseClick = (index: number) => {
    setSelectedCourseIndex(index);
  };

  // Fonction pour gérer l'ajout du lien vidéo au cours sélectionné
  const handleAddVideoLink = () => {
    if (selectedCourseIndex !== null && videoLink.trim() !== "") {
      const updatedCoursData = [...coursData];
      const courseToUpdate = updatedCoursData[selectedCourseIndex];
      if (!courseToUpdate.videos) {
        courseToUpdate.videos = [];
      }
      courseToUpdate.videos.push(videoLink);
      setCoursData(updatedCoursData);
      // Réinitialiser les états
      setSelectedCourseIndex(null);
      setVideoLink("");
    }
  };

  return (
    <div className="flex flex-wrap justify-center items-center">
      {coursData.length > 0 ? (
        coursData.map((cours, index) => (
          <div key={index} onClick={() => handleCourseClick(index)}>
            <CardcoursEleve
              titre={cours.titre}
              description={cours.description}
              image={cours.image}
              prix={cours.prix}
              date={cours.date}
              heure={cours.heure}
              duree={cours.duree}
              videos={cours.videos || []} // Passer une liste vide si les vidéos n'existent pas
            />
          </div>
        ))
      ) : (
        <p className="text-center font-bold">
          Aucun cours disponible pour le moment.
        </p>
      )}

      {/* Popup pour ajouter un lien vidéo */}
      {selectedCourseIndex !== null && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <input
              type="text"
              placeholder="Ajouter un lien vidéo"
              className="w-full border-gray-300 rounded-md p-2 mb-2"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
              onClick={handleAddVideoLink}
            >
              Ajouter
            </button>
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              onClick={() => setSelectedCourseIndex(null)}
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MesCours;
