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
                            {['Ждет', 'Улетел', 'Новый', 'Виза в очереди', 'Приглашен (а)','Отказ',  'Возрат'].map(option => (
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
                <input {...register('passportNumber', { required: 'Номер паспорта обязателен' })} className='addAnketa-bottom-input' type="text" placeholder='Загранпаспорт                                                                                                        19291239' />
                {errors.passportNumber && <span className='error-span'>{errors.passportNumber.message}</span>}
                <input {...register('passportIssueDate', { required: 'Дата выдачи паспорта обязательна' })} className='addAnketa-bottom-input' type="text" placeholder='Дата выдачи загранпаспорта                                                                                    23.03.23' />
                {errors.passportIssueDate && <span className='error-span'>{errors.passportIssueDate.message}</span>}
                <input {...register('passportExpirationDate', { required: 'Дата окончания паспорта обязательна' })} className='addAnketa-bottom-input' type="text" placeholder='Дата окончания загранпаспорта                                                                               01.12.26' />
                {errors.passportExpirationDate && <span className='error-span'>{errors.passportExpirationDate.message}</span>}
                <input {...register('passportIssuingAuthority', { required: 'Орган выдачи паспорта обязателен' })} className='addAnketa-bottom-input' type="text" placeholder='Орган выдачи загранпаспорта                                                                                      МИД' />
                {errors.passportIssuingAuthority && <span className='error-span'>{errors.passportIssuingAuthority.message}</span>}
                <input {...register('email', { required: 'Email обязателен' })} className='addAnketa-bottom-input' type="email" placeholder='Email                                                                                                         azamat@gmail.com' />
                {errors.email && <span className='error-span'>{errors.email.message}</span>}
                <input {...register('password', { required: 'Пароль обязателен' })} className='addAnketa-bottom-input' type="password" placeholder='Password' />
                {errors.password && <span className='error-span'>{errors.password.message}</span>}
                <input {...register('height', { required: 'Рост обязателен' })} className='addAnketa-bottom-input' type="text" placeholder='Рост                                                                                                                               180cm' />
                {errors.height && <span className='error-span'> {errors.height.message}</span>}
                <input {...register('weight', { required: 'Вес обязателен' })} className='addAnketa-bottom-input' type="text" placeholder='Вес                                                                                                                                  70kg' />
                {errors.weight && <span className='error-span'>{errors.weight.message}</span>}
                <input {...register('country', { required: 'Страна обязательна' })} className='addAnketa-bottom-input' type="text" placeholder='Страна                                                                                                                           Корея' />
                {errors.country && <span className='error-span'>{errors.country.message}</span>}



                <div className='addAnketa-drop-down'>
                    <button className='addAnketa-drop-down-input' type="button" onClick={() => toggleInputs(setShowEnglishLevelInputs)}>
                        {showEnglishLevelInputs ? 'Скрыть ' : 'Уровень английского' + ':' + watch('englishLevel') }
                        <img src={arrowDown} className={showEnglishLevelInputs ? 'arrowDown' : ''} alt="arrowDown"/>
                    </button>
                    {showEnglishLevelInputs && (
                        <div className='english-level-buttons'>
                            {['Новичок','Средний','Отличный'].map(level => (
                                <button
                                    key={level}
                                    type="button"
                                    className={watch('englishLevel') === level ? 'selected' : 'btn-level'}
                                    onClick={() => handleSelect('englishLevel', level, setShowEnglishLevelInputs)}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    )}
                    {englishLevelError && <span className="error-message">{englishLevelError}</span>}
                </div>
                    <button className='addAnketa-drop-down-input' type="button" onClick={() => toggleInputs(setShowFamilyStatusInputs)}>
                        {showFamilyStatusInputs ? 'Скрыть ' : 'Семейный статус' + ':' + watch('familyStatus')}
                        <img src={arrowDown} className={showFamilyStatusInputs ? 'arrowDown' : ''} alt="arrowDown"/>
                    </button>
                    {showFamilyStatusInputs && (
                        <div className='family-status-buttons'>
                            {['Женат/За мужем', 'Холост/Не замужем', 'Разведен(а)'].map(status => (
                                <button
                                    key={status}
                                    type="button"
                                    className={watch('familyStatus') === status ? 'selected' : 'btn-level'}
                                    onClick={() => handleSelect('familyStatus', status, setShowFamilyStatusInputs)}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    )}
                    {familyStatusError && <span className="error-message">{familyStatusError}</span>}




                <button className='addAnketa-bottom-input' type="button" onClick={() => toggleInputs(setShowChildrenInputs)}>
                    {showChildrenInputs ? 'Скрыть ' : 'Дети'}
                    <img src={arrowDown} className={showChildrenInputs ? 'arrowDown' : ''} alt="arrowDown"/>
                </button>
                {showChildrenInputs && (
                    <>
                        {fields.map((child, index) => (
                            <div key={child.id} className='child-info'>
                                <span>Ребенок {index + 1}</span>
                                <input
                                    {...register(`children[${index}].name`)}
                                    className='child-input'
                                    type="text"
                                    placeholder="ФИО"
                                />
                                <input
                                    {...register(`children[${index}].birthDate`)}
                                    className='child-input'
                                    type="text"
                                    placeholder="Дата рождения"
                                />
                                <button type="button" onClick={() => remove(index)}>Удалить ребенка</button>
                            </div>
                        ))}
                        <button type="button" className='btn-level' onClick={() => append({ name: '', birthDate: '' })}>Добавить ребенка</button>
                    </>
                )}
                <button className='addAnketa-bottom-input' type="button" onClick={() => toggleInputs(setShowParentsInputs)}>
                    {showParentsInputs ? 'Скрыть ' : 'Родители'}
                    <img src={arrowDown} className={showParentsInputs ? 'arrowDown' : ''} alt="arrowDown"/>
                </button>
                {showParentsInputs && (
                    <div className='parents-info'>
                        <div className='parent'>
                            <span>Мать</span>
                            <input {...register('mother.name')} className='input-parent' type="text" placeholder="ФИО" />
                            <input {...register('mother.phone')} className='input-parent' type="text" placeholder="Номер телефона" />
                            <input {...register('mother.birthDate')} className='input-parent' type="text" placeholder="Дата рождения" />
                        </div>
                        <div className='parent'>
                            <span>Отец</span>
                            <input {...register('father.name')} className='input-parent' type="text" placeholder="ФИО" />
                            <input {...register('father.phone')} className='input-parent' type="text" placeholder="Номер телефона" />
                            <input {...register('father.birthDate')} className='input-parent' type="text" placeholder="Дата рождения" />
                        </div>
                    </div>
                )}
                <button className='addAnketa-bottom-input' type="button" onClick={() => toggleInputs(setShowFriendInputs)}>
                    {showFriendInputs ? 'Скрыть' : 'Близкий друг'}
                    <img src={arrowDown} className={showFriendInputs ? 'arrowDown' : 'arrow_Down-left'} alt="arrowDown"/>
                </button>
                {showFriendInputs && (
                    <div className='best-friend'>
                        <span>Близкий друг</span>
                        <input
                            {...register('friend.name')}
                            className='input-parent'
                            type="text"
                            placeholder='ФИО'
                        />
                        <input
                            {...register('friend.phone')}
                            className='input-parent'
                            type="text"
                            placeholder='Номер телефона'
                        />
                        <input
                            {...register('friend.birthDate')}
                            className='input-parent'
                            type="text"
                            placeholder='Дата рождения'
                        />
                    </div>
                )}
            </div>
            <div className='btns-end'>
                <button type="submit" className='submit-button'>Submit</button>
                <button type="button" className='submit-button' onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    );
};

export default AddAnketa;
