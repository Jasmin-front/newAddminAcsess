import React, { useState } from 'react';
import './Status.css';
import Input from '../../components/reusable/Input/Input.jsx';
import FiltrationStatus from '../../components/FiltrationStatus/FiltrationStatus.jsx';

const Status = () => {
    const [clickedText, setClickedText] = useState(null);

    const handleClick = (text) => {
        if (clickedText === text) {
            setClickedText(null);
        } else {
            setClickedText(text);
        }
    };

    return (
        <div className='status-main'>
            <Input />
            <div className='main-status'>
                <FiltrationStatus text='Ждет визу' clickedText={clickedText} handleClick={handleClick} />
                <FiltrationStatus text='Ждет приглашение' clickedText={clickedText} handleClick={handleClick} />
                <FiltrationStatus text='Улетел' clickedText={clickedText} handleClick={handleClick} />
                <FiltrationStatus text='Новый' clickedText={clickedText} handleClick={handleClick} />
                <FiltrationStatus text='Виза в очереди' clickedText={clickedText} handleClick={handleClick} />
                <FiltrationStatus text='Приглашен (а)' clickedText={clickedText} handleClick={handleClick} />
                <FiltrationStatus text='Отказ' clickedText={clickedText} handleClick={handleClick} />
                <FiltrationStatus text='Возрат' clickedText={clickedText} handleClick={handleClick} />
            </div>
        </div>
    );
};

export default Status;
