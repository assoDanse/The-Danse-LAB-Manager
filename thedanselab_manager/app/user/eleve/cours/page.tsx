"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/config/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  Timestamp,
  addDoc,
  updateDoc,
} from "firebase/firestore";

interface Cours {
  id: string;
  titre: string;
  description: string;
  type: string;
  nom_professeur: string;
  date_heure_debut: string;
  duree: {
    heures: number;
    minutes: number;
  };
  photo: string;
  places_restantes: number; // Add this field
}

interface Carte {
  id: string;
  titre: string;
  places_restantes: number;
}

const CoursEleve: React.FC = () => {
  const [myCours, setMyCours] = useState<Cours[]>([]);
  const [availableCours, setAvailableCours] = useState<Cours[]>([]);
  const [selectedCours, setSelectedCours] = useState<Cours | null>(null);
  const [viewingCours, setViewingCours] = useState<Cours | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [availableCartes, setAvailableCartes] = useState<Carte[]>([]);
  const [selectedCarte, setSelectedCarte] = useState<Carte | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCours = async () => {
      setLoading(true);
      setError(null);

      try {
        const user = auth.currentUser;
        if (user) {
          const participationQuery = query(
            collection(db, "participation"),
            where("id_users", "==", user.uid)
          );
          const participationSnapshot = await getDocs(participationQuery);
          const myCoursIds = participationSnapshot.docs.map(
            (doc) => doc.data().id_cours
          );

          const coursSnapshot = await getDocs(collection(db, "cours"));
          const allCours = coursSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            date_heure_debut: (doc.data().date_heure_debut as Timestamp)
              .toDate()
              .toLocaleString(),
          })) as Cours[];

          const myCoursList = allCours.filter((cours) =>
            myCoursIds.includes(cours.id)
          );
          const availableCoursList = allCours.filter(
            (cours) => !myCoursIds.includes(cours.id)
          );

          setMyCours(myCoursList);
          setAvailableCours(availableCoursList);
        } else {
          setError("User not logged in");
          router.push("/auth/login");
        }
      } catch (err) {
        setError("Erreur lors de la récupération des cours");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchCours();
      } else {
        setError("User not logged in");
        router.push("/auth/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleInscriptionClick = async (cours: Cours) => {
    const user = auth.currentUser;
    if (user) {
      const cartesQuery = query(
        collection(db, "cartes"),
        where("id_users", "==", user.uid),
        where("places_restantes", ">", 0)
      );
      const cartesSnapshot = await getDocs(cartesQuery);
      const cartesList: Carte[] = cartesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Carte[];

      if (cartesList.length > 0) {
        setAvailableCartes(cartesList);
        setSelectedCours(cours);
      } else {
        setMessage("Aucune carte disponible avec des places restantes.");
      }
    } else {
      setError("User not logged in");
    }
  };

  const handleViewClick = (cours: Cours) => {
    setViewingCours(cours);
  };

  const handleConfirmInscription = async () => {
    if (!selectedCours || !selectedCarte) return;

    try {
      const user = auth.currentUser;
      if (user) {
        // Créer une nouvelle participation avec l'ID de la carte utilisée
        await addDoc(collection(db, "participation"), {
          id_users: user.uid,
          id_cours: selectedCours.id,
          id_carte: selectedCarte.id, // Ajout de l'ID de la carte
        });

        // Mettre à jour la carte de l'élève pour diminuer le nombre de places restantes
        const carteDocRef = doc(db, "cartes", selectedCarte.id);
        const newPlacesRestantes = selectedCarte.places_restantes - 1;
        await updateDoc(carteDocRef, { places_restantes: newPlacesRestantes });

        // Mettre à jour les places restantes pour le cours
        const coursDocRef = doc(db, "cours", selectedCours.id);
        const coursDoc = await getDoc(coursDocRef);
        if (coursDoc.exists()) {
          const newPlacesRestantes = coursDoc.data().places_restantes - 1;
          await updateDoc(coursDocRef, {
            places_restantes: newPlacesRestantes,
          });
        }

        // Mettre à jour la liste des cours disponibles et des cours de l'élève
        setAvailableCours(
          availableCours.filter((cours) => cours.id !== selectedCours.id)
        );
        setMyCours([...myCours, selectedCours]);
        setSelectedCours(null);
        setSelectedCarte(null);
        setMessage("Inscription réussie");
      } else {
        setError("User not logged in");
      }
    } catch (error) {
      setError("Erreur lors de l'inscription");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full">
        Chargement...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center w-full">{error}</div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full mt-4">
      {message && (
        <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4">
          {message}
        </div>
      )}

      <h1 className="text-2xl mb-4">Cours Disponibles</h1>
      {availableCours.length > 0 ? (
        <ul className="w-full max-w-3xl mx-auto">
          {availableCours.map((cours) => (
            <li
              key={cours.id}
              className="bg-sand border-2 border-salmon p-4 mb-2 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-bold">{cours.titre}</h2>
              <p>Type: {cours.type}</p>
              <p>Date: {cours.date_heure_debut}</p>
              <p>
                Durée: {cours.duree.heures}h {cours.duree.minutes}m
              </p>
              <p>Professeur: {cours.nom_professeur}</p>
              <button
                onClick={() => handleViewClick(cours)}
                className="bg-blue-500 text-white p-2 rounded mt-2"
              >
                Visualiser
              </button>
              <button
                onClick={() => handleInscriptionClick(cours)}
                className="bg-green-500 text-white p-2 rounded mt-2 ml-2"
              >
                S'inscrire
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">Aucun cours disponible</p>
      )}

      {selectedCours && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">Sélectionnez une carte</h2>
            {availableCartes.length > 0 ? (
              <ul>
                {availableCartes.map((carte) => (
                  <li key={carte.id} className="mb-2">
                    <button
                      onClick={() => setSelectedCarte(carte)}
                      className={`p-2 rounded ${
                        selectedCarte?.id === carte.id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {carte.titre} - Places restantes: {carte.places_restantes}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucune carte disponible</p>
            )}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedCours(null)}
                className="bg-red-500 text-white p-2 rounded mr-2"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirmInscription}
                className="bg-green-500 text-white p-2 rounded"
                disabled={!selectedCarte}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}

      {viewingCours && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">{viewingCours.titre}</h2>
            {viewingCours.photo && (
              <img
                src={viewingCours.photo}
                alt={viewingCours.titre}
                className="mb-4 w-full"
              />
            )}
            <p className="mb-4">{viewingCours.description}</p>
            <p>
              <strong>Type:</strong> {viewingCours.type}
            </p>
            <p>
              <strong>Date:</strong> {viewingCours.date_heure_debut}
            </p>
            <p>
              <strong>Durée:</strong> {viewingCours.duree.heures}h{" "}
              {viewingCours.duree.minutes}m
            </p>
            <p>
              <strong>Professeur:</strong> {viewingCours.nom_professeur}
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setViewingCours(null)}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// { <div className="flex flex-wrap justify-center items-center w-full">
//       {courses.length === 0 ? (
//         <p className="text-center text-gray-600 font-semibold">Aucun cours disponible pour le moment.</p>
//       ) : (
//         courses.map((course, index) => (
//           <div key={index} onClick={() => handleCourseClick(course)} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
//             <CardcoursVisiteur
//               titre={course.titre}
//               description={course.description}
//               image={course.image}
//               prix={course.prix}
//               date={new Date(course.date)}
//               heure={course.heure}
//               duree={course.duree}
//             />
//           </div>
//         ))
//       )}

//       {showPopup && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-8 rounded-lg">
//             <h2 className="text-2xl font-semibold mb-4">{selectedCourse.titre}</h2>
//             <p>{/* Contenu du popup avec les détails du cours }</p>
//             <div className="mt-4 flex justify-between">
//               <button onClick={handleClosePopup} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
//                 Annuler
//               </button>
//               <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
//                 Utiliser les crédits
//               </button>
//               <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
//                 Payer avec Halloasso
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   ); }

export default CoursEleve;
