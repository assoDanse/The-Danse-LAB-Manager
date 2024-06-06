"use client";
import React, { useState } from "react";
import SidebarEleve, { SidebarProfesseur } from "@/components/SidebarProfesseur";

const panelprof: React.FC = () => {

  return (
    <div className="flex">
      <div className="flex-none">
        <SidebarProfesseur />
      </div>
    </div>
  );
};

export default panelprof;