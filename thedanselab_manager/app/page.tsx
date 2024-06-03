import Image from "next/image";
import { supabase } from "@/app/lib/supabase";

export default function Home() {
  const setNewView = async () => {
    const { data,error } = await supabase
      .from('utilisateur')
      .insert({
        nom : 'rich'
      })

      if (data) console.log(data)
      if (error) console.log(error)

  };
  setNewView();
  return (
    <div>hellllooo</div>
  );
}
