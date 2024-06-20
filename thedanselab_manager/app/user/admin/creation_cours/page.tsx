"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProfesseurInput from "@/components/professeurInput";
import TypeDeCoursInput from "@/components/TypeDeCoursInput";
import TitleInput from "@/components/TitleInput";
import DescriptionInput from "@/components/DescriptionInput";
import DateInput from "@/components/dateInput";
import { Label } from "flowbite-react";
import DurationInput from "@/components/DurationInput";
import { db, storage } from "@/config/firebase-config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ValidationButton from "@/components/ValidationButton";

const CreateCours: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [professorId, setProfessorId] = useState("");
  const [professorName, setProfessorName] = useState("");
  const [courseType, setCourseType] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState({ hours: 0, minutes: 0 });
  const [periodicity, setPeriodicity] = useState<number>(1); // Ajout de la périodicité en nombre de semaines
  const [photo, setPhoto] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState("");
  const [isRecurrent, setIsRecurrent] = useState(false); // État pour gérer l'affichage de la périodicité
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
    if (duration.hours === 0 && duration.minutes === 0)
      formErrors.duration = "La durée est requise.";

    if (isRecurrent && periodicity < 1)
      formErrors.periodicity = "La périodicité doit être d'au moins 1 semaine.";

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
        periodicite: isRecurrent ? periodicity : 1, // Ajout de la périodicité au document de cours
      });

      setMessage("Cours créé avec succès");
      setTitle("");
      setDescription("");
      setProfessorId("");
      setProfessorName("");
      setCourseType("");
      setDate("");
      setDuration({ hours: 0, minutes: 0 });
      setPeriodicity(1); // Réinitialisation de la périodicité après création du cours
      setPhoto(null);
      setIsRecurrent(false); // Réinitialisation de la case à cocher
    } catch (error: any) {
      setErrors({
        general: `Erreur lors de la création du cours: ${error.message}`,
      });
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="max-w-sm w-full p-8 bg-white rounded-lg shadow-md my-2">
        <h1 className="text-center text-2xl mb-6">Créer un cours</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <TitleInput title={title} setTitle={setTitle} />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
          <DescriptionInput
            description={description}
            setDescription={setDescription}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
          <ProfesseurInput
            professorId={professorId}
            setProfessorId={setProfessorId}
            setProfessorName={setProfessorName}
          />
          {errors.professor && (
            <p className="text-red-500">{errors.professor}</p>
          )}
          <TypeDeCoursInput
            typeDeCours={courseType}
            setTypeDeCours={setCourseType}
          />
          {errors.courseType && (
            <p className="text-red-500">{errors.courseType}</p>
          )}
          <DateInput date={date} setDate={setDate} />
          {errors.date && <p className="text-red-500">{errors.date}</p>}
          <DurationInput duration={duration} setDuration={setDuration} />
          {errors.duration && <p className="text-red-500">{errors.duration}</p>}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="recurrent"
              checked={isRecurrent}
              onChange={(e) => setIsRecurrent(e.target.checked)}
              className="border-gray-300 rounded"
            />
            <label
              htmlFor="recurrent"
              className="text-sm font-medium text-gray-700"
            >
              Ajouter une récurrence
            </label>
          </div>
          {isRecurrent && (
            <div className="flex items-center gap-2">
              <label
                htmlFor="periodicity"
                className="text-sm font-medium text-gray-700"
              >
                Périodicité (en semaines)
              </label>
              <input
                type="number"
                id="periodicity"
                value={periodicity}
                onChange={(e) => setPeriodicity(parseInt(e.target.value))}
                className="border border-gray-300 rounded-md px-2 py-1"
                min={1}
                max={52}
                required
              />
              {errors.periodicity && (
                <p className="text-red-500">{errors.periodicity}</p>
              )}
            </div>
          )}

          <Label
            htmlFor="file-upload-helper-text"
            value="Photo"
            className="text-center"
          />
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={handlePhotoChange}
          />
          {errors.photo && <p className="text-red-500">{errors.photo}</p>}

          {errors.general && <p className="text-red-500">{errors.general}</p>}
          {message && <p className="text-green-500">{message}</p>}
          <ValidationButton text="Créer un cours" />
        </form>
      </div>
    </div>
  );
};

export default CreateCours;

{
  /* <div className="flex justify-center items-center w-full">
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
      </div> */
}
