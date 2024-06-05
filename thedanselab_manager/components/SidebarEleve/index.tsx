"use client";

import { Sidebar } from "flowbite-react";
import { HiHome, HiBookOpen, HiUserAdd, HiUserGroup, HiCreditCard, HiCurrencyDollar } from "react-icons/hi";

export function SidebarEleve() {
  return (
    <Sidebar aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiHome}>
            Home
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiBookOpen}>
            Voir mes cours
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiCreditCard}>
            Voir les tarifs
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SidebarEleve;
