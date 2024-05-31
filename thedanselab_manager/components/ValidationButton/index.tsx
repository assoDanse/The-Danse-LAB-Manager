type ValidationButtonProps = {
  text: string; // Déclaration que 'text' est une chaîne de caractères
};

function ValidationButton({ text }: ValidationButtonProps) {
  // Utiliser le type pour les props
  return (
    <div className="flex flex-wrap gap-2">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded min-w-full"
        type="submit"
      >
        {text}
      </button>
    </div>
  );
}

export default ValidationButton;
