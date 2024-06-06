"use client";

import React from "react";
import ProfesseurInput from "@/components/professeurInput";
import TypeDeCoursInput from "@/components/TypeDeCoursInput";
import TitleInput from "@/components/TiltleInput";
import DescriptionInput from "@/components/DescriptionInput";
import DateInput from "@/components/dateInput";
import DurationInput from "@/components/DurationInput";
import PriceInput from "@/components/PriceInput";
import LinkListInput from "@/components/linkListInput";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full space-y-4">
      <TitleInput />
      <DescriptionInput />
      <ProfesseurInput />
      <TypeDeCoursInput />
      <PriceInput />
      <DateInput />
      <DurationInput />
      <LinkListInput />
    </div>
  );
};

export default Home;
