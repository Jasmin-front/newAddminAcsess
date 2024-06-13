import { Outlet, Route, Routes } from 'react-router-dom';
import AddAnketa from './AddAnketa/AddAnketa.jsx';
import Home from './Home/Home.jsx';
import Status from './Status/Status.jsx';
import Country from './Country/Country.jsx';
import User from './users/User.jsx';
import './Pages.css';
import { useSelector } from 'react-redux';
import Login from './Login/Login.jsx';
import Header from '../components/Header/Header.jsx';
import { CardsFilterLayout } from '../components/Cards/Cards.jsx';
import Contract from './Contract/Contract.jsx';
import EditAnket from './EditAnket/EditAnket.jsx';

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
				<Route path='/client_cn/:id' element={<Contract />} />
				<Route element={<ProtectedRoutes />}>
					<Route element={<Layout />}>
						<Route element={<CardsFilterLayout />}>
							<Route path='/' element={<Home />} />
							<Route path='/status' element={<Status />} />
							<Route path='/country' element={<Country />} />
						</Route>
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
