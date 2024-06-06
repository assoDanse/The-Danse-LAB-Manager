"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NameInput from "@/components/NameInput";
import EmailInput from "@/components/EmailInput";
import PasswordInput from "@/components/PasswordInput";
import ValidationButton from "@/components/ValidationButton";
import FirstNameInput from "@/components/FirstNameInput";

const CreateUserForm: React.FC = () => {
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setError("");
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="max-w-sm w-full p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-center text-2xl mb-6">Créer un compte</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <NameInput name={name} setName={setName} />
          <FirstNameInput FirstName={firstName} setFirstName={setFirstName} />
          <EmailInput email={email} setEmail={setEmail} />
          <PasswordInput password={password} setPassword={setPassword} />
          {error && <p className="text-red-500">{error}</p>}
          <ValidationButton text="Se connecter" />
        </form>
      </div>
    </div>
  );
};

export default CreateUserForm;
