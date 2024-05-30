import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../entity/loginReducer/loginReducer';

const Login = ({ onLogin }) => {
	const disptach = useDispatch();
	useEffect(() => {
		disptach(getUserData());
	}, []);
	const login = useSelector(state => state.userData.user);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = data => {
		reset();
		if (data.username === 'ars' && data.password === 'ars') {
			onLogin(true);
		} else {
			alert('Неправильный логин или пароль');
		}
	};

	return (
		<div className='login'>
			<form className='login-main' onSubmit={handleSubmit(onSubmit)}>
				<div className='logine-title'>
					<h4 className='login-text'>Together Recruitment</h4>
				</div>
				<input
					type='text'
					className='login-input'
					placeholder='Username'
					{...register('username', { required: true })}
				/>
				<input
					type='password'
					className='login-input'
					placeholder='Password'
					{...register('password', { required: true })}
				/>
				<button className='login-btn' type='submit'>
					Войти
				</button>
			</form>
		</div>
	);
};

export default Login;
