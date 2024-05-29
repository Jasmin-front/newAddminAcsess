import React from "react";
import './ModalDelete.css';

const ModalDelete = ({ closeModal }) => {
    return (
        <div className='modal-background' onClick={closeModal}>
            <div className='modal-delete' onClick={(e) => e.stopPropagation()}>
                <div className='modal-delete-title'>
                    <p>Вы уверены, что хотите удалить?</p>
                </div>
                <div className='delete-btns'>
                    <button onClick={closeModal} className='btn-delete'>Нет</button>
                    <button className='btn-delete'>Да</button>
                </div>
            </div>
        </div>
    );
};

export default ModalDelete;
