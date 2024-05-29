import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './UserProfile.css';

const UserProfile = () => {
    const { user } = useSelector(state => state.getUsers);
    const [showMother, setShowMother] = useState(false);
    const [showFather, setShowFather] = useState(false);
    const [showFriend, setShowFriend] = useState(false);
    const [showChildren, setShowChildren] = useState(false);

    const renderField = (label, value) => {
        if (value) {
            return (
                <div className="field">
                    <p>{label}:</p> {value}
                </div>
            );
        }
        return null;
    };

    const toggleSection = (section) => {
        switch (section) {
            case 'mother':
                setShowMother(!showMother);
                break;
            case 'father':
                setShowFather(!showFather);
                break;
            case 'friend':
                setShowFriend(!showFriend);
                break;
            case 'children':
                setShowChildren(!showChildren);
                break;
            default:
                break;
        }
    };

    const renderPerson = (label, person) => {
        return (
            <div className={`content ${person ? 'active' : ''}`}>
                {person && (
                    <>
                        {renderField('Имя', person.name)}
                        {renderField('Дата рождения', person.birthDate)}
                        {renderField('Номер телефона', person.phone)}
                    </>
                )}
                {!person && <p>{label} не указан</p>}
            </div>
        );
    };

    return (
        <div className="user-profile">
            {user ? (
                <>
                    {renderField('Место рождения', user.birthPlace)}
                    {renderField('Место жительства', user.residence)}
                    {renderField('Загранпаспорт', user.passportNumber)}
                    {renderField('Дата выдачи загранпаспорта', user.passportIssueDate)}
                    {renderField('Дата оканчания загранпаспорта', user.passportExpirationDate)}
                    {renderField('Орган выдачи загранпаспорта', user.passportIssuingAuthority)}
                    {renderField('Email', user.email)}
                    {renderField('Уровень английского', user.englishLevel)}
                    {renderField('Семейное положение', user.familyStatus)}
                    {renderField('Страна', user.country)}

                    <button className="collapsible" onClick={() => toggleSection('children')}>
                        Дети
                    </button>
                    {showChildren && (
                        <div className={`content ${showChildren ? 'active' : ''}`}>
                            {user.children && user.children.length > 0 ? (
                                <ul>
                                    {user.children.map((child, index) => (
                                        <li key={index}>
                                            {renderPerson('Ребенок', child)}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Нет данных о детях</p>
                            )}
                        </div>
                    )}

                    <button className="collapsible" onClick={() => toggleSection('mother')}>
                        Мать
                    </button>
                    {showMother && renderPerson('Мать', user.mother)}

                    <button className="collapsible" onClick={() => toggleSection('father')}>
                        Отец
                    </button>
                    {showFather && renderPerson('Отец', user.father)}

                    <button className="collapsible" onClick={() => toggleSection('friend')}>
                        Друг
                    </button>
                    {showFriend && renderPerson('Друг', user.friend)}
                </>
            ) : (
                <div>
                    <span>LOADING...</span>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
