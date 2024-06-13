import './EditAnket.css';
import AddAnketa from '../AddAnketa/AddAnketa.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import UserDelete from '../users/UserDelete.jsx';
import ArrowIcon from '../../assets/arrow-left.svg?react';
import { getDataUserId } from '../../entity/getDataUser/getInfoUserReducer.js';

const EditAnket = () => {
	const { user } = useSelector(state => state.getUsers);
	const { usersId } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getDataUserId(usersId));
	}, [dispatch, usersId]);

	return (
		<div className='edit-main'>
			<div className='edit-main-top'>
				<Link style={{ color: 'var(--color)' }} to={-1}>
					<ArrowIcon />
				</Link>
				<UserDelete id={usersId} />
			</div>
			<AddAnketa isEdit={true} userId={usersId} key={user.id} initialFormData={user} />
		</div>
	);
};

export default EditAnket;
