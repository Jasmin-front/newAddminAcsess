import { useForm } from 'react-hook-form';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginPost } from '../../entity/loginReducer/loginReducer';
import Button from '../../components/reusable/Button/Button';

const initial = {
	username: 'Erkutbek',
	password: 'MF_deve1op',
};
const Login = () => {
	const dispatch = useDispatch();
	const { loading, error } = useSelector(state => state.userData);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = data => {
		dispatch(loginPost(data));
	};
	if (error) console.error(error);
	return (
		<div className='login'>
			<form className='login-main' onSubmit={handleSubmit(onSubmit)}>
				<div className='logine-title'>
					<h4 className='login-text'>Together Recruitment</h4>
				</div>
				<div className='login-input-wrapper'>
					<input
						type='text'
						className='input'
						placeholder='Имя пользователя'
						{...register('username', { required: true })}
						defaultValue={initial.username}
					/>
					<input
						defaultValue={initial.password}
						type='password'
						className='input'
						placeholder='Пароль'
						{...register('password', { required: true })}
					/>
					{error && <p style={{ color: 'red' }}>{typeof error === 'string' ? error : JSON.stringify(error)}</p>}
				</div>
				<Button className='btn login-btn' isLoading={loading} type='submit'>
					Войти
				</Button>
			</form>
		</div>
	);
};

export default Login;
