import { useSelector } from 'react-redux';
import Pages from './pages/Pages.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
	const { theme } = useSelector(state => state.theme);
	return (
		<div className={`app_${theme}`}>
			<Pages />
			<ToastContainer />
		</div>
	);
};

export default App;
