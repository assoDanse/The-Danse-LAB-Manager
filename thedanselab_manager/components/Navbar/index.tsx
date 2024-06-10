"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Navbar } from "flowbite-react";
import Image from "next/image";
import Logo from "@/public/Logo-150x150.jpg";
import { auth, db } from "@/config/firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

function Navbar_() {
  const [userName, setUserName] = useState<string | null>(null);
  const [userFirstName, setUserFirstName] = useState<string | null>(null);
  const [userStatus, setUserStatus] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log("User data retrieved:", userData);
            setUserName(userData.name);
            setUserFirstName(userData.firstName);
            setUserStatus(userData.status);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error getting user document:", error);
        }
      } else {
        console.log("User not logged in or no user found");
        setUserName(null);
        setUserFirstName(null);
        setUserStatus(null);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/auth/login"); // Redirige vers la page de connexion après la déconnexion
    } catch (error: any) {
      console.error("Erreur lors de la déconnexion:", error.message);
    }
  };

  const getHomeLink = () => {
    if (userStatus === "admin") {
      return "/user/admin";
    } else if (userStatus === "professeur") {
      return "/user/professeur";
    } else if (userStatus === "eleve") {
      return "/user/eleve";
    } else {
      return "/";
    }
  };

  const getCoursesLink = () => {
    if (userStatus === "admin") {
      return "/user/admin/cours";
    } else if (userStatus === "professeur") {
      return "/user/professeur/cours";
    } else if (userStatus === "eleve") {
      return "/user/eleve/cours";
    } else {
      return "/user/visiteur/cours";
    }
  };

  return (
    <Navbar className="md:sticky top-0 p-4 w-full bg-slate-400" fluid rounded>
      <Navbar.Brand href="https://thedancelab.fr/">
        <Image src={Logo} width={75} height={75} alt="Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white ml-4">
          The Dance Lab
        </span>
      </Navbar.Brand>
      <div className="flex md:order-3">
        {userName && userFirstName ? (
          <>
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white ml-4">
              {userFirstName} {userName}
            </span>
            <Button
              className="ml-4 bg-red-500 hover:bg-red-700 text-white"
              onClick={handleLogout}
            >
              Se déconnecter
            </Button>
          </>
        ) : (
          <Button className="mr-4 max-md:hidden" href="/auth/login">
            Se connecter
          </Button>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className="text-center">
        <Navbar.Link href={getHomeLink()} active>
          Accueil
        </Navbar.Link>
        <Navbar.Link href={getCoursesLink()}>Cours</Navbar.Link>
        <Navbar.Link href="/user/visiteur/tarifs">Tarifs</Navbar.Link>
        <Navbar.Link href="/user/visiteur/contact">Contact</Navbar.Link>
        {!userName && !userFirstName && (
          <Button className="m-4 md:hidden" href="/auth/login">
            Se connecter
          </Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navbar_;
