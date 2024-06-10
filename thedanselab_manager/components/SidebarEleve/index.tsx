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
          <Sidebar.Item href="/user/eleve" icon={HiHome}>
            Accueil
          </Sidebar.Item>
          <Sidebar.Item href="/user/eleve/cours" icon={HiBookOpen}>
            Cours
          </Sidebar.Item>
          <Sidebar.Item href="/user/eleve/Mescours" icon={HiBookOpen}>
            Mes cours
          </Sidebar.Item>
          <Sidebar.Item href="/user/eleve/tarifs" icon={HiCreditCard}>
            Les tarifs
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SidebarEleve;
