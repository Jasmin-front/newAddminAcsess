import { useDispatch } from 'react-redux';
import Moon from '../../assets/header/moon.svg?react';
import './ThemeBtn.css';
import { toggleTheme } from './ThemeReducer';

const ThemeBtn = () => {
	const dispatch = useDispatch();
	return (
		<button onClick={() => dispatch(toggleTheme())} className='moon-block'>
			<Moon />
		</button>
	);
};

export default ThemeBtn;

