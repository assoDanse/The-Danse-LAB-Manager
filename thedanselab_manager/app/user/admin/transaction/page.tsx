// Importations nécessaires
"use client"
import React, { useState } from 'react';
import DateRangeInput from '@/components/DateRangeInput'; // Assurez-vous que le chemin vers vos composants est correct
import formatDate from '@/components/formatDate';

// Interface pour définir la structure d'une transaction
interface Transaction {
  id: string;
  title: string;
  date: string;
  description: string;
  amount: number;
  professor: string;
  course: string;
}

const transactionPage: React.FC = () => {
  // État local pour gérer la nouvelle transaction
  const [newTransaction, setNewTransaction] = useState<Transaction>({
    id: '',
    title: '',
    date: '',
    description: '',
    amount: 0,
    professor: '',
    course: '',
  });

  // Gestionnaire de changement pour les champs du formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  // Gestionnaire pour ajouter une nouvelle transaction
  const handleAddTransaction = () => {
    if (!newTransaction.title || !newTransaction.date || newTransaction.amount === 0 || isNaN(newTransaction.amount)) {
      alert("Veuillez remplir tous les champs obligatoires et assurez-vous que le montant est un nombre valide.");
      return;
    }

    const transactionAmount = parseFloat(newTransaction.amount.toString());
    const transactionToAdd: Transaction = { ...newTransaction, id: Date.now().toString(), amount: transactionAmount };
    console.log('Transaction à ajouter :', transactionToAdd);

    // Ici, vous pourriez appeler une fonction ou envoyer cette transaction à un autre composant.
    // Par exemple, utiliser une fonction onAddTransaction(transactionToAdd);

    // Réinitialisation des champs après l'ajout de la transaction
    setNewTransaction({
      id: '',
      title: '',
      date: '',
      description: '',
      amount: 0,
      professor: '',
      course: '',
    });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Page de Transactions</h1>

      {/* Section pour ajouter une transaction */}
      <div className="my-8">
        <h2 className="text-2xl font-semibold mb-4">Ajouter une transaction</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Titre
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={newTransaction.title}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={newTransaction.date}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={newTransaction.description}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Montant (€)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={newTransaction.amount}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="professor" className="block text-sm font-medium text-gray-700">
              Professeur
            </label>
            <input
              type="text"
              id="professor"
              name="professor"
              value={newTransaction.professor}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="course" className="block text-sm font-medium text-gray-700">
              Cours
            </label>
            <input
              type="text"
              id="course"
              name="course"
              value={newTransaction.course}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <button
          onClick={handleAddTransaction}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Ajouter la transaction
        </button>
      </div>
    </div>
  );
};

export default transactionPage;
