import Input from '../../components/reusable/Input/Input.jsx';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './Home.css';
import trash from '../../assets/Home/trash.png';
import { deleteUserid, getDataUsers } from '../../entity/getDataUser/getInfoUserReducer.js';
import { useModal } from '../../components/reusable/Modal/useModal.js';
import { Link } from 'react-router-dom';
import ModalConfirm from '../../components/reusable/modalConfirm/ModalConfirm.jsx';

const Home = () => {
	const [userId, setUserId] = useState();
	const dispatch = useDispatch();
	const { open, closeModal, openModal } = useModal();

	const openModalDelete = e => {
		e.preventDefault();
		e.stopPropagation();
		openModal();
	};

	const closeModalDelete = () => {
		closeModal();
	};
	const deleteUser = () => {
		closeModal();
		dispatch(deleteUserid(userId));
	};

	useEffect(() => {
		dispatch(getDataUsers());
	}, []);
	const { users } = useSelector(state => state.getUsers);

	const getStatusClass = status => {
		switch (status) {
			case 'Ждет':
				return 'waiting';
			case 'Улетел':
				return 'departed';
			case 'Новый':
				return 'new';
			case 'Виза в очереди':
				return 'visa-queue';
			case 'Приглашен (а)':
				return 'invited';
			case 'Отказ':
				return 'refusal';
			case 'Возрат':
				return 'return';
			default:
				return '';
		}
	};

	return (
		<div className='home'>
			<Input />
			<div className='home-container'>
				{users ? (
					users.map((item, index) => (
						<Link to={`/users/${item.id}`} key={index} className={`card_main ${getStatusClass(item.status)}`}>
							<div className='card_main-top'>
								<span className='currentLastName'>
									{item.currentLastName} {item.firstName} {item.birthLastName}
								</span>
								<span className='birthDate'>{item.birthDate}</span>
							</div>
							<div className='status-block'>
								<p className='card_main-middle'>{item.country}</p>
								<span className={`${getStatusClass(item.status)} card_status_user`}>{item.status}</span>
								<img
									src={trash}
									className='trash'
									onClick={e => {
										setUserId(item.id);
										openModalDelete(e);
									}}
									alt='trash'
								/>
							</div>
						</Link>
					))
				) : (
					<div>
						<span>LOADING...</span>
					</div>
				)}
				{open && (
					<ModalConfirm title='Вы уверены, что хотите удалить?' confirm={deleteUser} closeModal={closeModalDelete} />
				)}
			</div>
		</div>
	);
};

export default Home;
