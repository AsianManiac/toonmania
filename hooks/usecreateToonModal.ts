import { create } from "zustand"

interface CreateToonModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useCreateToonModal = create<CreateToonModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))

export default useCreateToonModal