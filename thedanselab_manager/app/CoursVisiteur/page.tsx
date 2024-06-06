"use client";
import React, { useEffect, useState } from "react";
import CardCoursVisiteur from "@/components/CardCoursVisiteur";

const CoursVisiteur: React.FC = () => {
  const [coursData, setCoursData] = useState([]);

  useEffect(() => {
    const fetchCoursData = async () => {
      try {
        const response = await fetch("/api/cours");
        const data = await response.json();
        setCoursData(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données des cours:", error);
      }
    };

    fetchCoursData();
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-center">
      {coursData.map((cours, index) => (
        <CardCoursVisiteur
          key={index}
          titre={cours.titre}
          description={cours.description}
          image={cours.image}
          prix={cours.prix}
          dateDebut={cours.dateDebut}
          duree={cours.duree}
        />
      ))}
    </div>
  );
};

export default CoursVisiteur;
