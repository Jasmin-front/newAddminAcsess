import '../UsersDocument/UserDocument.css';
import './UserPayment.css';
import { useForm } from 'react-hook-form';

import { useRequest } from '../../../api/requester.js';
import { useParams } from 'react-router-dom';
const AddUserPayment = ({ closeModal }) => {
	const { request, data: payments, loading, error } = useRequest('post');
	const { usersId } = useParams();

	const {
		handleSubmit,
		reset,
		watch,
		register,
		formState: { errors },
	} = useForm();

	const addPayment = async data => {
		await request(`/workers/client/${usersId}/payments/`, data);
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
					<button className='btns-document btn'>Сохранить</button>
				</div>
			</form>
		</div>
	);
};

export default AddUserPayment;
