"use client";
import React, { useState } from "react";
import SidebarEleve from "@/components/SidebarEleve";

const PanelEleve: React.FC = () => {
  // État local pour stocker le nombre de crédits
  const [credits, setCredits] = useState<number>(0);

  // Fonction pour mettre à jour le nombre de crédits
  const updateCredits = (newCredits: number) => {
    setCredits(newCredits);
  };

  return (
    <div className="flex">
      <div className="flex-none">
        <SidebarEleve />
        <div className="flex justify-center items-center mt-4">
          <p className="text-gray-600">Crédits disponibles : {credits}</p>
        </div>
      </div>
      <div className="flex-grow"></div>
    </div>
  );
};

export default PanelEleve;
