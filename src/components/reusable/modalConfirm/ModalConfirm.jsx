import './ModalConfirm.css';

const ModalConfirm = ({ title, closeModal, confirm }) => {
	return (
		<div className='modal-background'>
			<div className='modal-delete' onClick={e => e.stopPropagation()}>
				<div className='modal-delete-title'>
					<p>{title}</p>
				</div>
				<div className='delete-btns'>
					<button onClick={closeModal} className='btn-delete'>
						Нет
					</button>
					<button onClick={confirm} className='btn-delete'>
						Да
					</button>
				</div>
			</div>
		</div>
	);
};

export default ModalConfirm;
