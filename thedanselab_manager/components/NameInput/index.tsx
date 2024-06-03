// Desc: Name input component
function NameInput({
  name,
  setName,
}: {
  name: string;
  setName: (name: string) => void;
}) {
  return (
    <input
      type="name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Name"
      style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
    />
  );
}

export default NameInput;
