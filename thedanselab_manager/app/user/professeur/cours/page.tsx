import React, { useState } from "react";
import CardCoursProf from "@/components/CardCoursProf";

const CoursProfesseur: React.FC = () => {
  // État pour stocker les données des cours
  const [coursData, setCoursData] = useState<any[]>([]);

  // Fonction pour gérer l'ajout d'un élève à un cours
  const handleAddEleve = (index: number, eleve: string) => {
    // Copier les données des cours
    const updatedCoursData = [...coursData];
    // Vérifier si le cours existe
    if (updatedCoursData[index]) {
      // Vérifier si la liste des élèves existe
      if (!updatedCoursData[index].eleves) {
        updatedCoursData[index].eleves = [];
      }
      // Ajouter l'élève à la liste
      updatedCoursData[index].eleves.push(eleve);
      // Mettre à jour les données des cours
      setCoursData(updatedCoursData);
    }
  };

  // Fonction pour supprimer un cours
  const handleDeleteCours = (index: number) => {
    // Copier les données des cours
    const updatedCoursData = [...coursData];
    // Supprimer le cours à l'index spécifié
    updatedCoursData.splice(index, 1);
    // Mettre à jour les données des cours
    setCoursData(updatedCoursData);
  };

  // Fonction pour afficher le popup et ajouter un élève au cours
  const handleOpenPopup = (index: number) => {
    // Ici, vous pouvez ouvrir un popup ou un modèle pour ajouter un élève
    const eleve = prompt("Entrez le nom de l'élève :");
    if (eleve) {
      handleAddEleve(index, eleve);
    }
  };

  return (
    <div className="flex flex-wrap justify-center items-center">
      {coursData.length > 0 ? (
        coursData.map((cours, index) => (
          <div key={index}>
            <div onClick={() => handleOpenPopup(index)}>
              <CardCoursProf
                titre={cours.titre}
                description={cours.description}
                image={cours.image}
                date={cours.date}
                heure={cours.heure}
                duree={cours.duree}
                eleves={cours.eleves || []} // Passer une liste vide si les élèves n'existent pas
                liens={cours.liens || []} // Passer une liste vide si les liens n'existent pas
              />
            </div>
            <button onClick={() => handleDeleteCours(index)}>Supprimer le cours</button>
          </div>
        ))
      ) : (
        <p className="text-center font-bold">
          Aucun cours disponible pour le moment.
        </p>
      )}
    </div>
  );
};

export default CoursProfesseur;
