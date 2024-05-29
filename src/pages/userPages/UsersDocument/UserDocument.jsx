// UserDocument.jsx

import React from "react";
import "./UserDocument.css";
import { useSelector } from "react-redux";
import { useModal } from "../../../components/reusable/Modal/useModal.js";
import Modal from "../../../components/reusable/Modal/Modal.jsx";
import AddUserDocumentForm from "./AddUserDocumentForm.jsx";

const UserDocument = () => {
    const { user } = useSelector((state) => state.getUsers);
    const { open, openModal, closeModal } = useModal();

    const handleFileUpload = (formData) => {
        // Here you can dispatch an action to upload the file or handle the upload logic
        // For example, you can dispatch an action to upload the file to the server
        // dispatch(uploadFile(formData));
        // After successful upload, close the modal
        closeModal();
    };

    return (
        <div className="user-document-main-container">
            <div className="user-document-main-container-btn">
                <span className="user-document-top-botom">Документ</span>
                <button onClick={openModal} className="user-document-top-botom" id="user-document-top-botom">
                    +New
                </button>
            </div>
            <Modal title={"Create new document"} show={open} onClose={closeModal}>
                <AddUserDocumentForm onSubmit={handleFileUpload} />
            </Modal>
        </div>
    );
};

export default UserDocument;
