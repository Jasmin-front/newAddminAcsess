import { useEffect } from 'react';
import './UserDocument.css';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../components/reusable/Modal/useModal.js';
import Modal from '../../../components/reusable/Modal/Modal.jsx';
import AddUserDocumentForm from './AddUserDocumentForm.jsx';
import EditIcon from '../../../assets/edit.svg?react';
import TrashIcon from '../../../assets/trash.svg?react';
import { useParams } from 'react-router-dom';
import { useRequest } from '../../../api/requester.js';

const UserDocument = () => {
	const { user } = useSelector(state => state.getUsers);
	const { usersId } = useParams();
	const { open, openModal, closeModal } = useModal();
	const { request, data: documents } = useRequest();

	useEffect(() => {
		request(`/workers/client/${usersId}/documents/`);
	}, []);

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
			<div className='user-document-content'>
				<div className='user-document-holder'>
					<div className='user-document-top'>
						<p className='user-document-text'>Visa</p>
						<div className='user-document-actions'>
							<button className='btn_icon'>
								<EditIcon width={26} height={24} />
							</button>
							<button className='btn_icon'>
								<TrashIcon />
							</button>
						</div>
					</div>
					<p className='user-document-text'>Вложенных документов: 2</p>
				</div>
			</div>
			<Modal title={'Create new document'} show={open} onClose={closeModal}>
				<AddUserDocumentForm id={user.id} onClose={closeModal} onSubmit={handleFileUpload} />
			</Modal>
		</div>
	);
};

export default UserDocument;
