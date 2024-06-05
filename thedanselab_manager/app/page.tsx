"use client";
import React, { useState } from "react";
// import { supabase } from "../supabaseClient";

import { useRouter } from "next/navigation";
import CardTarifVisiteur from "@/components/CardTarifVisiteur";



const Home: React.FC = () => {
  return (
    <div >

      <CardTarifVisiteur
        titre="Titre du tarif 1"
        description="Description du tarif 1"
        image="/path/to/image1.jpg"
        prix="20€"
      />

        <CardTarifVisiteur
          titre="Titre du tarif 2"
          description="Description du tarif 2"
          image="/path/to/image2.jpg"
          prix="30€"
        />


      <CardTarifVisiteur
        titre="Titre du tarif 3"
        description="Description du tarif 3"
        image="/path/to/image3.jpg"
        prix="40€"
      />
      
      <CardTarifVisiteur
        titre="Titre du tarif 3"
        description="Description du tarif 3"
        image="/path/to/image3.jpg"
        prix="40€"
      />
        <CardTarifVisiteur
        titre="Titre du tarif 3"
        description="Description du tarif 3"
        image="/path/to/image3.jpg"
        prix="40€"
      />
            <CardTarifVisiteur
        titre="Titre du tarif 3"
        description="Description du tarif 3"
        image="/path/to/image3.jpg"
        prix="40€"
      />
      
    </div>
  );
};



export default Home;
