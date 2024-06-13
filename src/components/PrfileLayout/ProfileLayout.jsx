import { Route, Routes } from 'react-router-dom';
import UserPayment from '../../pages/userPages/UserPayment/UserPayment.jsx';
import UserDocument from '../../pages/userPages/UsersDocument/UserDocument.jsx';
import UserProfile from '../../pages/userPages/UsersProfile/UserProfile.jsx';
import ContractCreate from '../../pages/Contract/ContractCreate.jsx';

const ProfileLayout = () => {
	return (
		<Routes>
			<Route path='/' element={<UserProfile />} />
			<Route path='payments' element={<UserPayment />} />
			<Route path='documents' element={<UserDocument />} />
			<Route path='cn' element={<ContractCreate />} />
		</Routes>
	);
};

export default ProfileLayout;
