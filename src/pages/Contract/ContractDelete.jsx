import TrashIcon from '../../assets/trash.svg?react';
import ModalConfirm from '../../components/reusable/modalConfirm/ModalConfirm';
import { useModal } from '../../components/reusable/Modal/useModal';

const ContractDelete = ({ handleDelete, isLoading }) => {
	const { open, closeModal, openModal } = useModal();
	const openModalDelete = e => {
		e.preventDefault();
		e.stopPropagation();
		openModal();
	};
	const closeModalDelete = e => {
		e.preventDefault();
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
					isLoading={isLoading}
					title='Вы уверены, что хотите удалить?'
					confirm={async () => {
						await handleDelete();
						closeModal();
					}}
					closeModal={closeModalDelete}
				/>
			)}
		</>
	);
};

export default ContractDelete;
