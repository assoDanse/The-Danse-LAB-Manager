import React from 'react';
import { Card } from "flowbite-react";

type CardImageProps = {
  titre: string;
  description: string;
  image: string;
  prix: string;
  date: string; // Ajout de la date
  heure: string; // Ajout de l'heure
  duree: string; // Ajout de la durée
};

const CardImage: React.FC<CardImageProps> = ({ titre, description, image, prix, date, heure, duree }) => {
  return (
    <Card
      className="max-w-sm"
      imgAlt={titre}
      imgSrc={image}
    >
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
        Date: {date}, Heure: {heure}, Durée: {duree}
      </p>
    </Card>
  );
};

export default CardImage;
