"use client";
import React, { useEffect, useState } from "react";
import CardTarifVisiteur from "@/components/CardTarifVisiteur";

const Tarifs: React.FC = () => {
  const [tarifData, setTarifData] = useState([]);

  useEffect(() => {
    const fetchTarifData = async () => {
      try {
        const response = await fetch("/api/tarifs");
        const data = await response.json();
        setTarifData(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données des tarifs:",
          error
        );
      }
    };

    fetchTarifData();
  }, []);

  const handleTarifClick = (tarif: any) => {
    const userConfirmed = window.confirm(
      `Voulez-vous vraiment sélectionner ce tarif : ${tarif.titre} ?`
    );
    if (userConfirmed) {
      // Vous pouvez ajouter l'action à effectuer après la confirmation ici
      alert(`Vous avez confirmé le tarif : ${tarif.titre}`);
    } else {
      // Action à effectuer si l'utilisateur annule
      alert("La sélection du tarif a été annulée.");
    }
  };

  return (
    <div className="flex flex-wrap justify-center items-center">
      {tarifData.length > 0 ? (
        tarifData.map((tarif, index) => (
          <div key={index} onClick={() => handleTarifClick(tarif)}>
            <CardTarifVisiteur
              titre={tarif.titre}
              description={tarif.description}
              image={tarif.image}
              prix={tarif.prix}
              credits={tarif.credits} // Passer le nombre de crédits
            />
          </div>
        ))
      ) : (
        <p className="text-center font-bold">
          Aucun tarif disponible pour le moment.
        </p>
      )}
    </div>
  );
};

export default Tarifs;
