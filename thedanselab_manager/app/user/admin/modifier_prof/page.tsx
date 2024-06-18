"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Label, Select } from "flowbite-react";
import NameInput from "@/components/NameInput";
import EmailInput from "@/components/EmailInput";
import PasswordInput from "@/components/PasswordInput";
import ValidationButton from "@/components/ValidationButton";
import FirstNameInput from "@/components/FirstNameInput";
import DialogueBoxInput from "@/components/DialogueBoxinput";
import { auth, db, storage } from "@/config/firebase-config";
import { doc, getDoc, updateDoc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateEmail, updatePassword, deleteUser } from "firebase/auth";

const modifier_prof: React.FC = () => {
  const [professors, setProfessors] = useState<any[]>([]);
  const [selectedProfessorId, setSelectedProfessorId] = useState("");
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const professorList = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((prof) => prof.status === "professor");
        setProfessors(professorList);
      } catch (error) {
        console.error("Erreur lors de la récupération des professeurs:", error);
      }
    };

    fetchProfessors();
  }, []);

  useEffect(() => {
    const selectedProfessor = professors.find((prof) => prof.id === selectedProfessorId);
    if (selectedProfessor) {
      setName(selectedProfessor.name);
      setFirstName(selectedProfessor.firstName);
      setEmail(selectedProfessor.email);
      setBio(selectedProfessor.bio);
    }
  }, [selectedProfessorId, professors]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !firstName || !email) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setError("");
    setMessage("");

    try {
      const updates: any = {
        name: name,
        firstName: firstName,
        email: email,
        bio: bio,
      };

      if (photo) {
        const storageRef = ref(storage, `profile_pictures/${selectedProfessorId}`);
        await uploadBytes(storageRef, photo);
        const photoURL = await getDownloadURL(storageRef);
        updates.photoURL = photoURL;
      }

      const docRef = doc(db, "users", selectedProfessorId);
      await updateDoc(docRef, updates);

      const user = auth.currentUser;

      if (user) {
        if (email !== user.email) {
          await updateEmail(user, email);
        }
        if (password) {
          await updatePassword(user, password);
        }
      }

      setMessage(`Informations mises à jour pour ${email}`);
    } catch (error: any) {
      setError(`Erreur lors de la mise à jour des informations: ${error.message}`);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleDelete = async () => {
    if (!selectedProfessorId) {
      setError("Veuillez sélectionner un professeur à supprimer.");
      return;
    }

    setError("");
    setMessage("");

    try {
      // Supprimer l'utilisateur de Firestore
      const docRef = doc(db, "users", selectedProfessorId);
      await deleteDoc(docRef);

      // Supprimer l'utilisateur de Firebase Authentication
      const user = auth.currentUser;
      if (user) {
        await deleteUser(user);
      }

      // Mettre à jour l'état pour retirer le professeur supprimé de la liste
      setProfessors(professors.filter((prof) => prof.id !== selectedProfessorId));
      setSelectedProfessorId("");
      setName("");
      setFirstName("");
      setEmail("");
      setPassword("");
      setPhoto(null);
      setBio("");

      setMessage("Professeur supprimé avec succès.");
    } catch (error: any) {
      setError(`Erreur lors de la suppression du professeur: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-center text-2xl mb-6">Modifier un Professeur</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <Label htmlFor="professor-select" value="Sélectionnez un professeur" />
            <Select
              id="professor-select"
              required
              value={selectedProfessorId}
              onChange={(e) => setSelectedProfessorId(e.target.value)}
            >
              <option value="">Sélectionner un professeur</option>
              {professors.map((prof) => (
                <option key={prof.id} value={prof.id}>
                  {prof.firstName} {prof.name}
                </option>
              ))}
            </Select>
          </div>
          <NameInput name={name} setName={setName} />
          <FirstNameInput FirstName={firstName} setFirstName={setFirstName} />
          <EmailInput email={email} setEmail={setEmail} />
          <PasswordInput password={password} setPassword={setPassword} /> {/* Facultatif */}
          <Label htmlFor="file-upload-helper-text" value="Photo" className="text-center" />
          <input type="file" id="file-upload-helper-text" accept="image/*" onChange={handlePhotoChange} />
          <DialogueBoxInput DialogueBox={bio} setDialogueBox={setBio} />
          {error && <p className="text-red-500">{error}</p>}
          {message && <p className="text-green-500">{message}</p>}
          <ValidationButton text="Mettre à jour" />
          <button type="button" className="mt-2 bg-red-500 text-white p-2 rounded-lg" onClick={handleDelete}>
            Supprimer professeur
          </button>
        </form>
      </div>
    </div>
  );
};

export default modifier_prof;
