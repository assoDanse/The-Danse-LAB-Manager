import bcrypt from 'bcryptjs';
import { supabase } from "@/app/lib/supabase"; // Assurez-vous que cette importation est correcte

interface User {
  name: string;
  firstName: string;
  email: string;
  password: string;
}

export async function createUser({ name, firstName, email, password }: User) {
  try {
    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertion des données dans la table 'utilisateur' de Supabase
    const { error } = await supabase
      .from('utilisateur')
      .insert({ 
        nom: name, 
        prenom: firstName, 
        email, 
        mot_de_passe: hashedPassword, 
        role: 'eleve' // Attribut fixe 'role'
      });

    if (error) {
      return { error };
    } else {
      return { message: "Utilisateur ajouté avec succès !" };
    }
  } catch (error) {
    return { error };
  }
}
