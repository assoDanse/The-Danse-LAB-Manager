"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProfesseurInput from "@/components/ProfesseurInput";
import TypeDeCoursInput from "@/components/TypeDeCoursInput";
import TitleInput from "@/components/TitleInput";
import DescriptionInput from "@/components/DescriptionInput";
import DateInput from "@/components/DateInput";
import DurationInput from "@/components/DurationInput";
import { db, storage } from "@/config/firebase-config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CreateCours: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [professorId, setProfessorId] = useState("");
  const [professorName, setProfessorName] = useState("");
  const [courseType, setCourseType] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState({ hours: 0, minutes: 0 });
  const [photo, setPhoto] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formErrors: { [key: string]: string } = {};

    if (!title) formErrors.title = "Le titre est requis.";
    if (!description) formErrors.description = "La description est requise.";
    if (!professorId) formErrors.professor = "Le professeur est requis.";
    if (!courseType) formErrors.courseType = "Le type de cours est requis.";
    if (!date) formErrors.date = "La date et l'heure sont requises.";
    if (duration.hours === 0 && duration.minutes === 0) formErrors.duration = "La durée est requise.";
    if (!photo) formErrors.photo = "La photo est requise.";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    setMessage("");

    try {
      const dateTimestamp = Timestamp.fromDate(new Date(date));
      let photoURL = "";

      if (photo) {
        const photoRef = ref(storage, `photos/${photo.name}`);
        await uploadBytes(photoRef, photo);
        photoURL = await getDownloadURL(photoRef);
      }

      await addDoc(collection(db, "cours"), {
        titre: title,
        description: description,
        type: courseType,
        date_heure_debut: dateTimestamp,
        duree: {
          heures: duration.hours,
          minutes: duration.minutes,
        },
        nom_professeur: professorName,
        id_professeur: professorId,
        photo: photoURL,
      });

      setMessage("Cours créé avec succès");
      setTitle("");
      setDescription("");
      setProfessorId("");
      setProfessorName("");
      setCourseType("");
      setDate("");
      setDuration({ hours: 0, minutes: 0 });
      setPhoto(null);
    } catch (error: any) {
      setErrors({ general: `Erreur lors de la création du cours: ${error.message}` });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full mt-4 space-y-4">
      <h1 className="text-2xl mb-4">Création Cours</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <TitleInput title={title} setTitle={setTitle} />
        {errors.title && <p className="text-red-500">{errors.title}</p>}
        <DescriptionInput description={description} setDescription={setDescription} />
        {errors.description && <p className="text-red-500">{errors.description}</p>}
        <ProfesseurInput professorId={professorId} setProfessorId={setProfessorId} setProfessorName={setProfessorName} />
        {errors.professor && <p className="text-red-500">{errors.professor}</p>}
        <TypeDeCoursInput typeDeCours={courseType} setTypeDeCours={setCourseType} />
        {errors.courseType && <p className="text-red-500">{errors.courseType}</p>}
        <DateInput date={date} setDate={setDate} />
        {errors.date && <p className="text-red-500">{errors.date}</p>}
        <DurationInput duration={duration} setDuration={setDuration} />
        {errors.duration && <p className="text-red-500">{errors.duration}</p>}
        <div>
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
            Photo
          </label>
          <input type="file" id="photo" onChange={handlePhotoChange} />
          {errors.photo && <p className="text-red-500">{errors.photo}</p>}
        </div>
        {errors.general && <p className="text-red-500">{errors.general}</p>}
        {message && <p className="text-green-500">{message}</p>}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Créer un cours</button>
      </form>
    </div>
  );
};

export default CreateCours;
