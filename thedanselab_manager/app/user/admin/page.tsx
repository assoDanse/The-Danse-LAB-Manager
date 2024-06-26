"use client";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";
import React, { useState } from "react";


const panneladmin: React.FC = () => {
  return (
    <AdminProtectedRoute>
      <div className="flex flex-wrap justify-center items-center w-full">
        content
      </div>
    </AdminProtectedRoute>
  );
};

export default panneladmin;
