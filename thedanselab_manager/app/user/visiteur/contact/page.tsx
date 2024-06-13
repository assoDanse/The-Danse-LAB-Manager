"use client";

import React, { useState } from "react";
import EmailInput from "@/components/EmailInput";
import DescriptionInput from "@/components/DescriptionInput";

const Contact: React.FC = () => {
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Traitement du formulaire ici, comme envoyer les données à un serveur
    setMessage("Votre message a été envoyé avec succès !");
    // Réinitialiser les champs après l'envoi
    setEmail("");
    setDescription("");
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="w-full max-w-md p-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Contactez-nous</h2>
        <form onSubmit={handleSubmit}>
<<<<<<< Updated upstream
          <div className="mb-4">
            <EmailInput email={email} setEmail={setEmail} />
          </div>
          <div className="mb-4">
            <DescriptionInput description={description} setDescription={setDescription} />
          </div>
=======
          <EmailInput email={email} setEmail={setEmail} />
          <DescriptionInput description={description} setDescription={setDescription} />
>>>>>>> Stashed changes
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded mt-4"
          >
            Envoyer
          </button>
        </form>
<<<<<<< Updated upstream
        {message && <p className="mt-4 text-green-500">{message}</p>}
=======
       
>>>>>>> Stashed changes
      </div>
    </div>
  );
};

export default Contact;
