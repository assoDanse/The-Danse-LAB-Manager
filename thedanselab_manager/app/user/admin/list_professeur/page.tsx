"use client"
import React from "react";
import ProfessorTable from "@/components/ProfessorTable";

const list_professeur: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full p-8">
      <div className="max-w-5xl w-full">
        <h1 className="text-2xl font-bold mb-6">Liste des Professeurs</h1>
        <ProfessorTable />
      </div>
    </div>
  );
};

export default list_professeur;
