"use client";

import { Button, Navbar } from "flowbite-react";
import Image from "next/image";
import Logo from "@/public/Logo-150x150.jpg";

function Navbar_() {
  return (
    <Navbar className="md:sticky top-0 p-4 " fluid rounded>
      <Navbar.Brand href="https://thedancelab.fr/">
        <Image src={Logo} width={75} height={75} alt="Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white ml-4">
          The Dance Lab
        </span>
      </Navbar.Brand>
      <div className="flex md:order-3">
        <Button className="mr-4 max-md:hidden" href="/login">
          Se connecter
        </Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className="text-center">
        <Navbar.Link href="/" active>
          Accueil
        </Navbar.Link>
        <Navbar.Link href="/visiteur/cours">Cours</Navbar.Link>
        <Navbar.Link href="/visiteur/tarifs">Tarifs</Navbar.Link>
        <Navbar.Link href="/visiteur/contact">Contact</Navbar.Link>
        <Button className="m-4 md:hidden" href="/login">
          Se connecter
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navbar_;
