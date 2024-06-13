import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../entity/loginReducer/loginReducer.js';
import getInfoUserReducer from '../entity/getDataUser/getInfoUserReducer.js';
import themeReducer from '../features/themeChanger/ThemeReducer.js';
import paymentReducer from '../entity/reducerPayment/paymentReducer.js';
import documentsReducer from '../entity/documentsReducer/documentsReducer.js';

const store = configureStore({
	reducer: {
		userData: loginReducer,
		getUsers: getInfoUserReducer,
		theme: themeReducer,
		payments: paymentReducer,
		documents: documentsReducer,
	},
});
export default store;
