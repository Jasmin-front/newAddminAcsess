import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDataUserId } from '../../entity/getDataUser/getInfoUserReducer.js';
import HeaderProfile from '../../components/HeaderProfile/HeaderProfile.jsx';
import ProfileLayout from '../../components/PrfileLayout/ProfileLayout.jsx';
import EditIcon from '../../assets/edit.svg?react';
import './User.css';

const User = () => {
	const dispatch = useDispatch();
	const { user } = useSelector(state => state.getUsers);
	const { usersId } = useParams();
	useEffect(() => {
		dispatch(getDataUserId(usersId));
	}, [dispatch, usersId]);
	return (
		<div className='main-user'>
			<HeaderProfile />
			<div className='main-user-profile'>
				<div className='main-user-images'>{user.image && <img src={user.image} alt='' />}</div>
				<div className='prfile-user-midlle'>
					<div className='user-data-title'>
						<h4>
							{user.currentLastName} {user.firstName} {user.birthLastName}
						</h4>
					</div>
					<div className='user-data-text'>
						<p>Дата рождения: {user.birthDate}</p>
					</div>
					<div className='user-data-span'>
						<span>Рост: {user.height}</span>
						<span>Вес: {user.weight}</span>
					</div>
				</div>
				<Link to={`/users/${usersId}/editProfile`} className='profile-user-busket'>
					<button className='btn_icon'>
						<EditIcon />
					</button>
				</Link>
				<div className='profile-user-status'>
					<h3>{user.status}</h3>
				</div>
			</div>
			<ProfileLayout />
		</div>
	);
};

export default User;
