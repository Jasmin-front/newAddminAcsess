import { Route, Routes } from 'react-router-dom';
import AddAnketa from './AddAnketa/AddAnketa.jsx';
import Home from './Home/Home.jsx';
import Status from './Status/Status.jsx';
import Country from './Country/Country.jsx';
import User from './users/User.jsx';
import './Pages.css';
import EditAnket from '../components/EditAnket/EditAnket.jsx';

const Pages = () => {
	return (
		<div className='container'>
			<Routes>
				<Route path='/home' element={<Home />} />
				<Route path='/status' element={<Status />} />
				<Route path='/country' element={<Country />} />
				<Route path='/addAnketa' element={<AddAnketa />} />
				<Route path='/users/:usersId/*' element={<User />} />
				<Route path='/users/:usersId/editProfile' element={<EditAnket />} />
			</Routes>
		</div>
	);
};

export default Pages;
