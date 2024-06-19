"use client";

import React, { useState, useEffect } from 'react';
import DateRangeInput from '@/components/DateRangeInput';

interface Transaction {
  id: string;
  title: string;
  date: string;
  description: string;
  amount: number;
}

// Données fictives pour tester l'affichage
const localTransactions: Transaction[] = [
  {
    id: '1',
    title: 'Cours de danse',
    date: '2023-06-15T10:00',
    description: 'Paiement pour le cours de danse moderne.',
    amount: 50,
  },
  {
    id: '2',
    title: 'Location salle',
    date: '2023-06-16T12:00',
    description: 'Paiement pour la location de la salle de danse.',
    amount: 100,
  },
  {
    id: '3',
    title: 'Matériel',
    date: '2023-06-17T14:00',
    description: 'Achat de matériel pour le studio.',
    amount: 75,
  },
  {
    id: '4',
    title: 'Cours de yoga',
    date: '2023-06-18T16:00',
    description: 'Paiement pour le cours de yoga.',
    amount: 60,
  },
];

const ComptabilitePage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    // Utiliser les données locales pour tester l'affichage
    setTransactions(localTransactions);
  }, []);

  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date).getTime();
    const start = startDate ? new Date(startDate).getTime() : -Infinity;
    const end = endDate ? new Date(endDate).getTime() : Infinity;
    return transactionDate >= start && transactionDate <= end;
  });

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Page de comptabilité</h1>
      <DateRangeInput
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {filteredTransactions.map((transaction) => (
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
