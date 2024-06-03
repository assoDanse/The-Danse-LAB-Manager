"use client";
import React, { useState } from "react";
// import { supabase } from "../supabaseClient";
import EmailInput from "@/components/EmailInput";
import PasswordInput from "@/components/PasswordInput";
import ValidationButton from "@/components/ValidationButton";
import { useRouter } from "next/navigation";

const LogUserForm: React.FC = () => {
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

    // Vérifiez si l'utilisateur existe dans la base de données
    const { data: userData, error: userError } = await supabase
      .from("user")
      .select("id, email, password")
      .eq("email", email.toLowerCase());

    if (userError) {
      setError(
        "Une erreur s'est produite lors de la connexion. Veuillez réessayer."
      );
      return;
    }

    if (userData && userData.length > 0) {
      const user = userData[0];

      // Comparez le mot de passe entré avec le mot de passe stocké
      if (user.password === password) {
        // Mot de passe correct, récupérez le grade de l'utilisateur
        const { data: gradeData, error: gradeError } = await supabase
          .from("comporte")
          .select("id_utilisateur, id_1")
          .eq("id_utilisateur", user.id);

        if (gradeError) {
          setError(
            "Une erreur s'est produite lors de la récupération du grade. Veuillez réessayer."
          );
          return;
        }

        if (gradeData && gradeData.length > 0) {
          const grade = gradeData[0].id_1;

          // Redirigez l'utilisateur en fonction du grade
          switch (grade) {
            case 1:
              router.push("http://localhost:3000/admin");
              break;
            case 2:
              router.push("http://localhost:3000/manager");
              break;
            case 3:
              router.push("http://localhost:3000/user");
              break;
            default:
              setError(
                "Grade non reconnu. Veuillez contacter l'administrateur."
              );
              break;
          }
        } else {
          setError(
            "L'utilisateur n'a pas de grade attribué. Veuillez contacter l'administrateur."
          );
        }
      } else {
        // Mot de passe incorrect
        setError("Mot de passe incorrect. Veuillez réessayer.");
      }
    } else {
      // L'utilisateur n'existe pas, affichez un message d'erreur
      setError("Utilisateur non reconnu. Veuillez vérifier vos informations.");
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
          <ValidationButton text="se connecter" />
        </form>
      </div>
    </div>
  );
};

export default LogUserForm;
