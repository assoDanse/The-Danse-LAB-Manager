"use client";

import { Button, Navbar } from "flowbite-react";
import Image from "next/image";
import Logo from "@/public/Logo-150x150.jpg";

function NavbarVisiteur() {
  return (
    <Navbar className="md:sticky md:top-0" fluid rounded>
      <Navbar.Brand href="https://thedancelab.fr/">
        <Image src={Logo} width={75} height={75} alt="Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white ml-4">
          The Dance Lab
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button className="mr-4" href="/login">
          Se connecter
        </Button>
        <Button href="/signin">Créer un compte</Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/" active>
          Accueil
        </Navbar.Link>
        <Navbar.Link href="/Visiteur/cours">Cours</Navbar.Link>
        <Navbar.Link href="/Visiteur/tarifs">Tarifs</Navbar.Link>
        <Navbar.Link href="/Visiteur/contact">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarVisiteur;
