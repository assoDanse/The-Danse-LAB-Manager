"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProfesseurInput from "@/components/professeurInput";
import TypeDeCoursInput from "@/components/TypeDeCoursInput";
import TitleInput from "@/components/TiltleInput";
import DescriptionInput from "@/components/DescriptionInput";
import DateInput from "@/components/dateInput";
import DurationInput from "@/components/DurationInput";
import PriceInput from "@/components/PriceInput";
import LinkListInput from "@/components/linkListInput";
import ValidationButton from "@/components/ValidationButton";

const CreateCours: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [professor, setProfessor] = useState("");
  const [courseType, setCourseType] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [linkList, setLinkList] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // Pour afficher les messages de succès
  const router = useRouter();

  const validatePrice = (price: string) => {
    return !isNaN(parseFloat(price)) && isFinite(parseFloat(price));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !professor ||
      !courseType ||
      !price ||
      !date ||
      !duration
    ) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (!validatePrice(price)) {
      setError("Prix invalide");
      return;
    }

    setError("");
    setMessage("");

    try {
      // Logique pour soumettre les données du cours à la base de données (Firebase ou autre)

      setMessage("Cours créé avec succès !");
      setTitle("");
      setDescription("");
      setProfessor("");
      setCourseType("");
      setPrice("");
      setDate("");
      setDuration("");
      setLinkList([]);
    } catch (error: any) {
      setError(`Erreur lors de la création du cours: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="max-w-sm w-full p-8 bg-white rounded-lg shadow-md my-2">
        <h1 className="text-center text-2xl mb-6">Créer un cours</h1>
        <form onSubmit={handleSubmit} className=" flex flex-col gap-5">
          <TitleInput title={title} setTitle={setTitle} />
          <DescriptionInput
            description={description}
            setDescription={setDescription}
          />
          <ProfesseurInput professor={professor} setProfessor={setProfessor} />
          <TypeDeCoursInput
            courseType={courseType}
            setCourseType={setCourseType}
          />
          <PriceInput price={price} setPrice={setPrice} />
          <DateInput date={date} setDate={setDate} />
          <DurationInput duration={duration} setDuration={setDuration} />
          <LinkListInput linkList={linkList} setLinkList={setLinkList} />
          {error && <p className="text-red-500">{error}</p>}
          {message && <p className="text-green-500">{message}</p>}
          <ValidationButton text="Créer le cours" />
        </form>
      </div>
    </div>
  );
};

export default CreateCours;
