import './AddAnketa.css';
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sendDataUsers } from '../../entity/getDataUserReducer/getDataUserReducer.js';
import ArrowDown from '../../assets/arrow-down.svg?react';
import { formatDateInput } from '../../utils.js';
import TrashIcon from '../../assets/trash.svg?react';

// const initialData = {
// 	birthLastName: '',
// 	currentLastName: '',
// 	firstName: '',
// 	birthDate: '',
// 	birthPlace: '',
// 	residence: '',
// 	passportNumber: '',
// 	passportIssueDate: '',
// 	passportExpirationDate: '',
// 	passportIssuingAuthority: '',
// 	email: '',
// 	password: '',
// 	height: '',
// 	weight: '',
// 	status: '',
// 	englishLevel: '',
// 	familyStatus: '',
// 	country: '',
// 	children: [],
// 	mother: {
// 		name: '',
// 		phone: '',
// 		birthDate: '',
// 	},
// 	father: {
// 		name: '',
// 		phone: '',
// 		birthDate: '',
// 	},
// 	contact: {
// 		name: '',
// 		phone: '',
// 		birthDate: '',
// 	},
// 	image: null,
// };
const initialData = {
	birthLastName: 'Smith',
	currentLastName: 'Smith',
	firstName: 'John',
	birthDate: '1990-01-01',
	birthPlace: 'New York',
	residence: 'New York',
	passportNumber: '1234567890',
	passportIssueDate: '2010-01-01',
	passportExpirationDate: '2025-01-01',
	passportIssuingAuthority: 'USA',
	email: 'john.smith@example.com',
	password: 'password123',
	height: '180',
	weight: '70',
	status: 'Ждет визу',
	englishLevel: 'Новичок',
	familyStatus: 'Холост/Не замужем',
	country: 'USA',
	children: [
		{
			name: 'Emily',
			birthDate: '2012-02-02',
		},
	],
	mother: {
		name: 'Jane Smith',
		phone: '555-1234',
		birthDate: '1960-03-03',
	},
	father: {
		name: 'John Smith Sr.',
		phone: '555-5678',
		birthDate: '1950-04-04',
	},
	contact: {
		name: 'Jane Doe',
		phone: '555-9012',
		birthDate: '1980-05-05',
	},
	image: null,
};

const AddAnketa = ({ isEdit = true, initialFormData = initialData }) => {
	const {
		register,
		handleSubmit,
		control,
		reset,
		setValue,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: initialFormData,
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'children',
	});

	const [showParentsInputs, setShowParentsInputs] = useState(false);
	const [showFriendInputs, setShowFriendInputs] = useState(false);
	const [showChildrenInputs, setShowChildrenInputs] = useState(false);
	const [showEnglishLevelInputs, setShowEnglishLevelInputs] = useState(false);
	const [showFamilyStatusInputs, setShowFamilyStatusInputs] = useState(false);
	const [showStatusOptions, setShowStatusOptions] = useState(false);
	const [showCountryOptions, setShowCountryOptions] = useState(false);
	const [previewImage, setPreviewImage] = useState(null);
	const [statusError, setStatusError] = useState('');
	const [englishLevelError, setEnglishLevelError] = useState('');
	const [familyStatusError, setFamilyStatusError] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const validate = data => {
		let formValid = true;

		if (!data.status) {
			setStatusError('Статус обязателен');
			formValid = false;
		} else {
			setStatusError('');
		}

		if (!data.englishLevel) {
			setEnglishLevelError('Уровень английского обязателен');
			formValid = false;
		} else {
			setEnglishLevelError('');
		}

		if (!data.familyStatus) {
			setFamilyStatusError('Семейный статус обязателен');
			formValid = false;
		} else {
			setFamilyStatusError('');
		}

		if (!data.mother.name && !data.father.name && !data.contact.name) {
			alert('Заполните данные одного из родителей или близкого друга');
			formValid = false;
		}
		return formValid;
	};

	const handleFormatDateInput = e => {
		e.target.value = formatDateInput(e.target.value);
	};

	const onSubmit = data => {
		if (!validate(data)) {
			return;
		}

		const formData = new FormData();

		for (const key in data) {
			if (data.hasOwnProperty(key)) {
				if (key === 'image') {
					// Добавляем изображение
					formData.append('image', data[key]);
				} else if (typeof data[key] === 'object' && data[key] !== null && !Array.isArray(data[key])) {
					// Добавляем вложенные объекты
					for (const subKey in data[key]) {
						if (data[key].hasOwnProperty(subKey)) {
							formData.append(`${key}[${subKey}]`, data[key][subKey]);
						}
					}
				} else if (Array.isArray(data[key])) {
					// Добавляем массивы объектов
					data[key].forEach((item, index) => {
						for (const subKey in item) {
							if (item.hasOwnProperty(subKey)) {
								formData.append(`${key}[${index}][${subKey}]`, item[subKey]);
							}
						}
					});
				} else {
					// Добавляем остальные типы данных
					formData.append(key, data[key]);
				}
			}
		}

		dispatch(sendDataUsers(formData));
	};

	const handleCancel = e => {
		e.stopPropagation();
		navigate('/home');
		reset();
	};

	const toggleInputs = setter => {
		setter(prev => !prev);
	};

	const handleSelect = (field, value, toggleSetter) => {
		setValue(field, value);
		toggleSetter(false);
	};

	const handleImageChange = e => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewImage(reader.result);
				setValue('image', file);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<form className='addAnketa' onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
			<div className='addAnketa_top'>
				<div className='addAnketa_top-left'>
					<label htmlFor='image-upload' className='label-file'>
						{previewImage ? (
							<img src={previewImage} alt='Preview' className='preview-image' />
						) : (
							<span>Загрузить фотографию</span>
						)}
					</label>
					<input
						id='image-upload'
						{...register('image')}
						type='file'
						className='input-file'
						accept='image/*'
						onChange={handleImageChange}
					/>
				</div>
				<div className='addAnketa_top-middle'>
					<input
						{...register('birthLastName', { required: 'Фамилия при рождении обязательна' })}
						type='text'
						className='input'
						placeholder='Фамилия при рождений'
					/>
					{errors.birthLastName && <span className='error-span'>{errors.birthLastName.message}</span>}
					<input
						{...register('currentLastName', { required: 'Нынешняя фамилия обязательна' })}
						type='text'
						className='input'
						placeholder='Нынешняя фамилия'
					/>
					{errors.currentLastName && <span className='error-span'>{errors.currentLastName.message}</span>}
					<input
						{...register('firstName', { required: 'Имя обязательно' })}
						type='text'
						className='input'
						placeholder='Имя'
					/>
					{errors.firstName && <span className='error-span'>{errors.firstName.message}</span>}
					<input
						{...register('birthDate', { required: 'Дата рождения обязательна' })}
						type='text'
						className='input'
						placeholder='Дата рождения (ДД.ММ.ГГГГ)'
						onChange={handleFormatDateInput}
					/>
					{errors.birthDate && <span className='error-span'>{errors.birthDate.message}</span>}
				</div>
				<div className='addAnketa_top-right'>
					<button
						type='button'
						className='addAnketa_top-right-title-drop-down'
						onClick={() => toggleInputs(setShowStatusOptions)}
					>
						{watch('status') || 'Статус'}
						<ArrowDown className={showStatusOptions ? 'arrowDown' : ''} />
					</button>
					{showStatusOptions && (
						<div className='status-buttons'>
							{[
								'Ждет визу',
								'Ждет приглашение',
								'Улетел',
								'Новый',
								'Виза в очереди',
								'Приглашен (а)',
								'Отказ',
								'Возрат',
							].map(option => (
								<button
									key={option}
									type='button'
									className='btn-status'
									onClick={() => handleSelect('status', option, setShowStatusOptions)}
								>
									{option}
								</button>
							))}
						</div>
					)}
					{statusError && <span className='error-message'>{statusError}</span>}
				</div>
			</div>
			<div className='addAnketa-bottom'>
				<input
					{...register('birthPlace', { required: 'Место рождения обязательно' })}
					className='input'
					type='text'
					placeholder='Место рождения (г. Ош)'
				/>
				{errors.birthPlace && <span className='error-span'>{errors.birthPlace.message}</span>}
				<input
					{...register('residence', { required: 'Место проживания обязательно' })}
					className='input'
					type='text'
					placeholder='Место проживания (г.Ош)'
				/>
				{errors.residence && <span className='error-span'>{errors.residence.message}</span>}
				<input
					{...register('passportNumber', { required: 'Номер паспорта обязателен' })}
					className='input'
					type='text'
					placeholder='Загранпаспорт (AC/PE)'
				/>
				{errors.passportNumber && <span className='error-span'>{errors.passportNumber.message}</span>}
				<input
					{...register('passportIssueDate', { required: 'Дата выдачи паспорта обязательна' })}
					className='input'
					type='text'
					placeholder='Дата выдачи загранпаспорта (ДД.ММ.ГГГГ)'
					onChange={handleFormatDateInput}
				/>
				{errors.passportIssueDate && <span className='error-span'>{errors.passportIssueDate.message}</span>}
				<input
					{...register('passportExpirationDate', { required: 'Дата окончания паспорта обязательна' })}
					className='input'
					type='text'
					placeholder='Дата окончания загранпаспорта (ДД.ММ.ГГГГ)'
					onChange={handleFormatDateInput}
				/>
				{errors.passportExpirationDate && <span className='error-span'>{errors.passportExpirationDate.message}</span>}
				<input
					{...register('passportIssuingAuthority', { required: 'Орган выдачи паспорта обязателен' })}
					className='input'
					type='text'
					placeholder='Орган выдачи загранпаспорта (SRS)'
				/>
				{errors.passportIssuingAuthority && (
					<span className='error-span'>{errors.passportIssuingAuthority.message}</span>
				)}
				<input
					{...register('email', { required: 'Email обязателен' })}
					className='input'
					type='email'
					placeholder='Почтовый адрес (azamat@gmail.com)'
				/>
				{errors.email && <span className='error-span'>{errors.email.message}</span>}
				<input
					{...register('password', { required: 'Пароль обязателен' })}
					className='input'
					type='text'
					placeholder='Пароль'
				/>
				{errors.password && <span className='error-span'>{errors.password.message}</span>}

				<div className='addAnketa-drop-down'>
					<div className='addAnketa-drop-down-input-one'>
						<input
							{...register('height', { required: 'Рост обязателен' })}
							className='input'
							type='text'
							placeholder='Рост (180cm)'
						/>
						{errors.height && <span className='error-span'> {errors.height.message}</span>}
					</div>
					<div className='addAnketa-drop-down-input-one'>
						<input
							{...register('weight', { required: 'Вес обязателен' })}
							className='input'
							type='text'
							placeholder='Вес (70kg)'
						/>
						{errors.weight && <span className='error-span'>{errors.weight.message}</span>}
					</div>
				</div>

				<div className='addAnketa-drop-down'>
					<div className='addAnketa-drop-down-one'>
						<div className='addAnketa-drop-down-input' onClick={() => toggleInputs(setShowEnglishLevelInputs)}>
							<span>
								{watch('englishLevel') ? `Уровень английского: ${watch('englishLevel')}` : 'Уровень английского'}
							</span>
							<ArrowDown className={showEnglishLevelInputs ? 'arrowDown' : ''} />
						</div>
						<div>
							{showEnglishLevelInputs && (
								<div className='english-level-buttons'>
									{['Новичок', 'Средний', 'Отличный'].map(level => (
										<button
											key={level}
											type='button'
											className={`btn-level ${watch('englishLevel') === level ? 'selected' : ''}`}
											onClick={() => handleSelect('englishLevel', level, setShowEnglishLevelInputs)}
										>
											{level}
										</button>
									))}
								</div>
							)}
							{englishLevelError && <span className='error-message'>{englishLevelError}</span>}
						</div>
					</div>
					<div className='addAnketa-drop-down-one'>
						<div className='addAnketa-drop-down-input' onClick={() => toggleInputs(setShowFamilyStatusInputs)}>
							<span>{watch('familyStatus') ? `Семейный статус: ${watch('familyStatus')}` : 'Семейный статус'}</span>
							<ArrowDown className={showFamilyStatusInputs ? 'arrowDown' : ''} />
						</div>
						<div>
							{showFamilyStatusInputs && (
								<div className='family-status-buttons'>
									{['Холост/Не замужем', 'Замужем/Женат', 'Разведен(а)'].map(status => (
										<button
											key={status}
											type='button'
											className={`btn-level ${watch('familyStatus') === status ? 'selected' : ''}`}
											onClick={() => handleSelect('familyStatus', status, setShowFamilyStatusInputs)}
										>
											{status}
										</button>
									))}
								</div>
							)}
							{familyStatusError && <span className='error-message'>{familyStatusError}</span>}
						</div>
					</div>
				</div>

				<div className='addAnketa-drop-down-country'>
					<div className='addAnketa-drop-down-input' onClick={() => toggleInputs(setShowCountryOptions)}>
						<span>{watch('country') ? `Страна: ${watch('country')}` : 'Страна'}</span>
						<ArrowDown className={showCountryOptions ? 'arrowDown' : ''} />
					</div>
					<div>
						{showCountryOptions && (
							<div className='country-buttons'>
								{[
									'Великобритания',
									'Дания',
									'Германия',
									'Польша',
									'Литва',
									'Латвия',
									'Словакия',
									'Венгрия',
									'Сербия',
									'Турция',
									'Болгария',
									'Финляндия',
									'Норвегия',
									'Нидерланды',
									'Чехия',
									'Южная Корея',
								].map(country => (
									<button
										key={country}
										type='button'
										className={`btn-level-one ${watch('country') === country ? 'selected' : ''}`}
										onClick={() => handleSelect('country', country, setShowCountryOptions)}
									>
										{country}
									</button>
								))}
							</div>
						)}
						{errors.country && <span className='error-message'>{errors.country.message}</span>}
					</div>
				</div>

				<button className='addAnketa-drop-down-input' type='button' onClick={() => toggleInputs(setShowChildrenInputs)}>
					{showChildrenInputs ? 'Скрыть ' : 'Дети'}
					<ArrowDown className={showChildrenInputs ? 'arrowDown' : ''} />
				</button>
				{showChildrenInputs && (
					<>
						{fields.map((child, index) => (
							<div key={child.id} className='child-info'>
								<span>Ребенок {index + 1}</span>
								<input {...register(`children[${index}].name`)} className='input' type='text' placeholder='ФИО' />
								<input
									{...register(`children[${index}].birthDate`)}
									className='input'
									type='text'
									placeholder='Дата рождения'
									onChange={e => {
										e.target.value = formatDateInput(e.target.value);
									}}
								/>
								<button type='button' className='btn_icon' onClick={() => remove(index)}>
									<TrashIcon />
								</button>
							</div>
						))}
						<button type='button' className='btn-level' onClick={() => append({ name: '', birthDate: '' })}>
							Добавить ребенка
						</button>
					</>
				)}

				<button className='addAnketa-drop-down-input' type='button' onClick={() => toggleInputs(setShowParentsInputs)}>
					{showParentsInputs ? 'Скрыть ' : 'Родители'}
					<ArrowDown className={showParentsInputs ? 'arrowDown' : ''} />
				</button>
				{showParentsInputs && (
					<div className='parents-info'>
						<div className='parent'>
							<span>Мать</span>
							<input {...register('mother.name')} className='input' type='text' placeholder='ФИО' />
							<input {...register('mother.phone')} className='input' type='text' placeholder='Номер телефона' />
							<input
								{...register('mother.birthDate')}
								onChange={handleFormatDateInput}
								className='input'
								type='text'
								placeholder='Дата рождения'
							/>
						</div>
						<div className='parent'>
							<span>Отец</span>
							<input {...register('father.name')} className='input' type='text' placeholder='ФИО' />
							<input {...register('father.phone')} className='input' type='text' placeholder='Номер телефона' />
							<input
								{...register('father.birthDate')}
								onChange={handleFormatDateInput}
								className='input'
								type='text'
								placeholder='Дата рождения'
							/>
						</div>
					</div>
				)}

				<button className='addAnketa-drop-down-input' type='button' onClick={() => toggleInputs(setShowFriendInputs)}>
					{showFriendInputs ? 'Скрыть' : 'Близкий друг'}
					<ArrowDown className={showFriendInputs ? 'arrowDown' : 'arrow_Down-left'} />
				</button>
				{showFriendInputs && (
					<div className='best-friend'>
						<span>Близкий друг</span>
						<input {...register('contact.name')} className='input' type='text' placeholder='ФИО' />
						<input {...register('contact.phone')} className='input' type='text' placeholder='Номер телефона' />
						<input
							{...register('contact.birthDate')}
							onChange={handleFormatDateInput}
							className='input'
							type='text'
							placeholder='Дата рождения'
						/>
					</div>
				)}
			</div>

			<div className='btns-end'>
				<button className='submit-button btn' type='button' onClick={handleCancel}>
					Отменить
				</button>
				<button className='submit-button btn' type='submit'>
					Сохранить
				</button>
			</div>
		</form>
	);
};

export default AddAnketa;

const formdata = new FormData();

// const data = {
// 	mother: {
// 		name: '',
// 		date: 'string'
// 	}
// }

// formdata.append('mother.name','ffafas')
