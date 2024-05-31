import React from 'react';
import './UserDocument.css';
import { useSelector } from 'react-redux';
import { useModal } from '../../../components/reusable/Modal/useModal.js';
import Modal from '../../../components/reusable/Modal/Modal.jsx';
import AddUserDocumentForm from './AddUserDocumentForm.jsx';

const UserDocument = () => {
	const { user } = useSelector(state => state.getUsers);
	const { open, openModal, closeModal } = useModal();

	const handleFileUpload = formData => {
		closeModal();
	};

	return (
		<div className='user-document-main-container'>
			<div className='user-document-main-container-btn'>
				<span className='user-document-top-botom'>Документ</span>
				<button onClick={openModal} className='user-document-top-botom' id='user-document-top-botom'>
					+New
				</button>
			</div>
			<Modal title={'Create new document'} show={open} onClose={closeModal}>
				<AddUserDocumentForm id={user.id} onClose={closeModal} onSubmit={handleFileUpload} />
			</Modal>
		</div>
	);
};

export default UserDocument;
