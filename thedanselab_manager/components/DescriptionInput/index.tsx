import React from 'react';

type DescriptionInputProps = {
  description: string;
  setDescription: (description: string) => void;
};

const DescriptionInput: React.FC<DescriptionInputProps> = ({ description, setDescription }) => {
  return (
    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Description"
      className=" border-gray-300 rounded"
      rows={4}
    />
  );
};

export default DescriptionInput;
