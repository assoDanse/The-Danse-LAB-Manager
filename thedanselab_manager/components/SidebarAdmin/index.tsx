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
  HiPlusCircle,
} from "react-icons/hi";
import { FaBars, FaUserEdit } from "react-icons/fa"; // Ajouter FaUserEdit pour les icônes de modification

export function SidebarAdmin() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex">
      {/* Sidebar for larger screens */}
      <div className="max-md:hidden md:flex">
        <Sidebar aria-label="Default sidebar example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="/user/admin" icon={HiHome}>
                Accueil
              </Sidebar.Item>
              <Sidebar.Collapse icon={HiBookOpen} label="Cours">
                <Sidebar.Item
                  href="/user/admin/creation_cours"
                  icon={HiPlusCircle}
                >
                  Créer un cours
                </Sidebar.Item>
                <Sidebar.Item href="/user/admin/liste_cours" icon={HiBookOpen}>
                  Liste des cours
                </Sidebar.Item>
              </Sidebar.Collapse>

              <Sidebar.Collapse icon={HiUserGroup} label="Professeur">
                <Sidebar.Item
                  href="/user/admin/creation_professeur"
                  icon={HiUserGroup}
                >
                  Créer un professeur
                </Sidebar.Item>
                <Sidebar.Item
                  href="/user/admin/list_professeur"
                  icon={HiUserAdd}
                >
                  List des professeurs
                </Sidebar.Item>
                <Sidebar.Item
                  href="/user/admin/modifier_prof"
                  icon={FaUserEdit}
                >
                  {" "}
                  Modifier professeur
                </Sidebar.Item>
              </Sidebar.Collapse>

              <Sidebar.Collapse icon={HiUserGroup} label="Elève">
                <Sidebar.Item
                  href="/user/admin/creation_eleve"
                  icon={HiUserAdd}
                >
                  Créer un élève
                </Sidebar.Item>
                <Sidebar.Item href="/user/admin/list_eleve" icon={HiUserGroup}>
                  Liste des élèves
                </Sidebar.Item>
                <Sidebar.Item
                  href="/user/admin/modifier_eleve"
                  icon={FaUserEdit}
                >
                  {" "}
                  Modifier élève
                </Sidebar.Item>
              </Sidebar.Collapse>

              <Sidebar.Collapse icon={HiUserGroup} label="Tarif">
                <Sidebar.Item
                  href="/user/admin/creation_tarif"
                  icon={HiCreditCard}
                >
                  Créer un tarif
                </Sidebar.Item>
                <Sidebar.Item
                  href="/user/admin/liste_tarif"
                  icon={HiCreditCard}
                >
                  Liste des tarifs
                </Sidebar.Item>
              </Sidebar.Collapse>

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
        <Sidebar aria-label="Default sidebar example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="/user/admin" icon={HiHome}>
                {isExpanded && "Accueil"}
              </Sidebar.Item>
              <Sidebar.Collapse icon={HiBookOpen} label="Cours">
                <Sidebar.Item
                  href="/user/admin/creation_cours"
                  icon={HiPlusCircle}
                >
                  {isExpanded && "Créer un cours"}
                </Sidebar.Item>
                <Sidebar.Item href="/user/admin/liste_cours" icon={HiBookOpen}>
                  {isExpanded && "Liste des cour"}s
                </Sidebar.Item>
              </Sidebar.Collapse>

              <Sidebar.Collapse icon={HiUserGroup} label="Professeur">
                <Sidebar.Item
                  href="/user/admin/creation_professeur"
                  icon={HiUserGroup}
                >
                  {isExpanded && "Créer un professeur"}
                </Sidebar.Item>
                <Sidebar.Item
                  href="/user/admin/list_professeur"
                  icon={HiUserAdd}
                >
                  {isExpanded && "List des professeur"}s
                </Sidebar.Item>
                <Sidebar.Item
                  href="/user/admin/modifier_prof"
                  icon={FaUserEdit}
                >
                  {isExpanded && "Modifier professeur"}
                </Sidebar.Item>
              </Sidebar.Collapse>

              <Sidebar.Collapse icon={HiUserGroup} label="Elève">
                <Sidebar.Item
                  href="/user/admin/creation_eleve"
                  icon={HiUserAdd}
                >
                  {isExpanded && "Créer un élève"}
                </Sidebar.Item>
                <Sidebar.Item href="/user/admin/list_eleve" icon={HiUserGroup}>
                  {isExpanded && "Liste des élèves"}
                </Sidebar.Item>
                <Sidebar.Item
                  href="/user/admin/modifier_eleve"
                  icon={FaUserEdit}
                >
                  {isExpanded && "Modifier élève"}
                </Sidebar.Item>
              </Sidebar.Collapse>

              <Sidebar.Collapse icon={HiCreditCard} label="Tarif">
                <Sidebar.Item
                  href="/user/admin/creation_tarif"
                  icon={HiCreditCard}
                >
                  {isExpanded && ""}Créer un tarif
                </Sidebar.Item>
                <Sidebar.Item
                  href="/user/admin/liste_tarif"
                  icon={HiCreditCard}
                >
                  Liste des tarifs
                </Sidebar.Item>
              </Sidebar.Collapse>

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

      <div className="flex-grow">{/* Content goes here */}</div>
    </div>
  );
}

export default SidebarAdmin;
