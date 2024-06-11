"use client";
import React, { useEffect, useState } from "react";
import { auth, db } from "@/config/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

interface Cours {
  id: string;
  titre: string;
  description: string;
  type: string;
  date_heure_debut: Date;
  duree: {
    heures: number;
    minutes: number;
  };
}

const CoursProfesseur: React.FC = () => {
  const [cours, setCours] = useState<Cours[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCours = async () => {
      setLoading(true);
      setError(null);

      try {
        const user = auth.currentUser;
        if (user) {
          const coursQuery = query(
            collection(db, "cours"),
            where("id_professeur", "==", user.uid)
          );
          const querySnapshot = await getDocs(coursQuery);
          const coursList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            date_heure_debut: doc.data().date_heure_debut.toDate(),
          })) as Cours[];
          setCours(coursList);
        } else {
          setError("Utilisateur non connecté");
        }
      } catch (err) {
        setError("Erreur lors de la récupération des cours");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchCours();
      } else {
        setError("Utilisateur non connecté");
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center w-full">Chargement...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center w-full">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-2xl mb-4">Mes Cours</h1>
      {cours.length > 0 ? (
        <ul className="w-full max-w-md">
          {cours.map((cours) => (
            <li key={cours.id} className="border p-4 mb-2 rounded-lg">
              <h2 className="text-xl font-bold">{cours.titre}</h2>
              <p>Type: {cours.type}</p>
              <p>Description: {cours.description}</p>
              <p>Date: {cours.date_heure_debut.toLocaleString()}</p>
              <p>Durée: {cours.duree.heures}h {cours.duree.minutes}m</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">Aucun cours trouvé</p>
      )}
    </div>
  );
};

export default CoursProfesseur;
