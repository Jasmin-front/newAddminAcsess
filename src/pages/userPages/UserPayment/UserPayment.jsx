import { useSelector } from 'react-redux';
import './UserPayment.css';
import '../UsersDocument/UserDocument.css';
import React, { useEffect, useState } from 'react';
import Modal from '../../../components/reusable/Modal/Modal.jsx';
import AddUserPayment from './AddUserPayment.jsx';
import { useModal } from '../../../components/reusable/Modal/useModal.js';
import { useRequest } from '../../../api/requester.js';
import { useParams } from 'react-router-dom';

const UserPayment = () => {
	const { usersId } = useParams();
	const { request, data: payments, loading, error } = useRequest();
	const { user } = useSelector(state => state.getUsers);
	const { open, openModal, closeModal } = useModal();
	const { open: open1, openModal: openModal1, closeModal: closeModal1 } = useModal();
	useEffect(() => {
		request(`/workers/client/${usersId}/payments/`);
	}, []);

	return (
		<div className='payment-main'>
			<div className='user-document-main-container'>
				<div className='user-document-main-container-btn'>
					<span className='user-document-top-botom'>Оплата</span>
					<button className='user-document-top-botom' onClick={openModal} id='user-document-top-botom'>
						Добавить
					</button>
				</div>
				<div className='result_payment'></div>
				<Modal title={'Оплата'} show={open} onClose={closeModal}>
					<AddUserPayment closeModal={closeModal} />
				</Modal>
			</div>
			<div className='user-document-main-container'>
				<div className='user-document-main-container-btn'>
					<span className='user-document-top-botom'>Возврат</span>
					<button className='user-document-top-botom' onClick={openModal1} id='user-document-top-botom'>
						Добавить
					</button>
				</div>
				<Modal title={'Возврат'} show={open1} onClose={closeModal1}>
					<AddUserPayment closeModal={closeModal1} />
				</Modal>
			</div>
		</div>
	);
};

export default UserPayment;
