"use client";

import React, { useState } from "react";
import CreationTarif from "@/components/CreationTarif";
import SidebarAdmin from "@/components/SidebarAdmin";

const CreateTarifPage: React.FC = () => {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [prix, setPrix] = useState("");
  const [credit, setCredit] = useState<number>(0);

  return (
    <div className="flex min-h-screen">
      <div className="flex-grow p-4">
        <CreationTarif
          titre={titre}
          setTitre={setTitre}
          description={description}
          setDescription={setDescription}
          image={image}
          setImage={setImage}
          prix={prix}
          setPrix={setPrix}
          credit={credit}
          setCredit={setCredit}
        />
      </div>
    </div>
  );
};

export default CreateTarifPage;
