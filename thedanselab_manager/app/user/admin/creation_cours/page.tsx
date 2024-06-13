"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProfesseurInput from "@/components/professeurInput";
import TypeDeCoursInput from "@/components/TypeDeCoursInput";
import TitleInput from "@/components/TiltleInput";
import DescriptionInput from "@/components/DescriptionInput";
import DateInput from "@/components/dateInput"; // Marquez le composant parent avec "use client"
import DurationInput from "@/components/DurationInput";
import PriceInput from "@/components/PriceInput";
import LinkListInput from "@/components/linkListInput";

const CreateCours: React.FC = () => {
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password || !name || !firstName) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setError("");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full space-y-4">
      <h1>Creation Cours</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <TitleInput />
        <DescriptionInput />
        <ProfesseurInput />
        <TypeDeCoursInput />
        <PriceInput />
        <DateInput /> {/* Ici */}
        <DurationInput />
        <LinkListInput />
      </form>
    </div>
  );
};

export default CreateCours;
