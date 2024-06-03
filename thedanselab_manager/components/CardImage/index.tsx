import { Card } from "flowbite-react";

type CardImageProps = {
  titre: string;
  description: string;
  image: string;
  prix: string;
};

function CardImage({ titre, description, image, prix }: CardImageProps) {
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
    </Card>
  );
}

export default CardImage;

