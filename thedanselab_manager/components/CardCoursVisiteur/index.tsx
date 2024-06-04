import { Card } from "flowbite-react";

type CardCoursVisiteurProps = {
  titre: string;
  description: string;
  image: string;
  prix: string;
};

function CardCoursVisiteur({
  titre,
  description,
  image,
  prix,
}: CardCoursVisiteurProps) {
  return (
    <Card className="max-w-sm" imgAlt={image} imgSrc={image}>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {titre}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">{prix}</p>
    </Card>
  );
}

export default CardCoursVisiteur;
