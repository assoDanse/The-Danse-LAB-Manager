"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Label, Select } from "flowbite-react";
import EmailInput from "@/components/EmailInput";
import PasswordInput from "@/components/PasswordInput";
import ValidationButton from "@/components/ValidationButton";
import { auth, db } from "@/config/firebase-config"; // Assurez-vous que cette importation est correcte
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { updateEmail, updatePassword, deleteUser } from "firebase/auth";

const modifier_eleve: React.FC = () => {
  const [eleves, setEleves] = useState<any[]>([]);
  const [selectedEleveId, setSelectedEleveId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Facultatif : seulement si vous changez le mot de passe
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // Pour afficher les messages de succès
  const router = useRouter();

  useEffect(() => {
    const fetchEleves = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const eleveList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })).filter(eleve => eleve.status === "eleve");
        setEleves(eleveList);
      } catch (error) {
        console.error("Erreur lors de la récupération des élèves:", error);
      }
    };

    fetchEleves();
  }, []);

  useEffect(() => {
    const selectedEleve = eleves.find(eleve => eleve.id === selectedEleveId);
    if (selectedEleve) {
      setEmail(selectedEleve.email);
      setPassword("");
    }
  }, [selectedEleveId, eleves]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setError("");
    setMessage("");

    try {
      const docRef = doc(db, "users", selectedEleveId);

      const updates: any = { email };
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

  const handleDelete = async () => {
    if (!selectedEleveId) {
      setError("Veuillez sélectionner un élève à supprimer.");
      return;
    }

    setError("");
    setMessage("");

    try {
      // Supprimer l'utilisateur de Firestore
      const docRef = doc(db, "users", selectedEleveId);
      await deleteDoc(docRef);

      // Supprimer l'utilisateur de Firebase Authentication
      const user = auth.currentUser;
      if (user) {
        await deleteUser(user);
      }

      // Mettre à jour l'état pour retirer l'élève supprimé de la liste
      setEleves(eleves.filter(eleve => eleve.id !== selectedEleveId));
      setSelectedEleveId("");
      setEmail("");
      setPassword("");

      setMessage("Élève supprimé avec succès.");
    } catch (error: any) {
      setError(`Erreur lors de la suppression de l'élève: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-center text-2xl mb-6">Modifier un compte élève</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <Label htmlFor="eleve-select" value="Sélectionnez un élève" />
            <Select
              id="eleve-select"
              required
              value={selectedEleveId}
              onChange={(e) => setSelectedEleveId(e.target.value)}
            >
              <option value="">Sélectionner un élève</option>
              {eleves.map((eleve) => (
                <option key={eleve.id} value={eleve.id}>
                  {eleve.firstName} {eleve.name}
                </option>
              ))}
            </Select>
          </div>
          <EmailInput email={email} setEmail={setEmail} />
          <PasswordInput password={password} setPassword={setPassword} /> {/* Facultatif */}
          {error && <p className="text-red-500">{error}</p>}
          {message && <p className="text-green-500">{message}</p>}
          <ValidationButton text="Mettre à jour" />
          <button
            type="button"
            className="mt-2 bg-red-500 text-white p-2 rounded-lg"
            onClick={handleDelete}
          >
            Supprimer élève
          </button>
        </form>
      </div>
    </div>
  );
};

export default modifier_eleve;
