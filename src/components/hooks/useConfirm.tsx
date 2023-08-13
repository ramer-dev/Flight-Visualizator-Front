/* @/hooks/useModal.tsx */
import { useState } from "react";

const useConfirm = () => {
  const [isConfirmOpen, setIsOpen] = useState<boolean>(false);
  const openConfirm = () => {
    setIsOpen(true);
  };
  const closeConfirm = () => {
    setIsOpen(false)
  };
  return { isConfirmOpen, openConfirm, closeConfirm };
};

export default useConfirm;