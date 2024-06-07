import React, { useEffect, useRef } from 'react';
import { useModal } from '../reusable/Modal/useModal';
import SearchIcon from '../../assets/search-normal.svg?react';
import Modal from '../reusable/Modal/Modal';
import { BASE_URL } from '../../api/requester';
import './ShowDocumentModal.css';

const ShowDocumentModal = ({ fileUrl }) => {
	const { open, openModal, closeModal } = useModal();
	const url = `${BASE_URL}${fileUrl}`;
	return (
		<>
			<button onClick={openModal} className='btn_icon'>
				<SearchIcon width={26} height={24} />
			</button>
			<Modal title={'Показ документа'} show={open} onClose={closeModal}>
				<div className='show_document_modal_iframe'>
					<iframe src={url} style={{ width: '100%', border: 'none' }} />
					<a href={url} download={'file name'}>
						<button className='btn'>Скачать</button>
					</a>
				</div>
			</Modal>
		</>
	);
};

export default ShowDocumentModal;
