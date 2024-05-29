import './AddAnketa.css';
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendDataUsers } from "../../features/getDataUserReducer/getDataUserReducer.js";
import arrowDown from '../../assets/addAnketa/arrow-down.png';

const AddAnketa = () => {
    const { register, handleSubmit, control, reset, setValue, watch, formState: { errors } } = useForm({
        defaultValues: {
            birthLastName: '',
            currentLastName: '',
            firstName: '',
            birthDate: '',
            birthPlace: '',
            residence: '',
            passportNumber: '',
            passportIssueDate: '',
            passportExpirationDate: '',
            passportIssuingAuthority: '',
            email: '',
            password: '',
            height: '',
            weight: '',
            status: '',
            englishLevel: '',
            familyStatus: '',
            country: '',
            children: [],
            mother: {
                name: '',
                phone: '',
                birthDate: ''
            },
            father: {
                name: '',
                phone: '',
                birthDate: ''
            },
            friend: {
                name: '',
                phone: '',
                birthDate: ''
            },
            image: null
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "children"
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

    const onSubmit = (data) => {
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

        if (!data.mother.name && !data.father.name && !data.friend.name) {
            alert('Заполните данные одного из родителей или близкого друга');
            formValid = false;
        }

        if (!formValid) {
            return;
        }

        const formData = new FormData();
        for (const key in data) {
            if (key === 'children') {
                formData.append(key, JSON.stringify(data[key]));
            } else {
                formData.append(key, data[key]);
            }
        }

        reset();
        dispatch(sendDataUsers(data));
        navigate('/home');
        console.log(data);
    };

    const handleCancel = () => {
        navigate('/home')
        reset();
    };

    const toggleInputs = (setter) => {
        setter(prev => !prev);
    };

    const handleSelect = (field, value, toggleSetter) => {
        setValue(field, value);
        toggleSetter(false);
    };

    const handleImageChange = (e) => {
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
        <form className='addAnketa' onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className='addAnketa_top'>
                <div className='addAnketa_top-left'>
                    <label htmlFor="image-upload" className='label-file'>
                        {previewImage ? (
                            <img src={previewImage} alt="Preview" className='preview-image' />
                        ) : (
                            <span>Upload Image</span>
                        )}
                    </label>
                    <input
                        id="image-upload"
                        {...register('image')}
                        type="file"
                        className='input-file'
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                <div className='addAnketa_top-middle'>
                    <input {...register('birthLastName', { required: 'Фамилия при рождении обязательна' })} type="text" className='input' placeholder='Фамилия при рождений' />
                    {errors.birthLastName && <span className='error-span'>{errors.birthLastName.message}</span>}
                    <input {...register('currentLastName', { required: 'Нынешняя фамилия обязательна' })} type="text" className='input' placeholder='Нынешняя фамилия' />
                    {errors.currentLastName && <span className='error-span'>{errors.currentLastName.message}</span>}
                    <input {...register('firstName', { required: 'Имя обязательно' })} type="text" className='input' placeholder='Имя' />
                    {errors.firstName && <span className='error-span'>{errors.firstName.message}</span>}
                    <input {...register('birthDate', { required: 'Дата рождения обязательна' })} type="text" className='input' placeholder='Дата рождения' />
                    {errors.birthDate && <span className='error-span'>{errors.birthDate.message}</span>}
                </div>
                <div className='addAnketa_top-right'>
                    <button type="button" className='addAnketa_top-right-title-drop-down' onClick={() => toggleInputs(setShowStatusOptions)}>
                        {watch('status') || 'Status'}
                        <img src={arrowDown} className={showStatusOptions ? 'arrowDown' : ''} alt="arrowDown"/>
                    </button>
                    {showStatusOptions && (
                        <div className='status-buttons'>
                            {['Ждет визу', 'Ждет приглашение', 'Улетел', 'Новый', 'Виза в очереди', 'Приглашен (а)','Отказ',  'Возрат'].map(option => (
                                <button
                                    key={option}
                                    type="button"
                                    className='btn-status'
                                    onClick={() => handleSelect('status', option, setShowStatusOptions)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}
                    {statusError && <span className="error-message">{statusError}</span>}
                </div>
            </div>
            <div className='addAnketa-bottom'>
                <input {...register('birthPlace', { required: 'Место рождения обязательно' })} className='addAnketa-bottom-input' type="text" placeholder='Место рождения                                                                                                             г.Ош' />
                {errors.birthPlace && <span className='error-span'>{errors.birthPlace.message}</span>}
                <input {...register('residence', { required: 'Место проживания обязательно' })} className='addAnketa-bottom-input' type="text" placeholder='Место проживания                                                                                                        г.Ош' />
                {errors.residence && <span className='error-span'>{errors.residence.message}</span>}
                <input {...register('passportNumber', { required: 'Номер паспорта обязателен' })} className='addAnketa-bottom-input' type="text" placeholder='Загранпаспорт                                                                                                             AC/PE' />
                {errors.passportNumber && <span className='error-span'>{errors.passportNumber.message}</span>}
                <input {...register('passportIssueDate', { required: 'Дата выдачи паспорта обязательна' })} className='addAnketa-bottom-input' type="text" placeholder='Дата выдачи загранпаспорта                                                                                    23.03.23' />
                {errors.passportIssueDate && <span className='error-span'>{errors.passportIssueDate.message}</span>}
                <input {...register('passportExpirationDate', { required: 'Дата окончания паспорта обязательна' })} className='addAnketa-bottom-input' type="text" placeholder='Дата окончания загранпаспорта                                                                               01.12.26' />
                {errors.passportExpirationDate && <span className='error-span'>{errors.passportExpirationDate.message}</span>}
                <input {...register('passportIssuingAuthority', { required: 'Орган выдачи паспорта обязателен' })} className='addAnketa-bottom-input' type="text" placeholder='Орган выдачи загранпаспорта                                                                                       SRS' />
                {errors.passportIssuingAuthority && <span className='error-span'>{errors.passportIssuingAuthority.message}</span>}
                <input {...register('email', { required: 'Email обязателен' })} className='addAnketa-bottom-input' type="email" placeholder='Почтовый адрес                                                                                       azamat@gmail.com' />
                {errors.email && <span className='error-span'>{errors.email.message}</span>}
                <input {...register('password', { required: 'Пароль обязателен' })} className='addAnketa-bottom-input' type="password" placeholder='Пароль' />
                {errors.password && <span className='error-span'>{errors.password.message}</span>}


                <div className='addAnketa-drop-down'>
                    <div className='addAnketa-drop-down-input-one'>
                        <input {...register('height', { required: 'Рост обязателен' })} className='addAnketa-bottom-input-one' type="text" placeholder='Рост                                                180cm' />
                        {errors.height && <span className='error-span'> {errors.height.message}</span>}
                    </div>
                    <div className='addAnketa-drop-down-input-one'>
                        <input {...register('weight', { required: 'Вес обязателен' })} className='addAnketa-bottom-input-one' type="text" placeholder='Вес                                                    70kg' />
                        {errors.weight && <span className='error-span'>{errors.weight.message}</span>}
                    </div>
                </div>

                <div className='addAnketa-drop-down'>
                    <div className='addAnketa-drop-down-one'>
                        <div className='addAnketa-drop-down-input' onClick={() => toggleInputs(setShowEnglishLevelInputs)}>
                            <span>{watch('englishLevel') ? `Уровень английского: ${watch('englishLevel')}` : 'Уровень английского'}</span>
                            <img src={arrowDown} className={showEnglishLevelInputs ? 'arrowDown' : ''} alt="arrowDown" />
                        </div>
                        <div>
                            {showEnglishLevelInputs && (
                                <div className="english-level-buttons">
                                    {['Новичок', 'Средний', 'Отличный'].map(level => (
                                        <button
                                            key={level}
                                            type="button"
                                            className={`btn-level ${watch('englishLevel') === level ? 'selected' : ''}`}
                                            onClick={() => handleSelect('englishLevel', level, setShowEnglishLevelInputs)}
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                            )}
                            {englishLevelError && <span className="error-message">{englishLevelError}</span>}
                        </div>
                    </div>
                    <div className='addAnketa-drop-down-one'>
                        <div className='addAnketa-drop-down-input' onClick={() => toggleInputs(setShowFamilyStatusInputs)}>
                            <span>{watch('familyStatus') ? `Семейный статус: ${watch('familyStatus')}` : 'Семейный статус'}</span>
                            <img src={arrowDown} className={showFamilyStatusInputs ? 'arrowDown' : ''} alt="arrowDown" />
                        </div>
                        <div>
                            {showFamilyStatusInputs && (
                                <div className="family-status-buttons">
                                    {['Холост', 'Замужем/Женат', 'Разведен/Разведена'].map(status => (
                                        <button
                                            key={status}
                                            type="button"
                                            className={`btn-level ${watch('familyStatus') === status ? 'selected' : ''}`}
                                            onClick={() => handleSelect('familyStatus', status, setShowFamilyStatusInputs)}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            )}
                            {familyStatusError && <span className="error-message">{familyStatusError}</span>}
                        </div>
                    </div>
                </div>

                <div className='addAnketa-drop-down-country'>
                        <div className='addAnketa-drop-down-input-end' onClick={() => toggleInputs(setShowCountryOptions)}>
                            <span>{watch('country') ? `Страна: ${watch('country')}` : 'Страна'}</span>
                            <img src={arrowDown} className={showCountryOptions ? 'arrowDown' : ''} alt="arrowDown" />
                        </div>
                        <div>
                            {showCountryOptions && (
                                <div className="country-buttons">
                                    {['Великобритания', 'Дания', 'Германия', 'Польша', 'Литва', 'Латвия', 'Словакия', 'Венгрия', 'Сербия', 'Турция', 'Болгария', 'Финляндия', 'Норвегия', 'Нидерланды', 'Чехия', 'Южная Корея'].map(country => (
                                        <button
                                            key={country}
                                            type="button"
                                            className={`btn-level-one ${watch('country') === country ? 'selected' : ''}`}
                                            onClick={() => handleSelect('country', country, setShowCountryOptions)}
                                        >
                                            {country}
                                        </button>
                                    ))}
                                </div>
                            )}
                            {errors.country && <span className="error-message">{errors.country.message}</span>}
                        </div>
                </div>
            </div>
            <div className="btns-end">
                <button className="submit-button" type="submit">Сохранить</button>
                <button className="submit-button" type="button" onClick={handleCancel}>Отменить</button>
            </div>
        </form>
    );
};

export default AddAnketa;
