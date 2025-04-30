import { ReactNode } from "react";
import { create } from "zustand";

export const useModalStore = create<ModalState>((set) => ({
  modalContent: null,
  isOpen: false,
  handleOpen: (content: ReactNode) =>
    set({ modalContent: content, isOpen: true }),
  handleClose: () => set({ isOpen: false }),
}));

interface ModalState {
  modalContent: ReactNode | null;
  isOpen: boolean;
  handleOpen: (content: ReactNode) => void;
  handleClose: () => void;
}
