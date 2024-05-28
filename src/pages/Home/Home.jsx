import Input from "../../components/reusable/Input/Input.jsx";
import './Home.css'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDataUsers } from "../../features/getDataUser/getInfoUserReducer.js";
import { sendDataUsers } from "../../features/getDataUserReducer/getDataUserReducer.js";
import trash from '../../assets/Home/trash.png'

const Home = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDataUsers())
    }, [])
    const { users } = useSelector((state) => state.getUsers)

    const getStatusClass = (status) => {
        switch (status) {
            case 'Ждет':
                return 'waiting';
            case 'Улетел':
                return 'departed';
            case 'Новый':
                return 'new';
            case 'Виза в очереди':
                return 'visa-queue';
            case 'Приглашен (а)':
                return 'invited';
            case 'Отказ':
                return 'refusal';
            case 'Возрат':
                return 'return';
            default:
                return '';
        }
    };

    return (
        <div className='home'>
            <Input />
            <div className='home-container'>
                {users ? (
                    users.map((item, index) => (
                        <div key={index} className={`card_main ${getStatusClass(item.status)}`}>
                            <div className='card_main-top'>
                                <span className='currentLastName'>{item.currentLastName} {item.firstName} {item.birthLastName}</span>
                                <span className='birthDate'>{item.birthDate}</span>
                            </div>
                                <p className='card_main-middle'>{item.country}</p>
                               <div className='status-block'>
                                   <span  className={getStatusClass(item.status)}>{item.status}</span>
                                   <img src={trash} className='trash' alt="trash" />
                               </div>
                        </div>
                    ))
                ) : (
                    <div>
                        <span>LOADING...</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
