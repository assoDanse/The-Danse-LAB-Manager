"use client";

import React, { useState } from "react";
import ProfesseurInput from "@/components/professeurInput";
import TypeDeCoursInput from "@/components/TypeDeCoursInput";
i

const Home: React.FC = () => {
  const [professeur, setProfesseur] = useState("");
  const [typeDeCours, setTypeDeCours] = useState("");

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full space-y-4">
      <ProfesseurInput professeur={professeur} setProfesseur={setProfesseur} />
      <TypeDeCoursInput typeDeCours={typeDeCours} setTypeDeCours={setTypeDeCours} />
    </div>
  );
};

export default Home;
