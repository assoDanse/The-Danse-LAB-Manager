"use client";

import React, { useState } from "react";
import DateRangeInput from "@/components/DateRangeInput";
import formatDate from "@/components/formatDate";
import ValidationButton from "@/components/ValidationButton";
import ProfesseurInput from "@/components/professeurInput";
import CoursInput from "@/components/CoursInput";
import DateInput from "@/components/dateInput";
import {
  Label,
  FileInput,
  Checkbox,
  TextInput,
  Datepicker,
} from "flowbite-react";
import DescriptionInput from "@/components/DescriptionInput";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";

interface Transaction {
  id: string;
  title: string;
  date: string;
  description: string;
  amount: number;
  professorId: string;
  professorName: string;
  courseId: string;
  courseTitle: string;
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
    courseId: "",
    courseTitle: "",
  });
  const [description, setDescription] = useState("");
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

  const setCourseId = (courseId: string) => {
    setNewTransaction({ ...newTransaction, courseId });
  };

  const setCourseTitle = (courseTitle: string) => {
    setNewTransaction({ ...newTransaction, courseTitle });
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
      courseId: "",
      courseTitle: "",
    });
  };

  return (
    <AdminProtectedRoute>
      <div className="flex justify-center items-center w-full p-2">
        <div className="max-w-xl w-full p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Page de Transactions
          </h1>
          <form className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Titre</Label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newTransaction.title}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <Datepicker
                type="datetime-local"
                id="date"
                name="date"
                value={newTransaction.date}
                onChange={handleInputChange}
              />
              <DescriptionInput
                description={description}
                setDescription={setDescription}
              />
              {/* <div>
            
            <Label htmlFor="description">Description</Label>
            <input
              type="text"
              id="description"
              name="description"
              value={newTransaction.description}
              onChange={handleInputChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div> */}
              <div>
                <Label htmlFor="amount">Montant (€)</Label>
                <TextInput
                  type="number"
                  id="amount"
                  name="amount"
                  value={newTransaction.amount}
                  onChange={handleInputChange}
                  min={0}
                  max={2000}
                  required
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
                <CoursInput
                  courseId={newTransaction.courseId}
                  setCourseId={setCourseId}
                  setCourseTitle={setCourseTitle}
                />
              </div>
            </div>
            <div className="mt-4">
              <ValidationButton text="Ajouter une transaction" />
            </div>
          </form>
        </div>
      </div>
    </AdminProtectedRoute>
  );
};

export default transactionPage;
