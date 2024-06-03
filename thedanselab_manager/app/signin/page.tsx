"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NameInput from "@/components/NameInput";
import EmailInput from "@/components/EmailInput";
import PasswordInput from "@/components/PasswordInput";
import ValidationButton from "@/components/ValidationButton";
import FirstNameInput from "@/components/FirstNameInput";
import { createUser } from "@/app/lib/userService"; // Importation du service utilisateur

const CreateUserForm: React.FC = () => {
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // Pour afficher les messages de succès
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !firstName || !email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setError("");
    setMessage("");

    try {
      // Appel du service pour créer un utilisateur
      const response = await createUser({ name, firstName, email, password });
      
      if (response.error) {
        setError(`Erreur: ${response.error.message}`);
      } else {
        setMessage("Utilisateur ajouté avec succès !");
        setName("");
        setFirstName("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      setError(`Erreur lors de la création de l'utilisateur: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="max-w-sm w-full p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-center text-2xl mb-6">Créer un compte</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <NameInput name={name} setName={setName} />
          <FirstNameInput FirstName={firstName} setFirstName={setFirstName} />
          <EmailInput email={email} setEmail={setEmail} />
          <PasswordInput password={password} setPassword={setPassword} />
          {error && <p className="text-red-500">{error}</p>}
          {message && <p className="text-green-500">{message}</p>}
          <ValidationButton text="Créer un compte" />
        </form>
      </div>
    </div>
  );
};

export default CreateUserForm;
