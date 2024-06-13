import React from "react";
import { Card } from "flowbite-react";
import ValidationButton from "../ValidationButton";

type CreationTarifProps = {
  titre: string;
  setTitre: (titre: string) => void;
  description: string;
  setDescription: (description: string) => void;
  image: string;
  setImage: (image: string) => void;
  prix: string;
  setPrix: (prix: string) => void;
  credit: number;
  setCredit: (credit: number) => void;
};

const CreationTarif: React.FC<CreationTarifProps> = ({
  titre,
  setTitre,
  description,
  setDescription,
  image,
  setImage,
  prix,
  setPrix,
  credit,
  setCredit,
}) => {
  return (
    <div className="max-w-sm w-full p-8 bg-white rounded-lg shadow-md ">
      <h1 className="text-center text-2xl mb-6">Créer un tarif</h1>
      <form className="flex flex-col gap-5">
        <div className="">
          <input
            type="texte"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            placeholder="Titre"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Description"
          />
        </div>
        <div className="">
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Image"
          />
        </div>
        <div className="">
          <input
            type="text"
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Prix"
          />
        </div>
        <div className="">
          <input
            type="number"
            value={credit}
            onChange={(e) => setCredit(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded"
            placeholder="Credit"
          />
        </div>
        <ValidationButton text="Créer un Tarif" />
      </form>
    </div>
  );
};

export default CreationTarif;
