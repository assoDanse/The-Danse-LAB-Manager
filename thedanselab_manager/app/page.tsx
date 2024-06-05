"use client";

import React from 'react';
import CardcoursVisiteur from "@/components/CardcoursVisiteur";

const TestComponent: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <CardcoursVisiteur
        image='bvbcv' 
        titre="Titre du cours" 
        description="Ceci est une description" 
        prix="20€"
        date={new Date("2023-06-04")} 
        heure="14:00" 
        duree="2 heures"
      />
      <CardcoursVisiteur 
        titre="Titre du cours 2" 
        description="Ceci est une description" 
        prix="20€"
        date={new Date("2023-06-04")} 
        heure="14:00" 
        duree="2 heures"
      />
      <CardcoursVisiteur 
        titre="Titre du cours 3" 
        description="Ceci est une description" 
        prix="20€"
        date={new Date("2023-06-04")} 
        heure="14:00" 
        duree="2 heures"
      />
      <CardcoursVisiteur 
        titre="Titre du cours 4" 
        description="Ceci est une description" 
        prix="20€"
        date={new Date("2023-06-04")} 
        heure="14:00" 
        duree="2 heures"
      />
      <CardcoursVisiteur 
        titre="Titre du cours 5" 
        description="Ceci est une description" 
        prix="20€"
        date={new Date("2023-06-04")} 
        heure="14:00" 
        duree="2 heures"
      />
    </div>
  );
}

export default TestComponent;
