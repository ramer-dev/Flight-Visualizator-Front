/* @/hooks/useModal.tsx */
import { useState } from "react";

const useConfirm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openConfirm = () => {
    setIsOpen(true);
  };
  const closeConfirm = () => {
    setIsOpen(false)
  };
  return { isOpen, openConfirm, closeConfirm };
};

export default useConfirm;