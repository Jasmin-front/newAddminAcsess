import { Link, useLocation, useNavigate } from 'react-router-dom';
import moon from '../../assets/header/moon.png';
import together from '../../assets/header/Together.png';
import './header.css';

const Header = ({ onLogout }) => {
	const location = useLocation();
	const navigate = useNavigate();

	const handleLogout = () => {
		onLogout();
		navigate('/');
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
							Status
						</Link>
					</li>
					<li>
						<Link
							className={`link-no-underline ${location.pathname === '/country' ? 'active-link' : ''}`}
							to={'/country'}
						>
							Country
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
					<div className='moon-block'>
						<img className='moon' src={moon} alt='moon' />
					</div>
					<button className='header-btn' onClick={handleLogout}>
						Выйти
					</button>
				</div>
			</ul>
		</header>
	);
};

export default Header;
