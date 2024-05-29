import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ArrowDown from '../../../assets/addAnketa/arrow-down.svg?react';
import './UserProfile.css';

const UserProfile = () => {
	const { user } = useSelector(state => state.getUsers);
	const [toggleInput, setToggleInput] = useState(null);
	const handleToggleInput = param => {
		setToggleInput(prev => (prev !== param ? param : null));
	};
	const renderField = (label, value) => {
		if (value) {
			return (
				<div className='field'>
					<p>{label}:</p> {value}
				</div>
			);
		}
		return null;
	};

	const renderPerson = (label, person) => {
		if (person)
			return (
				<>
					{renderField(label, '')}
					{renderField('Имя', person.name)}
					{renderField('Дата рождения', person.birthDate)}
					{renderField('Номер телефона', person.phone)}
				</>
			);
	};

	const showChildren = toggleInput === 'children';
	const showMother = toggleInput === 'mother';
	const showFather = toggleInput === 'father';
	const showFriend = toggleInput === 'friend';

	return (
		<div className='user-profile'>
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

					<button className='addAnketa-bottom-input' type='button' onClick={() => handleToggleInput('children')}>
						{showChildren ? 'Скрыть ' : 'Дети'}
						<ArrowDown className={showChildren ? 'arrowDown' : ''} />
					</button>
					{showChildren && user.children && user.children.length > 0
						? user.children.map((child, index) => (
								<div key={index} className='child-info'>
									{renderField('Ребенок', index + 1)}
									{renderField('Имя', child.name)}
									{renderField('Дата рождения', child.birthDate)}
								</div>
						  ))
						: renderField('Нет данных о детях', '')}

					<button className='addAnketa-bottom-input' type='button' onClick={() => handleToggleInput('mother')}>
						{showMother ? 'Скрыть ' : 'Мать'}
						<ArrowDown className={showMother ? 'arrowDown' : ''} />
					</button>

					{showMother && renderPerson('Мать', user.mother)}

					<button className='addAnketa-bottom-input' type='button' onClick={() => handleToggleInput('father')}>
						{showFather ? 'Скрыть ' : 'Отец'}
						<ArrowDown className={showFather ? 'arrowDown' : ''} />
					</button>
					{showFather && renderPerson('Отец', user.father)}

					<button className='addAnketa-bottom-input' type='button' onClick={() => handleToggleInput('friend')}>
						{showFriend ? 'Скрыть ' : 'Близкий друг'}
						<ArrowDown className={showFriend ? 'arrowDown' : ''} />
					</button>
					{showFriend && renderPerson('Близкий друг', user.friend)}
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
