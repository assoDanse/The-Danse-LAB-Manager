// components/RatesTable.tsx
"use client";
import React, { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase-config";
import TableSkeleton from "../TableSkeleton";

interface Rates {
  id: string;
  credit: number;
  description: string;
  image: string;
  lienPaiement: string;
  prix: number;
  titre: string;
}

const RatesTable: React.FC = () => {
  const [rates, setRates] = useState<Rates[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      setError(null);

      try {
        const q=query(collection(db, "tarifs"));
        const querySnapshot = await getDocs(q);
        const ratesList: Rates[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          credit: doc.data().credit,
          description: doc.data().description,
          image: doc.data().image,
          lienPaiement: doc.data().lienPaiement,
          prix: doc.data().prix,
          titre: doc.data().titre,
        }));
        setRates(ratesList);
      } catch (err) {
        setError("Erreur lors de la récupération des tarifs");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  if (loading) {
    return <TableSkeleton />;
  }

  if (error) {
    return <div className="flex justify-center items-center w-full">{error}</div>;
  }

  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b text-center">Titre</th>
          <th className="py-2 px-4 border-b text-center">Description</th>
          <th className="py-2 px-4 border-b text-center">Prix</th>
          <th className="py-2 px-4 border-b text-center">Lien de Paiement</th>
        </tr>
      </thead>
      <tbody>
        {rates.map((rate) => (
          <tr key={rate.id}>
            <td className="py-2 px-4 border-b text-center">{rate.titre}</td>
            <td className="py-2 px-4 border-b text-center">{rate.description}</td>
            <td className="py-2 px-4 border-b text-center">{rate.prix} €</td>
            <td className="py-2 px-4 border-b text-center">
              <a href={rate.lienPaiement} target="_blank" rel="noopener noreferrer">
                Payer
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RatesTable;
