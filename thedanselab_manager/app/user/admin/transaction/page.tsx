"use client";
import React, { useState } from "react";
import DateRangeInput from "@/components/DateRangeInput"; 
import formatDate from "@/components/formatDate";
import ValidationButton from "@/components/ValidationButton";
import ProfesseurInput from "@/components/professeurInput";
import TypeDeCoursInput from "@/components/TypeDeCoursInput";



interface Transaction {
  id: string;
  title: string;
  date: string;
  description: string;
  amount: number;
  professorId: string;
  professorName: string;
  typeDeCours: string;
}

const transactionPage: React.FC = () => {

  const [newTransaction, setNewTransaction] = useState<Transaction>({
    id: "",
    title: "",
    date: "",
    description: "",
    amount: 0,
    professorId: "",
    professorName: "",
    typeDeCours: "",
  });

  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const setProfessorId = (professorId: string) => {
    setNewTransaction({ ...newTransaction, professorId });
  };

  const setProfessorName = (professorName: string) => {
    setNewTransaction({ ...newTransaction, professorName });
  };

  const setTypeDeCours = (typeDeCours: string) => {
    setNewTransaction({ ...newTransaction, typeDeCours });
  };

  
  const handleAddTransaction = () => {
    if (
      !newTransaction.title ||
      !newTransaction.date ||
      newTransaction.amount === 0 ||
      isNaN(newTransaction.amount)
    ) {
      alert(
        "Veuillez remplir tous les champs obligatoires et assurez-vous que le montant est un nombre valide."
      );
      return;
    }

    const transactionAmount = parseFloat(newTransaction.amount.toString());
    const transactionToAdd: Transaction = {
      ...newTransaction,
      id: Date.now().toString(),
      amount: transactionAmount,
    };
    console.log("Transaction à ajouter :", transactionToAdd);

    setNewTransaction({
      id: "",
      title: "",
      date: "",
      description: "",
      amount: 0,
      professorId: "",
      professorName: "",
      typeDeCours: "",
    });
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="max-w-xl w-full p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Page de Transactions
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Titre
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={newTransaction.title}
              onChange={handleInputChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={newTransaction.date}
              onChange={handleInputChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={newTransaction.description}
              onChange={handleInputChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Montant (€)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={newTransaction.amount}
              onChange={handleInputChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <ProfesseurInput
              professorId={newTransaction.professorId}
              setProfessorId={setProfessorId}
              setProfessorName={setProfessorName}
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <TypeDeCoursInput
              typeDeCours={newTransaction.typeDeCours}
              setTypeDeCours={setTypeDeCours}
            />
          </div>
        </div>
        <div className="mt-4">
          <ValidationButton text="Ajouter une transaction" />
        </div>
      </div>
    </div>
  );
};

export default transactionPage;
