// Desc: Email input component
function EmailInput({
  email,
  setEmail,
}: {
  email: string;
  setEmail: (email: string) => void;
}) {
  return (
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email"
      style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
    />
  );
}

export default EmailInput;
