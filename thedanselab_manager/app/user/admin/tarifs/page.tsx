"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase-config";
import SidebarAdmin from "@/components/SidebarAdmin";
import { useRouter } from "next/navigation";

interface Tarif {
  id: string;
  titre: string;
  description: string;
  image: string;
  prix: number;
  credit: number;
}

const TarifsAdmin: React.FC = () => {
  const [tarifs, setTarifs] = useState<Tarif[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

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

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce tarif ?");
    if (confirmed) {
      try {
        await deleteDoc(doc(db, "tarifs", id));
        setTarifs(tarifs.filter((tarif) => tarif.id !== id));
        setMessage("Tarif supprimé avec succès");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      } catch (err) {
        console.error("Erreur lors de la suppression du tarif", err);
        setError("Erreur lors de la suppression du tarif");
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/user/admin/edit_admin`);
  };

  if (loading) {
    return <div className="flex justify-center items-center w-full">Chargement...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center w-full">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-2xl mb-4">Gestion des Tarifs</h1>
      {message && <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4">{message}</div>}
      {tarifs.length > 0 ? (
        <ul className="w-full max-w-3xl mx-auto">
          {tarifs.map((tarif) => (
            <li key={tarif.id} className="border p-4 mb-2 rounded-lg">
              <h2 className="text-xl font-bold">{tarif.titre}</h2>
              <img
                src={tarif.image}
                alt={tarif.titre}
                className="mb-4 w-full"
                style={{ width: "150px", height: "auto" }}
              />
              <p>{tarif.description}</p>
              <p>Prix: {tarif.prix} €</p>
              <p>Crédit: {tarif.credit}</p>
              <button
                onClick={() => handleEdit(tarif.id)}
                className="bg-blue-500 text-white p-2 rounded mt-2"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(tarif.id)}
                className="bg-red-500 text-white p-2 rounded mt-2 ml-2"
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
