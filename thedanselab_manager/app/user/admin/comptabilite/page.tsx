"use client"
import React, { useState } from 'react';
import DateRangeInput from '@/components/DateRangeInput';
import formatDate from '@/components/formatDate';
import exportToExcel from '@/components/exportToExcel';

interface Transaction {
  id: string;
  title: string;
  date: string;
  description: string;
  amount: number;
  professor: string;
  course: string;
}

const ComptabilitePage: React.FC = () => {
  // Données fictives pour les tests
  const initialTransactions: Transaction[] = [
    { id: '1', title: 'Cours de danse', date: '2024-06-01T10:00:00', description: 'Cours de danse pour enfants', amount: 50, professor: 'Prof A', course: 'Danse' },
    { id: '2', title: 'Cours de yoga', date: '2024-06-05T14:00:00', description: 'Cours de yoga pour adultes', amount: 75, professor: 'Prof B', course: 'Yoga' },
    { id: '3', title: 'Cours de peinture', date: '2024-06-10T16:00:00', description: 'Cours de peinture pour adolescents', amount: 60, professor: 'Prof A', course: 'Peinture' },
    { id: '4', title: 'electrecité', date: '2024-06-10T16:00:00', description: 'cout electrecité', amount: -60, professor: '', course: 'autre' },
  ];

  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [groupBy, setGroupBy] = useState<string>('');

  const [newTransaction, setNewTransaction] = useState<Transaction>({
    id: '',
    title: '',
    date: '',
    description: '',
    amount: 0,
    professor: '',
    course: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleAddTransaction = () => {
    if (!newTransaction.title || !newTransaction.date || newTransaction.amount === 0 || isNaN(newTransaction.amount)) {
      alert("Veuillez remplir tous les champs obligatoires et assurez-vous que le montant est un nombre valide.");
      return;
    }

    const transactionAmount = parseFloat(newTransaction.amount.toString());
    const updatedTransactions = [...transactions, { ...newTransaction, id: (transactions.length + 1).toString(), amount: transactionAmount }];
    setTransactions(updatedTransactions);
    setNewTransaction({ id: '', title: '', date: '', description: '', amount: 0, professor: '', course: '' });
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date).getTime();
    const start = startDate ? new Date(startDate).getTime() : -Infinity;
    const end = endDate ? new Date(endDate).getTime() : Infinity;
    return transactionDate >= start && transactionDate <= end;
  });

  const groupedTransactions = groupBy
    ? filteredTransactions.reduce((acc, transaction) => {
        const key = transaction[groupBy as keyof Transaction];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(transaction);
        return acc;
      }, {} as { [key: string]: Transaction[] })
    : { 'Toutes les transactions': filteredTransactions };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Page de comptabilité</h1>
      <DateRangeInput
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <div className="my-4">
        <label htmlFor="groupBy" className="block text-sm font-medium text-gray-700">
          Grouper par
        </label>
        <select
          id="groupBy"
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Aucun</option>
          <option value="professor">Professeur</option>
          <option value="course">Cours</option>
        </select>
      </div>

      <button
        onClick={() => exportToExcel(filteredTransactions, 'transactions.xlsx')}
        className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Exporter en Excel
      </button>
      {Object.keys(groupedTransactions).map((group) => (
        <div key={group} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{group}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Titre</th>
                  <th className="py-2 px-4 border-b">Date</th>
                  <th className="py-2 px-4 border-b">Description</th>
                  <th className="py-2 px-4 border-b">Montant (€)</th>
                </tr>
              </thead>
              <tbody>
                {groupedTransactions[group].map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="py-2 px-4 border-b">{transaction.title}</td>
                    <td className="py-2 px-4 border-b">{formatDate(transaction.date)}</td>
                    <td className="py-2 px-4 border-b">{transaction.description}</td>
                    <td className={`py-2 px-4 border-b text-right ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>{transaction.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}


    </div>
  );
};

export default ComptabilitePage;
