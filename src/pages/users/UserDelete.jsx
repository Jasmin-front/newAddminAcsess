import { useModal } from '../../components/reusable/Modal/useModal';
import TrashIcon from '../../assets/trash.svg?react';
import ModalConfirm from '../../components/reusable/modalConfirm/ModalConfirm';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserid } from '../../entity/getDataUser/getInfoUserReducer';
import { useNavigate } from 'react-router-dom';

const UserDelete = ({ id, params }) => {
	const { open, closeModal, openModal } = useModal();
	const { loading } = useSelector(state => state.getUsers);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const openModalDelete = e => {
		e.preventDefault();
		e.stopPropagation();
		openModal();
	};
	const closeModalDelete = e => {
		e.preventDefault();
		closeModal();
	};
	const deleteUser = e => {
		e.preventDefault();
		dispatch(deleteUserid({ id, params, navigate }));
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
					confirm={deleteUser}
					closeModal={closeModalDelete}
				/>
			)}
		</>
	);
};

export default UserDelete;
