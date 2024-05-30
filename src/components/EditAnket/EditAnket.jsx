import './EditAnket.css';
import arrowLeft from '../../assets/editProfile/arrow-left.png';
import busket from '../../assets/Home/trash.png';
import AddAnketa from '../../pages/AddAnketa/AddAnketa.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
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
				<Link to={-1}>
					<img src={arrowLeft} className='arrowLeft' alt='arowwLeft' />
				</Link>
				<img src={busket} className='busket' alt='busket' />
			</div>
			<AddAnketa isEdit={true} key={user.id} initialFormData={user} />
		</div>
	);
};

export default EditAnket;
