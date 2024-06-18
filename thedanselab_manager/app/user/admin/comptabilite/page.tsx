"use client";


import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase-config';

const ComptabilitePage: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'transactions'));
        const transactionList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTransactions(transactionList);
      } catch (error) {
        console.error('Erreur lors de la récupération des transactions:', error);
        setError(
          'Erreur lors de la récupération des données. Veuillez réessayer plus tard.'
        );
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Page de comptabilité</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold">{transaction.title}</h2>
            <p className="text-gray-600 mb-2">{transaction.date}</p>
            <p>{transaction.description}</p>
            <p className="mt-2 text-lg font-bold">{transaction.amount} €</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComptabilitePage;