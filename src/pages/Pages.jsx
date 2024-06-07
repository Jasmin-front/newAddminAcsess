import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import AddAnketa from './AddAnketa/AddAnketa.jsx';
import Home from './Home/Home.jsx';
import Status from './Status/Status.jsx';
import Country from './Country/Country.jsx';
import User from './users/User.jsx';
import './Pages.css';
import EditAnket from '../components/EditAnket/EditAnket.jsx';
import { useSelector } from 'react-redux';
import Login from './Login/Login.jsx';
import Header from '../components/Header/Header.jsx';

const Layout = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
};
const ProtectedRoutes = () => {
	const { login } = useSelector(state => state.userData);
	return login ? <Outlet /> : <Login />;
};
const Pages = () => {
	return (
		<div className='container'>
			<Routes>
				<Route element={<ProtectedRoutes />}>
					<Route element={<Layout />}>
						<Route path='/' element={<Home />} />
						<Route path='/status' element={<Status />} />
						<Route path='/country' element={<Country />} />
						<Route path='/addAnketa' element={<AddAnketa />} />
						<Route path='/users/:usersId/*' element={<User />} />
						<Route path='/users/:usersId/editProfile' element={<EditAnket />} />
					</Route>
				</Route>
			</Routes>
		</div>
	);
};

export default Pages;
