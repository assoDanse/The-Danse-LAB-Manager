"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NameInput from "@/components/NameInput";
import EmailInput from "@/components/EmailInput";
import PasswordInput from "@/components/PasswordInput";
import ValidationButton from "@/components/ValidationButton";
import FirstNameInput from "@/components/FirstNameInput";
import DialogueBoxInput from "@/components/DialogueBoxinput";
import { FileInput, Label } from "flowbite-react";


const CreateUserForm: React.FC = () => {
  const FirstName = "FirstName";
  const Email = "Email";
  const [error, setError] = useState("");
  const router = useRouter();
  const DialogueBox = "DialogueBox";
  const Nom = "Nom";

  return (
    <div className="flex justify-center items-center h-screen w-full mx-auto">
      <div className="max-w-sm w-full p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-center text-2xl mb-6"><b>PROFIL</b></h1>
        <form className="flex flex-col gap-5">
          <p>{Nom}</p>
          <p>{FirstName}</p>
          <p>{Email}</p>
          <ValidationButton text="Modifier" />
        </form>
      </div>
    </div>
  );
};
export default CreateUserForm;
