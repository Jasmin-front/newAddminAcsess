import { useState } from 'react';
export const useModal = (openInitial = false) => {
	const [open, setOpen] = useState(openInitial);

	const closeModal = () => {
		setOpen(false);
		document.body.classList.remove('no-scroll');
	};
	const toggleModal = () => {
		setOpen(prev => !prev);
		if (document.body.classList.contains('no-scroll')) {
			document.body.classList.remove('no-scroll');
		} else {
			document.body.classList.add('no-scroll');
		}
	};
	const openModal = () => {
		setOpen(true);
		document.body.classList.add('no-scroll');
	};
	return { open, toggleModal, openModal, closeModal };
};
