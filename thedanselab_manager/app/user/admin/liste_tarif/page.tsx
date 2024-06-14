"use client"
import React, { useEffect, useState } from "react";
import TableSkeleton from "@/components/TableSkeleton/intex";

interface Tarif {
  id: string;
  titre: string;
  description: string;
  nombreCredit: number;
  prix: number;
}

const ListeTarifPage: React.FC = () => {
  const [tarifs, setTarifs] = useState<Tarif[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTarifs = async () => {
      const response = await fetch("/api/tarifs");
      const data = await response.json();
      setTarifs(data);
      setLoading(false);
    };

    fetchTarifs();
  }, []);

  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <div className="flex justify-center items-center w-full p-8">
      <div className="max-w-5xl w-full">
        <h1 className="text-2xl font-bold mb-6">Liste des Tarifs</h1>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Titre</th>
              <th className="py-2">Description</th>
              <th className="py-2">Nombre de crédit</th>
              <th className="py-2">Prix</th>
            </tr>
          </thead>
          <tbody>
            {tarifs.map((tarif) => (
              <tr key={tarif.id}>
                <td className="py-2 px-4">{tarif.titre}</td>
                <td className="py-2 px-4">{tarif.description}</td>
                <td className="py-2 px-4">{tarif.nombreCredit}</td>
                <td className="py-2 px-4">{tarif.prix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListeTarifPage;
