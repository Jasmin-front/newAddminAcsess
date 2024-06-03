import { useSelector } from 'react-redux';
import './UserProfile.css';

const UserProfile = () => {
	const { user, loading, error } = useSelector(state => state.getUsers);

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
		if (!person) return;
		return (
			<>
				{renderField(label, '')}
				{renderField('Имя', person.name)}
				{renderField('Дата рождения', person.birthDate)}
				{renderField('Номер телефона', person.phone)}
			</>
		);
	};

	if (loading) return <p>Loading...</p>;

	if (error) {
		console.error(error);
		return <p style={{ color: 'red' }}>{error}</p>;
	}

	return (
		<div className='user-profile'>
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
			{user.children?.length > 0 &&
				user.children.map((child, index) => (
					<div key={index} className='child-info'>
						{renderField('Ребенок', index + 1)}
						{renderField('Имя', child.name)}
						{renderField('Дата рождения', child.birthDate)}
					</div>
				))}
			{renderPerson('Мать', user.mother)}
			{renderPerson('Отец', user.father)}
			{renderPerson('Близкий друг', user.friend)}
		</div>
	);
};

export default UserProfile;
