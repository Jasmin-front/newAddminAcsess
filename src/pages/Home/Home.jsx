import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDataUsers, deleteUserid } from "../../features/getDataUser/getInfoUserReducer.js";
import Input from "../../components/reusable/Input/Input.jsx";
import ModalDelete from "../../components/reusable/ModalDelete/ModalDelete.jsx";
import trash from '../../assets/Home/trash.png';
import './Home.css';

const Home = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const openModalDelete = (e, userId) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedUserId(userId);
        setShowModal(true);
    };

    const closeModalDelete = () => {
        setShowModal(false);
        setSelectedUserId(null);
    };

    const handleDeleteUser = () => {
        dispatch(deleteUserid(selectedUserId));
        closeModalDelete();
    };

    useEffect(() => {
        dispatch(getDataUsers());
    }, [dispatch]);

    const { users } = useSelector((state) => state.getUsers);

    const getStatusClass = (status) => {
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
                                <span className='currentLastName'>{item.currentLastName} {item.firstName} {item.birthLastName}</span>
                                <span className='birthDate'>{item.birthDate}</span>
                            </div>
                            <p className='card_main-middle'>{item.country}</p>
                            <div className='status-block'>
                                <span className={getStatusClass(item.status)}>{item.status}</span>
                                <img
                                    src={trash}
                                    className='trash'
                                    onClick={(e) => openModalDelete(e, item.id)}
                                    alt="trash"
                                />
                            </div>
                        </Link>
                    ))
                ) : (
                    <div>
                        <span>LOADING...</span>
                    </div>
                )}
                {showModal && (
                    <ModalDelete
                        closeModal={closeModalDelete}
                        handleDelete={handleDeleteUser}
                    />
                )}
            </div>
        </div>
    );
};

export default Home;
