import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface BoutonSuppressionProps {
  onDelete: () => void;
}

const BoutonSuppression: React.FC<BoutonSuppressionProps> = ({ onDelete }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleDelete = () => {
    onDelete();
    setOpenModal(false);
  };

  return (
    <>
      <Button className=" place-content-center mt-2 mr-2" color="failure" onClick={() => setOpenModal(true)}>
        Supprimer
      </Button>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Êtes-vous sûr de vouloir le supprimer ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                Oui, je suis sûr
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Non, annuler
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BoutonSuppression;
