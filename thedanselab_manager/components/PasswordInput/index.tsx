// Desc: Email input component
function PasswordInput({
  password,
  setPassword,
}: {
  password: string;
  setPassword: (password: string) => void;
}) {
  return (
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder={"Mot de passe"} // Utiliser la prop placeholder ou un texte par défaut
      style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
    />
  );
}

export default PasswordInput;
