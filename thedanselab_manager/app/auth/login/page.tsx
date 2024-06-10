"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import EmailInput from "@/components/EmailInput";
import PasswordInput from "@/components/PasswordInput";
import ValidationButton from "@/components/ValidationButton";
import { auth } from "@/config/firebase-config"; // Assurez-vous que cette importation est correcte
import { signInWithEmailAndPassword } from "firebase/auth";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // Pour afficher les messages de succès
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setError("");
    setMessage("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setMessage(`Connecté en tant que : ${user.email}`);
      // Redirigez vers la page d'accueil après la connexion
      router.push("/eleve");
    } catch (error: any) {
      setError(`Erreur de connexion: ${error.message}`);
      console.error(error.code, error.message);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="max-w-sm w-full p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-center text-2xl mb-6">Connexion</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <EmailInput email={email} setEmail={setEmail} />
          <PasswordInput password={password} setPassword={setPassword} />
          {error && <p className="text-red-500">{error}</p>}
          {message && <p className="text-green-500">{message}</p>}
          <ValidationButton text="Se connecter" />
          <div className="flex justify-around">
            <a
              className="text-sm text-blue-500 underline text-center"
              href="/auth/signin"
            >
              Créer un compte
            </a>
            <a
              className="text-sm text-blue-500 underline text-center"
              href="/auth/recup"
            >
              Mot de passe oublié
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
