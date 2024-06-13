import React from 'react';
import { Card } from 'flowbite-react';

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

const CreationTarif: React.FC<CreationTarifProps> = ({ titre, setTitre, description, setDescription, image, setImage, prix, setPrix, credit, setCredit }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <form className="w-full max-w-md p-4 bg-white rounded shadow-md">
        <div className="mb-4">
       
          <input
            type="texte"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            placeholder="Titre"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Description"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Image"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Prix"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            value={credit}
            onChange={(e) => setCredit(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded"
            placeholder="Credit"
          />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded">
          Créer Tarif
        </button>
      </form>

      <div className="mt-8">
        <Card className="max-w-sm m-auto">
          {image && (
            <img
              className="w-full h-48 object-cover"
              src={image}
              alt={titre}
            />
          )}
          <div className="p-4">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {titre}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {description}
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {prix}
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Crédits : {credit}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreationTarif;
