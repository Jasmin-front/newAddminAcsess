import {useState} from "react";
export const useModal = (openInitial=false) => {
    const [open,setOpen] = useState(openInitial)
    const closeModal = () => {
        setOpen(false)
    }
    const toggleModal = () => {
        setOpen(prev=>!prev)
    }
    const openModal = () => {
        setOpen(true)
    }
    return {open, toggleModal, openModal,closeModal}
}