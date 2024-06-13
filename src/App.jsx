import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pages from './pages/Pages';

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
