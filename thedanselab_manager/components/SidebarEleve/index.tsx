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
    <Sidebar aria-label="Default sidebar example" className="sidebar-custom">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/user/eleve" icon={HiHome}>
            Accueil
          </Sidebar.Item>
          <Sidebar.Item href="/user/eleve/cours" icon={HiBookOpen}>
            Cours
          </Sidebar.Item>
          <Sidebar.Item href="/user/eleve/mes_cours" icon={HiBookOpen}>
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
