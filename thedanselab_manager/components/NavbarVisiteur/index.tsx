"use client";

import React, { useEffect, useState } from "react";
import { Button, Navbar } from "flowbite-react";
import Image from "next/image";
import Logo from "@/public/Logo-150x150.jpg";
import { useRouter } from "next/navigation";
import { auth } from "@/app/config/firebase-config"; // Assurez-vous que cette importation est correcte
import { onAuthStateChanged, signOut } from "firebase/auth";

function NavbarVisiteur() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login"); // Redirige vers la page de connexion après la déconnexion
    } catch (error: any) {
      console.error("Erreur lors de la déconnexion:", error.message);
    }
  };

  return (
    <Navbar className="md:sticky md:top-0" fluid rounded>
      <Navbar.Brand href="https://thedancelab.fr/">
        <Image src={Logo} width={75} height={75} alt="Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white ml-4">
          The Dance Lab
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {userEmail ? (
          <>
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white ml-4">
              Connecté en tant que : {userEmail}
            </span>
            <Button className="ml-4" onClick={handleLogout}>
              Se déconnecter
            </Button>
          </>
        ) : (
          <>
            <Button className="mr-4" href="/login">
              Se connecter
            </Button>
            <Button href="/signin">Créer un compte</Button>
          </>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/" active>
          Accueil
        </Navbar.Link>
        <Navbar.Link href="/visiteur/cours">Cours</Navbar.Link>
        <Navbar.Link href="/visiteur/tarifs">Tarifs</Navbar.Link>
        <Navbar.Link href="/visiteur/contact">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarVisiteur;
