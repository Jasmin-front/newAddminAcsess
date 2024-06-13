import { useEffect, useState } from 'react';
import './UserDocument.css';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../components/reusable/Modal/useModal.js';
import Modal from '../../../components/reusable/Modal/Modal.jsx';
import AddUserDocumentForm from './AddUserDocumentForm.jsx';
import EditIcon from '../../../assets/edit.svg?react';
import { useParams } from 'react-router-dom';
import { fetchDocuments } from '../../../entity/documentsReducer/documentsReducer.js';
import UserDocumentDelete from './UserDocumentDelete.jsx';

const UserDocument = () => {
	const { user } = useSelector(state => state.getUsers);
	const { usersId } = useParams();
	const dispatch = useDispatch();
	const { open, openModal, closeModal } = useModal();
	const { data, loading, error } = useSelector(state => state.documents.documents);
	const [editData, setEditData] = useState(null);

	useEffect(() => {
		dispatch(fetchDocuments(usersId));
	}, []);

	const handleOpenEditModal = item => {
		setEditData(item);
		openModal();
	};
	const handleCloseEditModal = () => {
		if (editData) setEditData(null);
		closeModal();
	};

	if (loading) return <div style={{ display: 'flex', justifyContent: 'center' }} aria-busy={true}></div>;
	if (error) {
		console.error(error);
		return <p style={{ color: 'red' }}>{error}</p>;
	}

	return (
		<div className='user-document-main-container'>
			<div className='user-document-main-container-btn'>
				<span style={{ cursor: 'default' }} className='btn user-document-top-botom user-document-top-botom-unset'>
					Документ
				</span>
				<button onClick={openModal} style={{ cursor: 'pointer' }} className='btn user-document-top-botom'>
					Добавить
				</button>
			</div>
			<div className='user-document-content'>
				{data &&
					data?.map((item, index) => (
						<div key={index} className='user-document-holder'>
							<div className='user-document-top'>
								<p className='user-document-text'>{item.title}</p>
								<div className='user-document-actions'>
									<button onClick={() => handleOpenEditModal(item)} className='btn_icon'>
										<EditIcon width={26} height={24} />
									</button>
									<UserDocumentDelete client_id={usersId} id={item.id} />
								</div>
							</div>
							<p className='user-document-text'>Вложенных документов: {item.files.length}</p>
						</div>
					))}
			</div>

			<Modal title={'Create new document'} show={open} onClose={handleCloseEditModal}>
				<AddUserDocumentForm isEditData={editData} id={user.id} onClose={handleCloseEditModal} />
			</Modal>
		</div>
	);
};

export default UserDocument;
