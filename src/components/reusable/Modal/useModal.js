import { useEffect, useState } from 'react';
export const useModal = (openInitial = false) => {
	const [open, setOpen] = useState(openInitial);

	useEffect(() => {
		console.log(open);
		if (open) {
			document.body.classList.add('no-scroll');
		} else {
			document.body.classList.remove('no-scroll');
		}
	}, [open]);

	const closeModal = () => {
		setOpen(false);
		document.body.classList.remove('no-scroll');
	};

	const toggleModal = () => {
		setOpen(prev => !prev);
	};

	const openModal = () => {
		setOpen(true);
		document.body.classList.add('no-scroll');
	};
	return { open, toggleModal, openModal, closeModal };
};
