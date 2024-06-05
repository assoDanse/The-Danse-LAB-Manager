"use client";
import { FaHome, FaUser, FaCog } from "react-icons/fa";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";

export function SidebarProfesseur() {
  return (
    <Sidebar aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={FaHome}>
            Home
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FaUser}>
            Mes cours
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FaCog}>
            Creation élève
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SidebarProfesseur;
