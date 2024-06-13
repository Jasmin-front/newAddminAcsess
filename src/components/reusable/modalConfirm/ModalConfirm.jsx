import Button from '../Button/Button';
import './ModalConfirm.css';

const ModalConfirm = ({ title, closeModal, confirm, isLoading }) => {
	return (
		<div className='modal-background'>
			<div className='modal-delete' onClick={e => e.stopPropagation()}>
				<div className='modal-delete-title'>
					<p>{title}</p>
				</div>
				<div className='delete-btns'>
					<button onClick={closeModal} className='btn btn_without_theme btn-delete'>
						Нет
					</button>
					<Button onClick={confirm} isLoading={isLoading} className='btn btn_without_theme btn-delete'>
						Да
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ModalConfirm;
