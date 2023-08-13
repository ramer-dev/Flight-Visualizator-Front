/* @/hooks/useModal.tsx */
import { useState } from "react";

const useModal = () => {
  const [isModalOpen, setIsOpen] = useState<boolean>(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false)
  };
  return { isModalOpen, openModal, closeModal };
};

export default useModal;