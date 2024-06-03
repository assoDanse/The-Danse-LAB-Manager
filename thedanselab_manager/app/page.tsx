"use client";
import React, { useState } from "react";
import SidebarProfesseur from "@/components/SidebarProfesseur"; // Modifier le chemin d'importation si nécessaire

const Home: React.FC = () => {
  return (
    <div className="flex">
      <SidebarProfesseur /> {/* La sidebar va être placée à gauche */}
      <div className="flex justify-center items-center flex-1">
        <h1>Contenu principal</h1>
      </div>
    </div>
  );
};

export default Home;
