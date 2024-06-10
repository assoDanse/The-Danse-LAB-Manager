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

export function SidebarEleve() {
  return (
    <Sidebar aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/eleve" icon={HiHome}>
            Accueil
          </Sidebar.Item>
          <Sidebar.Item href="/eleve/cours" icon={HiBookOpen}>
            Cours
          </Sidebar.Item>
          <Sidebar.Item href="/eleve/Mescours" icon={HiBookOpen}>
            Mes cours
          </Sidebar.Item>
          <Sidebar.Item href="/eleve/tarifs" icon={HiCreditCard}>
            Les tarifs
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SidebarEleve;
