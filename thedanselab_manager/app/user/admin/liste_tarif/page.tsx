"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase-config";

interface Tarif {
  id: string;
  titre: string;
  description: string;
  image: string;
  prix: number;
  credit: number;
  lienPaiement: string; // Ajoutez ce champ pour le lien de paiement
}

const TarifsAdmin: React.FC = () => {
  const [tarifs, setTarifs] = useState<Tarif[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTarifs = async () => {
      setLoading(true);
      setError(null);

      try {
        const querySnapshot = await getDocs(collection(db, "tarifs"));
        const tarifsList: Tarif[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Tarif[];
        setTarifs(tarifsList);
      } catch (err) {
        setError("Erreur lors de la récupération des tarifs");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTarifs();
  }, []);

  const handleRemove = (id: string) => {
    setTarifs((prevTarifs) => prevTarifs.filter((tarif) => tarif.id !== id));
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
      <h1 className="text-2xl m-4 font-bold">Tarifs</h1>
      {tarifs.length > 0 ? (
        <ul className="md:grid md:grid-cols-2 md:gap-4 w-full max-w-3xl mx-auto">
          {tarifs.map((tarif) => (
            <li
              key={tarif.id}
              className="bg-c0 border border-c4 p-4 mb-2 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-bold">{tarif.titre}</h2>
              <img
                src={tarif.image}
                alt={tarif.titre}
                className="mb-4"
                style={{ width: "150px", height: "auto" }}
              />
              <p>{tarif.description}</p>
              <p>Prix: {tarif.prix} €</p>
              <p>Crédit: {tarif.credit}</p>
              <button
                onClick={() => handleRemove(tarif.id)}
                className="bg-red-500 text-white p-2 rounded mt-2"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">Aucun tarif trouvé</p>
      )}
    </div>
  );
};

export default TarifsAdmin;
