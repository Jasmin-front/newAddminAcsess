import React, { useEffect } from "react";
import './ModalDelete.css';

const ModalDelete = ({ closeModal, handleDelete }) => {
    useEffect(() => {
        document.body.classList.add('no-scroll');

        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);

    return (
        <div className='modal-background' >
            <div className='modal-delete' onClick={(e) => e.stopPropagation()}>
                <div className='modal-delete-title'>
                    <p>Вы уверены, что хотите удалить?</p>
                </div>
                <div className='delete-btns'>
                    <button onClick={closeModal} className='btn-delete'>Нет</button>
                    <button onClick={handleDelete} className='btn-delete'>Да</button>
                </div>
            </div>
        </div>
    );
};

export default ModalDelete;
