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
          <Sidebar.Item href="/paneladmin" icon={HiHome}>
            Home
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiBookOpen}>
            Créer un cours
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUserAdd}>
            Créer un professeur
          </Sidebar.Item>
          <Sidebar.Item href="/createEleve" icon={HiUserGroup}>
            Créer un élève
          </Sidebar.Item>
          <Sidebar.Item href="/CreateTarifPage" icon={HiCreditCard}>
            Créer un tarif
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiCurrencyDollar}>
            Comptabilité
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SidebarAdmin;
