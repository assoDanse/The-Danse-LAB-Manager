"use client";
import React, { useState } from "react";
import SidebarEleve, { SidebarAdmin } from "@/components/SidebarAdmin";

const paneladmin: React.FC = () => {

  return (
    <div className="flex">
      <div className="flex-none">
        <SidebarAdmin />
      </div>
    </div>
  );
};

export default paneladmin;