import './HeaderProfile.css'
import { Link, useParams } from "react-router-dom";

const HeaderProfile = () => {
    const { usersId } = useParams();
    return (
        <div className='header-profile-main'>
            <Link className={`header-profile ${location.pathname === `/users/${usersId}/profile` ? 'active-profile': ''}` } to={`/users/${usersId}/profile`}>
                Профиль
            </Link>
            <Link className={`header-profile ${location.pathname === `/users/${usersId}/documents` ? 'active-profile': '' }`} to={`/users/${usersId}/documents`}>
                Документы
            </Link>
            <Link className={`header-profile ${location.pathname ===`/users/${usersId}/payments` ? 'active-profile' : '' }`} to={`/users/${usersId}/payments`}>
                Оплата
            </Link>
        </div>
    );
};

export default HeaderProfile;
