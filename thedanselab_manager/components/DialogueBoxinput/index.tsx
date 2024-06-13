// Desc: DialogueBox input component
function DialogueBoxInput({
    DialogueBox,
    setDialogueBox,
  }: {
    DialogueBox: string;
    setDialogueBox: (DialogueBox: string) => void;
  }) {
    return (
      <input
        type="DialogueBox"
        value={DialogueBox}
        onChange={(e) => setDialogueBox(e.target.value)}
        placeholder="Description"
        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
      />
    );
  }
  
  export default DialogueBoxInput;
  