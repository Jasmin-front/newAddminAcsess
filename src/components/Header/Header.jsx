import { Link, useLocation } from 'react-router-dom';
import together from '../../assets/header/Together.png';
import './header.css';
import { useModal } from '../reusable/Modal/useModal.js';
import ModalConfirm from '../reusable/modalConfirm/ModalConfirm.jsx';
import ThemeBtn from '../../features/themeChanger/ThemeBtn.jsx';
import { useDispatch } from 'react-redux';
import { logout } from '../../entity/loginReducer/loginReducer.js';

const Header = () => {
	const location = useLocation();
	const dispatch = useDispatch();

	const { open, closeModal, openModal } = useModal();
	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<header>
			<ul className='header-main'>
				<div className='header-left'>
					<Link className={`link-no-underline ${location.pathname === '/' ? 'active-link' : ''}`} to={'/'}>
						<img className='together' src={together} alt='' />
					</Link>
				</div>
				<ul className='header-middle'>
					<li>
						<Link
							className={`link-no-underline ${location.pathname === '/status' ? 'active-link' : ''}`}
							to={'/status'}
						>
							Статус
						</Link>
					</li>
					<li>
						<Link
							className={`link-no-underline ${location.pathname === '/country' ? 'active-link' : ''}`}
							to={'/country'}
						>
							Страны
						</Link>
					</li>
					<li>
						<Link
							className={`link-no-underline ${location.pathname === '/addAnketa' ? 'active-link' : ''}`}
							to={'/addAnketa'}
						>
							Добавить анкету
						</Link>
					</li>
				</ul>
				<div className='header-right'>
					<ThemeBtn />
					<button className='header-btn' onClick={openModal}>
						Выйти
					</button>
				</div>
				{open && (
					<ModalConfirm title={'Вы уверены, что хотите выйти?'} closeModal={closeModal} confirm={handleLogout} />
				)}
			</ul>
		</header>
	);
};

export default Header;
