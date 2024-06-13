import '../UsersDocument/UserDocument.css';
import './UserPayment.css';
import { useForm } from 'react-hook-form';

import { useRequest } from '../../../api/requester.js';
import Button from '../../../components/reusable/Button/Button.jsx';
import { useDispatch } from 'react-redux';
import { fetchPayments } from '../../../entity/reducerPayment/paymentReducer.js';
import { useEffect } from 'react';
const AddUserPayment = ({ closeModal, userId, isEditData }) => {
	const { request, loading } = useRequest('post');
	const dispatch = useDispatch();
	const {
		handleSubmit,
		reset,
		register,
		setValue,
		formState: { errors },
	} = useForm();
	useEffect(() => {
		if (isEditData) {
			setValue('amount', isEditData.amount);
			setValue('title', isEditData.title);
		}
	}, [isEditData]);
	const addPayment = async data => {
		if (isEditData) await request(`/workers/client/${userId}/payments/${isEditData.id}/`, data);
		else await request(`/workers/client/${userId}/payments/`, data);
		await dispatch(fetchPayments(userId));
		reset();
		closeModal();
	};

	return (
		<div>
			<form onSubmit={handleSubmit(addPayment)} className='form-payment'>
				<div className='payment-main-title'>
					<input {...register('amount')} className='payment-money' type='number' placeholder='Сумма' />
					<input {...register('title')} className='payment-money' type='text' placeholder='Текст' />
				</div>
				<div className='perispol-btns'>
					<button onClick={closeModal} className='btns-document btn'>
						Отменить
					</button>
					<Button isLoading={loading} className='btns-document btn'>
						Сохранить
					</Button>
				</div>
			</form>
		</div>
	);
};

export default AddUserPayment;
