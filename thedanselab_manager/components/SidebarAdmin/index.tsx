"use client";

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

export function SidebarAdmin() {
  return (
    <Sidebar aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/user/admin" icon={HiHome}>
            Accueil
          </Sidebar.Item>
          <Sidebar.Collapse icon={HiBookOpen} label="Cours">
            <Sidebar.Item href="/user/admin/creation_cours" icon={HiPlusCircle}>
              Créer un cours
            </Sidebar.Item>
            <Sidebar.Item href="/user/admin/liste_cours" icon={HiBookOpen}>
              Voir les cours
            </Sidebar.Item>
          </Sidebar.Collapse>

          <Sidebar.Collapse icon={HiUserGroup} label="Professeur">
            <Sidebar.Item href="/user/admin/list_professeur" icon={HiUserGroup}>
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
            <Sidebar.Item href="/user/admin/creation_eleve" icon={HiUserAdd}>
              {" "}
              Créer un élève{" "}
            </Sidebar.Item>
            <Sidebar.Item href="/user/admin/list_eleve" icon={HiUserGroup}>
              {" "}
              Liste des élèves{" "}
            </Sidebar.Item>
          </Sidebar.Collapse>

          <Sidebar.Collapse icon={HiUserGroup} label="Tarif">
            <Sidebar.Item href="/user/admin/liste_tarif" icon={HiCreditCard}>
              {" "}
              List des tarifs{" "}
            </Sidebar.Item>
            <Sidebar.Item href="/user/admin/creation_tarif" icon={HiCreditCard}>
              {" "}
              Créer un tarif{" "}
            </Sidebar.Item>
          </Sidebar.Collapse>

          <Sidebar.Item href="/user/admin/comptabilite" icon={HiCurrencyDollar}>
            Comptabilité
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SidebarAdmin;
