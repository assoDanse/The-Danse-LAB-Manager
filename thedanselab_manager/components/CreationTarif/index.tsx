import React from "react";

interface CreationTarifProps {
  titre: string;
  setTitre: (titre: string) => void;
  description: string;
  setDescription: (description: string) => void;
  image: File | null;
  setImage: (image: File | null) => void;
  prix: string;
  setPrix: (prix: string) => void;
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
  handleSubmit
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="w-full max-w-lg p-4"
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="titre">
          Titre
        </label>
        <input
          id="titre"
          type="text"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
          Image
        </label>
        <input
          id="image"
          type="file"
          onChange={handleImageChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prix">
          Prix
        </label>
        <input
          id="prix"
          type="text"
          value={prix}
          onChange={(e) => setPrix(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="credit">
          Crédit
        </label>
        <input
          id="credit"
          type="number"
          value={credit}
          onChange={(e) => setCredit(parseInt(e.target.value))}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Créer Tarif
        </button>
      </div>
    </form>
  );
};

export default CreationTarif;
