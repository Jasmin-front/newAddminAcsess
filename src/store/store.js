import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../entity/loginReducer/loginReducer.js';
import getInfoUserReducer from '../entity/getDataUser/getInfoUserReducer.js';
const store = configureStore({
	reducer: {
		userData: loginReducer,
		getUsers: getInfoUserReducer,
	},
});
export default store;
