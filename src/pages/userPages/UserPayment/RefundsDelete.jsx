import TrashIcon from '../../../assets/trash.svg?react';
import { useRequest } from '../../../api/requester';
import ModalConfirm from '../../../components/reusable/modalConfirm/ModalConfirm';
import { useModal } from '../../../components/reusable/Modal/useModal';
import { useDispatch } from 'react-redux';
import { fetchRefunds } from '../../../entity/reducerPayment/paymentReducer';

const RefundDelete = ({ client_id, id }) => {
	const { open, closeModal, openModal } = useModal();
	const dispatch = useDispatch();
	const { loading, request } = useRequest('delete');
	const openModalDelete = e => {
		e.preventDefault();
		e.stopPropagation();
		openModal();
	};
	const closeModalDelete = e => {
		e.preventDefault();
		closeModal();
	};
	const handleDelete = async e => {
		e.preventDefault();
		await request(`/workers/client/${client_id}/refunds/${id}/`);
		await dispatch(fetchRefunds(client_id));
		closeModal();
	};
	return (
		<>
			<button
				className='btn_icon'
				onClick={e => {
					openModalDelete(e);
				}}
			>
				<TrashIcon />
			</button>
			{open && (
				<ModalConfirm
					isLoading={loading}
					title='Вы уверены, что хотите удалить?'
					confirm={handleDelete}
					closeModal={closeModalDelete}
				/>
			)}
		</>
	);
};

export default RefundDelete;
