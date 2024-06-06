"use client";

import { Sidebar } from "flowbite-react";
import {
  HiHome,
  HiBookOpen,
  HiUserAdd,
  HiUserGroup,
  HiCreditCard,
  HiCurrencyDollar,
} from "react-icons/hi";

export function SidebarAdmin() {
  return (
    <Sidebar aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/admin" icon={HiHome}>
            Accueil
          </Sidebar.Item>
          <Sidebar.Item href="/admin/creation_cours" icon={HiBookOpen}>
            Créer un cours
          </Sidebar.Item>
          <Sidebar.Item href="/admin/creation_professeur" icon={HiUserAdd}>
            Créer un professeur
          </Sidebar.Item>
          <Sidebar.Item href="/admin/creation_eleve" icon={HiUserGroup}>
            Créer un élève
          </Sidebar.Item>
          <Sidebar.Item href="/admin/creation_tarif" icon={HiCreditCard}>
            Créer un tarif
          </Sidebar.Item>
          <Sidebar.Item href="/admin/comptabilite" icon={HiCurrencyDollar}>
            Comptabilité
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SidebarAdmin;
