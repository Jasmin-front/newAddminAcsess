import './EditAnket.css';
import arrowLeft from '../../assets/editProfile/arrow-left.png';
import busket from '../../assets/Home/trash.png';
import AddAnketa from '../../pages/AddAnketa/AddAnketa.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {deleteUserid, getDataUserId} from '../../entity/getDataUser/getInfoUserReducer.js';
import {useModal} from "../reusable/Modal/useModal.js";
import ModalConfirm from "../reusable/modalConfirm/ModalConfirm.jsx";

const EditAnket = () => {
	const { user } = useSelector(state => state.getUsers);
	const nagigate = useNavigate()
	const { usersId } = useParams();
	const dispatch = useDispatch();
	const { open, closeModal, openModal } = useModal();

	const openModalDelete = (e) => {
		openModal(e);
	};

	const closeModalDelete = () => {
		closeModal();
	};
	const deleteUser = () => {
		nagigate('/')
		dispatch(deleteUserid(usersId))
	}

	useEffect(() => {
		dispatch(getDataUserId(usersId));
	}, [dispatch, usersId]);

	return (
		<div className='edit-main'>
			<div className='edit-main-top'>
				<Link to={-1}>
					<img src={arrowLeft} className='arrowLeft' alt='arowwLeft' />
				</Link>
				<img onClick={e => openModalDelete(e)} src={busket} className='busket' alt='busket' />
			</div>
			{open && <ModalConfirm title='Вы уверены, что хотите удалить?' confirm={deleteUser} closeModal={closeModalDelete} />}
			<AddAnketa isEdit={true} key={user.id} initialFormData={user} />
		</div>
	);
};

export default EditAnket;
