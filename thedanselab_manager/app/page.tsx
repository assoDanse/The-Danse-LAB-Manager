"use client";

import React, { useState } from "react";
import ProfesseurInput from "@/components/professeurInput";
import TypeDeCoursInput from "@/components/TypeDeCoursInput";
import TitleInput from "@/components/TiltleInput";
import DescriptionInput from "@/components/DescriptionInput";
import DateInput from "@/components/dateInput";
import DurationInput from "@/components/DurationInput";
import PriceInput from "@/components/PriceInput";


const Home: React.FC = () => {
  const [professeur, setProfesseur] = useState("");
  const [typeDeCours, setTypeDeCours] = useState("");

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full space-y-4">
      <TitleInput/>
      <DescriptionInput/>
      <ProfesseurInput professeur={professeur} setProfesseur={setProfesseur} />
      <TypeDeCoursInput typeDeCours={typeDeCours} setTypeDeCours={setTypeDeCours} />
      <PriceInput/>
      <DateInput/>
      <DurationInput/>
    </div>
  );
};

export default Home;
