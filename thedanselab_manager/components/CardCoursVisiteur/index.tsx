import React from "react";
import { Card } from "flowbite-react";

type CardCoursVisiteurProps = {
  titre: string;
  description: string;
  image?: string; // Image est maintenant optionnel
  prix: string;
  dateDebut: string; // Date de début sous forme de chaîne de caractères
  duree: string; // Durée du cours
};

const CardCoursVisiteur: React.FC<CardCoursVisiteurProps> = ({
  titre,
  description,
  image,
  prix,
  dateDebut,
  duree,
}) => {
  return (
    <Card className="max-w-sm m-4">
      {image && (
        <img className="w-full h-48 object-cover" src={image} alt={titre} />
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
          Date de début : {dateDebut}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Durée : {duree}
        </p>
      </div>
    </Card>
  );
};

export default CardCoursVisiteur;
