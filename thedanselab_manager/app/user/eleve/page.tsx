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
    <div className="flex ">
      <p className="text-gray-600">Crédits disponibles : {credits}</p>
    </div>
  );
};

export default PanelEleve;
