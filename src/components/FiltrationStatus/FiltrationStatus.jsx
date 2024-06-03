import React from 'react';
import './FiltrationStatus.css';

const FiltrationStatus = ({ text, clickedText, handleClick }) => {
    return (
        <span
            className={`main-text-status ${clickedText === text ? 'orange-text' : 'gradient-text'}`}
            onClick={() => handleClick(text)}
        >
            {text}
        </span>
    );
};

export default FiltrationStatus;
