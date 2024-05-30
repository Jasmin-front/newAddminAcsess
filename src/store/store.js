import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../entity/loginReducer/loginReducer.js';
import getInfoUserReducer from '../entity/getDataUser/getInfoUserReducer.js';
import themeReducer from '../features/themeChanger/ThemeReducer.js';
const store = configureStore({
	reducer: {
		userData: loginReducer,
		getUsers: getInfoUserReducer,
		theme: themeReducer,
	},
});
export default store;
