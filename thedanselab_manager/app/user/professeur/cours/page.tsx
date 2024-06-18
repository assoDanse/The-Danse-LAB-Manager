"use client";
import React, { useEffect, useState } from "react";
import { auth, db, storage } from "@/config/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  Timestamp,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

interface Cours {
  id: string;
  titre: string;
  description: string;
  type: string;
  nom_professeur: string;
  date_heure_debut: string;
  duree: {
    heures: number;
    minutes: number;
  };
  photo: string;
}

const CoursProfesseur: React.FC = () => {
  const [cours, setCours] = useState<Cours[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [viewingCours, setViewingCours] = useState<Cours | null>(null);

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
          const coursSnapshot = await getDocs(collection(db, "cours"));
          const allCours = coursSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            date_heure_debut: (doc.data().date_heure_debut as Timestamp)
              .toDate()
              .toLocaleString(),
          })) as Cours[];

          setCours(allCours);
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

  const handleViewClick = (cours: Cours) => {
    setViewingCours(cours);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full">
        Chargement...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center w-full">{error}</div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full p-3">
      <h1 className="text-2xl m-4 font-bold">Tous les Cours</h1>
      {cours.length > 0 ? (
        <ul className="md:grid md:grid-cols-2 md:gap-4 w-full max-w-3xl mx-auto text-center">
          {cours.map((cours) => (
            <li
              key={cours.id}
              className="bg-c0 border border-c4 p-4 mb-2 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-bold">{cours.titre}</h2>
              <p>Type: {cours.type}</p>
              <p>Date: {cours.date_heure_debut}</p>
              <p>
                Durée: {cours.duree.heures}h {cours.duree.minutes}m
              </p>
              <p>Professeur: {cours.nom_professeur}</p>
              <button
                onClick={() => handleViewClick(cours)}
                className="bg-c8 text-white p-2 rounded mt-2 mr-2"
              >
                Visualiser
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">Aucun cours disponible</p>
      )}

      {viewingCours && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center overflow-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-full overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{viewingCours.titre}</h2>
            {viewingCours.photo && (
              <img
                src={viewingCours.photo}
                alt={viewingCours.titre}
                className="mb-4 w-full"
              />
            )}
            <p className="mb-4">{viewingCours.description}</p>
            <p>
              <strong>Type:</strong> {viewingCours.type}
            </p>
            <p>
              <strong>Date:</strong> {viewingCours.date_heure_debut}
            </p>
            <p>
              <strong>Durée:</strong> {viewingCours.duree.heures}h{" "}
              {viewingCours.duree.minutes}m
            </p>
            <p>
              <strong>Professeur:</strong> {viewingCours.nom_professeur}
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setViewingCours(null)}
                className="bg-c8 text-white p-2 rounded"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

{
  /* <div className="flex flex-wrap justify-center items-center">
      {coursData.length > 0 ? (
        coursData.map((cours, index) => (
          <div key={index}>
            <div onClick={() => handleOpenPopup(index)}>
              <CardCoursProf
                titre={cours.titre}
                description={cours.description}
                image={cours.image}
                date={cours.date}
                heure={cours.heure}
                duree={cours.duree}
                eleves={cours.eleves || []} // Passer une liste vide si les élèves n'existent pas
                liens={cours.liens || []} // Passer une liste vide si les liens n'existent pas
              />
            </div>
            <button onClick={() => handleDeleteCours(index)}>
              Supprimer le cours
            </button>
          </div>
        ))
      ) : (
        <p className="text-center font-bold">
          Aucun cours disponible pour le moment.
        </p> */
}
export default CoursProfesseur;
