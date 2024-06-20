"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NameInput from "@/components/NameInput";
import EmailInput from "@/components/EmailInput";
import PasswordInput from "@/components/PasswordInput";
import ValidationButton from "@/components/ValidationButton";
import FirstNameInput from "@/components/FirstNameInput";
import DialogueBoxInput from "@/components/DialogueBoxinput";
import { Label } from "flowbite-react";
import { auth, db, storage } from "@/config/firebase-config"; // Assurez-vous que cette importation est correcte
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CreateUserForm: React.FC = () => {
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+\@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    const re = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    return re.test(password);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !firstName || !email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Email invalide");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Le mot de passe doit contenir au moins 6 caractères, une majuscule et un chiffre"
      );
      return;
    }

    setError("");
    setMessage("");

    try {
      const admin = auth.currentUser; // Sauvegarder l'utilisateur admin actuel
      let adminEmail = "";
      let adminPassword = "";

      if (admin) {
        adminEmail = admin.email || "";
        const adminPasswordPrompt = prompt(
          "Veuillez entrer votre mot de passe pour continuer:"
        );
        if (adminPasswordPrompt) {
          adminPassword = adminPasswordPrompt;
        } else {
          setError("Mot de passe requis pour continuer");
          return;
        }
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Télécharger la photo de profil sur Firebase Storage
      const storageRef = ref(storage, `profile_pictures/${user.uid}`);
      await uploadBytes(storageRef, photo);
      const photoURL = await getDownloadURL(storageRef);

      // Ajouter les informations utilisateur à Firestore avec le statut "professeur"
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        firstName: firstName,
        email: email,
        status: "professeur",
        photoURL: photoURL,
        bio: bio,
      });

      setMessage(`Utilisateur créé : ${user.email}`);
      setName("");
      setFirstName("");
      setEmail("");
      setPassword("");
      setPhoto(null);
      setBio("");

      // Reconnecter l'administrateur
      if (admin && adminEmail && adminPassword) {
        await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
      }
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setError("Cet utilisateur existe déjà");
      } else {
        setError(
          `Erreur lors de la création de l'utilisateur: ${error.message}`
        );
      }
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full mx-auto">
      <div className="max-w-sm w-full p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-center text-2xl mb-6">Créer un Professeur</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <NameInput name={name} setName={setName} />
          <FirstNameInput firstName={firstName} setFirstName={setFirstName} />
          <EmailInput email={email} setEmail={setEmail} />
          <PasswordInput password={password} setPassword={setPassword} />
          <Label
            htmlFor="file-upload-helper-text"
            value="Photo"
            className="text-center"
          />
          <input
            type="file"
            id="file-upload-helper-text"
            accept="image/*"
            onChange={handlePhotoChange}
          />
          <DialogueBoxInput DialogueBox={bio} setDialogueBox={setBio} />
          {error && <p className="text-red-500">{error}</p>}
          {message && <p className="text-green-500">{message}</p>}
          <ValidationButton text="Créer un compte" />
        </form>
      </div>
    </div>
  );
};

export default CreateUserForm;
