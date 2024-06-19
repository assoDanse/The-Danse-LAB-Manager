import React from "react";
import ValidationButton from "../ValidationButton";

interface CreationTarifProps {
  titre: string;
  setTitre: (titre: string) => void;
  description: string;
  setDescription: (description: string) => void;
  image: File | null;
  setImage: (image: File | null) => void;
  prix: number;
  setPrix: (prix: number) => void;
  credit: number;
  setCredit: (credit: number) => void;
  handleSubmit: () => void;
}

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
  handleSubmit,
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-sm w-full p-8 bg-white rounded-lg shadow-md ">
      <h1 className="text-center text-2xl mb-6">Créer un tarif</h1>
      <form className="flex flex-col gap-5">
        <div className="">
          <input
            id="titre"
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            placeholder="Titre"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="">
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Description"
          />
        </div>
        <div className="">
          <input
            id="image"
            type="file"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Image"
          />
        </div>
        <div className="">
          <input
            id="prix"
            type="number"
            value={prix}
            onChange={(e) => setPrix(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded"
            placeholder="Prix"
          />
        </div>
        <div className="">
          <input
            id="credit"
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
