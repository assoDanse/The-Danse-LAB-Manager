"use client";
import React, { useEffect, useState } from "react";
import CardTarifVisiteur from "@/components/CardTarifVisiteur";

const tarifs: React.FC = () => {
  const [tarifData, setTarifData] = useState([]);

  useEffect(() => {
    const fetchTarifData = async () => {
      try {
        const response = await fetch("/api/tarifs");
        const data = await response.json();
        setTarifData(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données des tarifs:", error);
      }
    };

    fetchTarifData();
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-center">
      {tarifData.length > 0 ? (
        tarifData.map((tarif, index) => (
          <CardTarifVisiteur
            key={index}
            titre={tarif.titre}
            description={tarif.description}
            image={tarif.image}
            prix={tarif.prix}
          />
        ))
      ) : (
        <p style={{ textAlign: "center", fontWeight: "bold" }}>
          Aucun tarif disponible pour le moment.
        </p>
      )}
    </div>
  );
};

export default tarifs;
