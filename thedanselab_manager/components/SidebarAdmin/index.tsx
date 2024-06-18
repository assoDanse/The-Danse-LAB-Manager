"use client";

import React, { useState } from "react";
import { Sidebar } from "flowbite-react";
import {
  HiHome,
  HiBookOpen,
  HiUserAdd,
  HiUserGroup,
  HiCreditCard,
  HiCurrencyDollar,
} from "react-icons/hi";
import { FaBars } from "react-icons/fa";

export function SidebarAdmin() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex">
      {/* Sidebar for larger screens */}
      <div className="hidden md:flex">
        <Sidebar aria-label="Default sidebar example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="/user/admin" icon={HiHome}>
                Accueil
              </Sidebar.Item>
              <Sidebar.Item href="/user/admin/creation_cours" icon={HiBookOpen}>
                Créer un cours
              </Sidebar.Item>
              <Sidebar.Item
                href="/user/admin/creation_professeur"
                icon={HiUserAdd}
              >
                Créer un professeur
              </Sidebar.Item>
              <Sidebar.Item
                href="/user/admin/creation_eleve"
                icon={HiUserGroup}
              >
                Créer un élève
              </Sidebar.Item>
              <Sidebar.Item
                href="/user/admin/creation_tarif"
                icon={HiCreditCard}
              >
                Créer un tarif
              </Sidebar.Item>
              <Sidebar.Item
                href="/user/admin/comptabilite"
                icon={HiCurrencyDollar}
              >
                Comptabilité
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>

      {/* Sidebar for smaller screens */}
      <div className="flex md:hidden flex-col w-20 transition-width duration-300">
        <button className="p-4 focus:outline-none" onClick={toggleSidebar}>
          <FaBars className="text-xl" />
        </button>
        <Sidebar
          aria-label="Default sidebar example"
          className={`${
            isExpanded ? "w-64" : "w-20"
          } transition-width duration-300`}
        >
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="/user/admin" icon={HiHome}>
                {isExpanded && "Accueil"}
              </Sidebar.Item>
              <Sidebar.Item href="/user/admin/creation_cours" icon={HiBookOpen}>
                {isExpanded && "Créer un cours"}
              </Sidebar.Item>
              <Sidebar.Item
                href="/user/admin/creation_professeur"
                icon={HiUserAdd}
              >
                {isExpanded && "Créer un professeur"}
              </Sidebar.Item>
              <Sidebar.Item
                href="/user/admin/creation_eleve"
                icon={HiUserGroup}
              >
                {isExpanded && "Créer un élève"}
              </Sidebar.Item>
              <Sidebar.Item
                href="/user/admin/creation_tarif"
                icon={HiCreditCard}
              >
                {isExpanded && "Créer un tarif"}
              </Sidebar.Item>
              <Sidebar.Item
                href="/user/admin/comptabilite"
                icon={HiCurrencyDollar}
              >
                {isExpanded && "Comptabilité"}
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>

      <div className="flex-grow">{/* Content goes here */}</div>
    </div>
  );
}

export default SidebarAdmin;
