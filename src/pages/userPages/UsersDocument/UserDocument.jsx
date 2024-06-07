import { useEffect } from 'react';
import './UserDocument.css';
import { useSelector } from 'react-redux';
import { useModal } from '../../../components/reusable/Modal/useModal.js';
import Modal from '../../../components/reusable/Modal/Modal.jsx';
import AddUserDocumentForm from './AddUserDocumentForm.jsx';
import EditIcon from '../../../assets/edit.svg?react';
import TrashIcon from '../../../assets/trash.svg?react';
import { useParams } from 'react-router-dom';
import { useRequest } from '../../../api/requester.js';
import ShowDocumentModal from '../../../components/ShowDocumentModal/ShowDocumentModal.jsx';

const UserDocument = () => {
	const { user } = useSelector(state => state.getUsers);
	const { usersId } = useParams();
	const { open, openModal, closeModal } = useModal();
	const { request, data: documents, loading, error } = useRequest();
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
				<button
					onClick={openModal}
					style={{ cursor: 'pointer' }}
					className='user-document-top-botom'
					id='user-document-top-botom'
				>
					Добавить
				</button>
			</div>
			<div className='user-document-content'>
				{documents?.map((item, index) => (
					<div key={index} className='user-document-holder'>
						<div className='user-document-top'>
							<p className='user-document-text'>{item.title}</p>
							<div className='user-document-actions'>
								<button className='btn_icon'>
									<EditIcon width={26} height={24} />
								</button>
								<button className='btn_icon'>
									<TrashIcon />
								</button>
								<ShowDocumentModal fileUrl={item.files[0].file} />
							</div>
						</div>
						<p className='user-document-text'>Вложенных документов: {item.files.length}</p>
					</div>
				))}
			</div>
			<Modal title={'Create new document'} show={open} onClose={closeModal}>
				<AddUserDocumentForm id={user.id} onClose={closeModal} />
			</Modal>
		</div>
	);
};

export default UserDocument;
