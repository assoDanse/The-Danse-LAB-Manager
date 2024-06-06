// Desc: FirstName input component
function FirstNameInput({
  FirstName,
  setFirstName,
}: {
  FirstName: string;
  setFirstName: (FirstName: string) => void;
}) {
  return (
    <input
      type="Prénom"
      value={FirstName}
      onChange={(e) => setFirstName(e.target.value)}
      placeholder="Prénom"
      style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
    />
  );
}

export default FirstNameInput;
