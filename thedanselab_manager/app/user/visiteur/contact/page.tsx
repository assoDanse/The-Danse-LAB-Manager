"use client";

import React, { useEffect, useState } from "react";

type ContactInfo = {
  phoneNumber: string;
  email: string;
};

const Contact: React.FC = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch("/api/contact");
        const data = await response.json();
        setContactInfo(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations de contact:",
          error
        );
      }
    };

    fetchContactInfo();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Contactez-nous</h2>
        {contactInfo ? (
          <>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Numéro de téléphone</h3>
              <p className="text-gray-700">{contactInfo.phoneNumber}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Adresse e-mail</h3>
              <p className="text-gray-700">{contactInfo.email}</p>
            </div>
          </>
        ) : (
          <p className="text-center font-bold">
            Chargement des informations...
          </p>
        )}
      </div>
    </div>
  );
};

export default Contact;
