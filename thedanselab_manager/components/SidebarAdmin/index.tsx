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
              <Sidebar.Collapse icon={HiBookOpen} label="Cours">
                <Sidebar.Item
                  href="/user/admin/creation_cours"
                  icon={HiPlusCircle}
                >
                  Créer un cours
                </Sidebar.Item>
                <Sidebar.Item href="/user/admin/liste_cours" icon={HiBookOpen}>
                  Voir les cours
                </Sidebar.Item>
              </Sidebar.Collapse>

              <Sidebar.Collapse icon={HiUserGroup} label="Professeur">
                <Sidebar.Item
                  href="/user/admin/list_professeur"
                  icon={HiUserGroup}
                >
                  List des professeurs
                </Sidebar.Item>
                <Sidebar.Item
                  href="/user/admin/creation_professeur"
                  icon={HiUserAdd}
                >
                  Créer un professeur
                </Sidebar.Item>
              </Sidebar.Collapse>

              <Sidebar.Collapse icon={HiUserGroup} label="Elève">
                <Sidebar.Item
                  href="/user/admin/creation_eleve"
                  icon={HiUserAdd}
                >
                  {" "}
                  Créer un élève{" "}
                </Sidebar.Item>
                <Sidebar.Item href="/user/admin/list_eleve" icon={HiUserGroup}>
                  {" "}
                  Liste des élèves{" "}
                </Sidebar.Item>
              </Sidebar.Collapse>

              <Sidebar.Collapse icon={HiUserGroup} label="Tarif">
                <Sidebar.Item
                  href="/user/admin/liste_tarif"
                  icon={HiCreditCard}
                >
                  {" "}
                  List des tarifs{" "}
                </Sidebar.Item>
                <Sidebar.Item
                  href="/user/admin/creation_tarif"
                  icon={HiCreditCard}
                >
                  {" "}
                  Créer un tarif{" "}
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
        <button className="p-4 focus:outline-none" onClick={toggleSidebar}>
          <FaBars className="text-xl" />
        </button>
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
                  Voir les cours
                </Sidebar.Item>
              </Sidebar.Collapse>

              <Sidebar.Collapse icon={HiUserGroup} label="Professeur">
                <Sidebar.Item
                  href="/user/admin/list_professeur"
                  icon={HiUserGroup}
                >
                  List des professeurs
                </Sidebar.Item>
                <Sidebar.Item
                  href="/user/admin/creation_professeur"
                  icon={HiUserAdd}
                >
                  Créer un professeur
                </Sidebar.Item>
              </Sidebar.Collapse>

              <Sidebar.Collapse icon={HiUserGroup} label="Elève">
                <Sidebar.Item
                  href="/user/admin/creation_eleve"
                  icon={HiUserAdd}
                >
                  {" "}
                  Créer un élève{" "}
                </Sidebar.Item>
                <Sidebar.Item href="/user/admin/list_eleve" icon={HiUserGroup}>
                  {" "}
                  Liste des élèves{" "}
                </Sidebar.Item>
              </Sidebar.Collapse>

              <Sidebar.Collapse icon={HiUserGroup} label="Tarif">
                <Sidebar.Item
                  href="/user/admin/liste_tarif"
                  icon={HiCreditCard}
                >
                  {" "}
                  List des tarifs{" "}
                </Sidebar.Item>
                <Sidebar.Item
                  href="/user/admin/creation_tarif"
                  icon={HiCreditCard}
                >
                  {" "}
                  Créer un tarif{" "}
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
