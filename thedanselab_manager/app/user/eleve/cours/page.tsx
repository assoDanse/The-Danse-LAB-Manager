"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/config/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, doc, getDoc, Timestamp } from "firebase/firestore";

interface Cours {
  id: string;
  titre: string;
  type: string;
  date_heure_debut: string;
  duree: {
    heures: number;
    minutes: number;
  };
}

const CoursEleve: React.FC = () => {
  const [cours, setCours] = useState<Cours[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCours = async () => {
      setLoading(true);
      setError(null);

      try {
        const user = auth.currentUser;
        if (user) {
          const participationQuery = query(
            collection(db, "participation"),
            where("id_users", "==", user.uid)
          );
          const participationSnapshot = await getDocs(participationQuery);
          const coursPromises = participationSnapshot.docs.map(async (docSnapshot) => {
            const participationData = docSnapshot.data();
            const coursRef = doc(db, "cours", participationData.id_cours);
            const coursDoc = await getDoc(coursRef);
            if (coursDoc.exists()) {
              const coursData = coursDoc.data();
              return {
                id: coursDoc.id,
                titre: coursData.titre,
                type: coursData.type,
                date_heure_debut: (coursData.date_heure_debut as Timestamp).toDate().toLocaleString(), // Convertir Timestamp en date lisible
                duree: {
                  heures: coursData.duree.heures,
                  minutes: coursData.duree.minutes
                },
              };
            } else {
              return null;
            }
          });

          const coursData = (await Promise.all(coursPromises)).filter(cours => cours !== null);
          setCours(coursData as Cours[]);
        } else {
          setError("User not logged in");
          router.push("/auth/login");
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
        setError("User not logged in");
        router.push("/auth/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <div className="flex justify-center items-center w-full">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center w-full">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-2xl mb-4">Mes Cours</h1>
      {cours.length > 0 ? (
        <ul className="w-full max-w-md">
          {cours.map((cours, index) => (
            <li key={index} className="border p-4 mb-2 rounded-lg">
              <h2 className="text-xl font-bold">{cours.titre}</h2>
              <p>Type: {cours.type}</p>
              <p>Date: {cours.date_heure_debut}</p>
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

export default CoursEleve;
