"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NameInput from "@/components/NameInput";
import EmailInput from "@/components/EmailInput";
import PasswordInput from "@/components/PasswordInput";
import ValidationButton from "@/components/ValidationButton";
import FirstNameInput from "@/components/FirstNameInput";
import { auth } from "@/config/firebase-config";
import { httpsCallable } from "firebase/functions";
import { getFunctions } from "firebase/functions";

const CreateEleve: React.FC = () => {
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const functions = getFunctions();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    const re = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    return re.test(password  );
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
    const createStudent = httpsCallable<{ email: string; password: string; name: string; firstName: string }, { email: string }>(functions, 'createStudent');
    const result = await createStudent({ email, password, name, firstName });

    setMessage(`Utilisateur créé : ${result.data.email}`);
    setName("");
    setFirstName("");
    setEmail("");
    setPassword("");
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      setError("Cet utilisateur existe déjà");
    } else {
      setError(`Erreur lors de la création de l'utilisateur: ${error.message}`);
    }
  }
};


  return (
    <div className="flex justify-center items-center w-full">
      <div className="max-w-sm w-full p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-center text-2xl mb-6">Créer un compte élève</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <NameInput name={name} setName={setName} />
          <FirstNameInput FirstName={firstName} setFirstName={setFirstName} />
          <EmailInput email={email} setEmail={setEmail} />
          <PasswordInput password={password} setPassword={setPassword} />
          {error && <p className="text-red-500">{error}</p>}
          {message && <p className="text-green-500">{message}</p>}
          <ValidationButton text="Inscription élève" />
        </form>
      </div>
    </div>
  );
};

export default CreateEleve;
