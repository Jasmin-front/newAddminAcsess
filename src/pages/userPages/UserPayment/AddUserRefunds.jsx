import { useEffect } from 'react';
import { useRequest } from '../../../api/requester';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { fetchRefunds } from '../../../entity/reducerPayment/paymentReducer';
import Button from '../../../components/reusable/Button/Button';

const AddUserRefunds = ({ userId, closeModal, isEditData }) => {
	const { request, loading } = useRequest('post');
	const dispatch = useDispatch();

	const {
		handleSubmit,
		reset,
		setValue,
		register,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		if (isEditData) {
			setValue('amount', isEditData.amount);
			setValue('title', isEditData.title);
		}
	}, [isEditData]);

	const addPayment = async data => {
		if (isEditData) await request(`/workers/client/${userId}/refunds/${isEditData.id}/`, data);
		else await request(`/workers/client/${userId}/refunds/`, data);
		await dispatch(fetchRefunds(userId));
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

export default AddUserRefunds;
