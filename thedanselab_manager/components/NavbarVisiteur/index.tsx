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
          Login
        </Button>
        <Button href="/signin">Sign in</Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="/CoursVisiteur">Cours</Navbar.Link>
        <Navbar.Link href="/tarifs">Tarifs</Navbar.Link>
        <Navbar.Link href="/contact">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarVisiteur;
