import './Modal.css';
import Krestik from '../../../assets/krestik.svg?react';

const Modal = ({ show, onClose, children, title = '' }) => {
	if (!show) {
		return null;
	}

	return (
		<div className='modal' onClick={onClose}>
			<div className='modal_content' onClick={e => e.stopPropagation()}>
				<div className='modal_header'>
					<h4 className='modal_title'>{title}</h4>
					<button onClick={onClose}>
						<Krestik />
					</button>
				</div>
				<div className='modal_body'>{children}</div>
			</div>
		</div>
	);
};

export default Modal;
