// pages/rates.tsx
"use client"
import React from "react";
import RatesTable from "@/components/RatesTable";

const RatesPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full p-8">
      <div className="max-w-5xl w-full">
        <h1 className="text-2xl font-bold mb-6">Liste des tarifs</h1>
        <RatesTable />
      </div>
    </div>
  );
};

export default RatesPage;
