"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/config/firebase-config"; // Assurez-vous que cette importation est correcte
import { onAuthStateChanged } from "firebase/auth";
import { query, where, collection, getDocs } from "firebase/firestore";

const PanelEleve: React.FC = () => {
  // État local pour stocker le nombre de places restantes
  const [placeRestante, setPlaceRestante] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPlaceRestante = async (userId: string) => {
      const carteQuery = query(collection(db, "cartes"), where("id_users", "==", userId));
      const querySnapshot = await getDocs(carteQuery);
      if (!querySnapshot.empty) {
        const carteData = querySnapshot.docs[0].data();
        setPlaceRestante(carteData.places_restantes);
      } else {
        console.error("Aucune carte trouvée pour cet utilisateur");
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchPlaceRestante(user.uid);
      } else {
        router.push("/auth/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="flex h-screen">
      <div className="flex flex-col items-center justify-center w-full p-4">
        <p className="text-gray-600">Crédits disponibles : {placeRestante !== null ? placeRestante : "Chargement..."}</p>
      </div>
    </div>
  );
};

export default PanelEleve;
