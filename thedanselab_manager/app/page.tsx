"use client";
import React, { useState } from "react";

// import { supabase } from "../supabaseClient";

import { useRouter } from "next/navigation";
import SidebarEleve from "@/components/SidebarEleve";

const Home: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <h1>Accueil</h1>
      <SidebarEleve />
      <div></div>
    </div>
  );
};

export default Home;
