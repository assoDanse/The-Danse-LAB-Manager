"use client";
import { FaCog } from "react-icons/fa";
import { Sidebar } from "flowbite-react";
import { HiHome, HiBookOpen } from "react-icons/hi";

export function SidebarProfesseur() {
  return (
    <Sidebar aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/user/professeur" icon={HiHome}>
            Accueil
          </Sidebar.Item>
          <Sidebar.Item href="/user/professeur/cours" icon={HiBookOpen}>
            Mes cours
          </Sidebar.Item>
          <Sidebar.Item href="/user/professeur/creation_eleve" icon={FaCog}>
            Création élève
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SidebarProfesseur;
