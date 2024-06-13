import { useDispatch, useSelector } from 'react-redux';
import './UserPayment.css';
import '../UsersDocument/UserDocument.css';
import { useEffect, useState } from 'react';
import Modal from '../../../components/reusable/Modal/Modal.jsx';
import { useModal } from '../../../components/reusable/Modal/useModal.js';
import { useParams } from 'react-router-dom';
import { fetchPayments, fetchRefunds } from '../../../entity/reducerPayment/paymentReducer.js';
import AddUserPayment from './AddUserPayment.jsx';
import AddUserRefunds from './AddUserRefunds.jsx';
import PaymentDelete from './PaymentDelete.jsx';
import EditIcon from '../../../assets/edit.svg?react';
import RefundDelete from './RefundsDelete.jsx';

const getDate = date => {
	return new Date(date).toDateString();
};

const UserPayment = () => {
	const { usersId } = useParams();
	const { payment, refunds } = useSelector(state => state.payments);
	const [isEditPayment, setIsEditPayment] = useState(null);
	const [isEditRefund, setIsEditRefund] = useState(null);
	const dispatch = useDispatch();
	const { open, openModal, closeModal } = useModal();
	const { open: open1, openModal: openModal1, closeModal: closeModal1 } = useModal();

	useEffect(() => {
		dispatch(fetchPayments(usersId));
		dispatch(fetchRefunds(usersId));
	}, []);

	const handleCloseUserPayment = () => {
		closeModal();
		if (isEditPayment) setIsEditPayment(null);
	};
	const handleCloseUserRefund = () => {
		closeModal1();
		if (isEditPayment) setIsEditRefund(null);
	};

	const handleOpenEditPaymentModal = payment => {
		setIsEditPayment(payment);
		openModal();
	};

	const handleOpenEditRefundModal = refund => {
		setIsEditRefund(refund);
		openModal1();
	};

	return (
		<div className='payment-main'>
			<div className='user-document-main-container'>
				<div className='user-document-main-container-btn'>
					<span className='btn user-document-top-botom user-document-top-botom-unset'>Оплата</span>
					<button className='btn user-document-top-botom' onClick={openModal}>
						Добавить
					</button>
				</div>
				<div className='result_payment'>
					{payment.loading && <div style={{ display: 'flex', justifyContent: 'center' }} aria-busy={true}></div>}
					{payment.data?.length >= 1 ? (
						payment.data.map(payment => (
							<div key={payment.id} className='user-payment-holder'>
								<div className='user-payment-top'>
									<p className='user-payment-text'>{payment.amount}</p>
									<div className='user-payment-actions'>
										<button onClick={() => handleOpenEditPaymentModal(payment)} className='btn_icon'>
											<EditIcon width={26} height={24} />
										</button>
										<PaymentDelete client_id={usersId} id={payment.id} />
									</div>
								</div>
								<p className='user-payment-date user-payment-text'>{payment.uploaded_at} </p>
								<p className='user-payment-text'>{payment.title} </p>
							</div>
						))
					) : (
						<div>Пока нет данных</div>
					)}
				</div>
				<Modal title={'Оплата'} show={open} onClose={handleCloseUserPayment}>
					<AddUserPayment isEditData={isEditPayment} userId={usersId} closeModal={handleCloseUserPayment} />
				</Modal>
			</div>
			<div className='user-document-main-container'>
				<div className='user-document-main-container-btn'>
					<span className='btn user-document-top-botom user-document-top-botom-unset'>Возврат</span>
					<button className='btn user-document-top-botom' onClick={openModal1} id='user-document-top-botom'>
						Добавить
					</button>
				</div>
				<div className='result_payment'>
					{refunds.loading && <div style={{ display: 'flex', justifyContent: 'center' }} aria-busy={true}></div>}
					{refunds.data?.length >= 1 ? (
						refunds.data.map(refund => (
							<div key={refund.id} className='user-payment-holder'>
								<div className='user-payment-top'>
									<p className='user-payment-text'>{refund.amount}</p>
									<div className='user-payment-actions'>
										<button onClick={() => handleOpenEditRefundModal(refund)} className='btn_icon'>
											<EditIcon width={26} height={24} />
										</button>
										<RefundDelete client_id={usersId} id={refund.id} />
									</div>
								</div>
								<p className='user-payment-date user-payment-text'>{refund.uploaded_at} </p>
								<p className='user-payment-text'>{refund.title} </p>
							</div>
						))
					) : (
						<div>Пока нет данных</div>
					)}
				</div>
				<Modal title={'Возврат'} show={open1} onClose={handleCloseUserRefund}>
					<AddUserRefunds isEditData={isEditRefund} userId={usersId} closeModal={handleCloseUserRefund} />
				</Modal>
			</div>
		</div>
	);
};

export default UserPayment;
