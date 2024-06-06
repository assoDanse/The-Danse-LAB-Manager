"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import EmailInput from "@/components/EmailInput";
import PasswordInput from "@/components/PasswordInput";
import ValidationButton from "@/components/ValidationButton";
import bcrypt from "bcryptjs";

const LoginForm: React.FC = () => {
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

    try {
      // Vérification des informations de connexion
      const { data: user, error: supabaseError } = await supabase
        .from("utilisateur")
        .select("id_utilisateur, email, mot_de_passe, role")
        .eq("email", email)
        .single();

      if (supabaseError || !user) {
        setError("Email ou mot de passe incorrect.");
        return;
      }

      // Vérification du mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.mot_de_passe);

      if (!isPasswordValid) {
        setError("Email ou mot de passe incorrect.");
        return;
      }

      // Connexion réussie
      setMessage("Connexion réussie !");

      // Rediriger vers la page appropriée en fonction du rôle
      switch (user.role) {
        case "admin":
          router.push("/admin/home");
          break;
        case "professeur":
          router.push("/professeur/home");
          break;
        case "eleve":
          router.push("/Home");
          break;
        default:
          setError("Rôle inconnu.");
          return;
      }
    } catch (error) {
      setError(`Erreur lors de la connexion: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="max-w-sm w-full p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-center text-2xl mb-6">Connexion</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <EmailInput email={email} setEmail={setEmail} />
          <PasswordInput password={password} setPassword={setPassword} />
          {error && <p className="text-red-500">{error}</p>}
          {message && <p className="text-green-500">{message}</p>}
          <ValidationButton text="Se connecter" />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
