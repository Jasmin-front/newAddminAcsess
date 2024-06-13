import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	theme: 'light',
};
const themeReducer = createSlice({
	name: 'themeReducer',
	initialState,
	reducers: {
		toggleTheme: state => {
			state.theme = state.theme === 'light' ? 'dark' : 'light';
		},
	},
});

export const { toggleTheme } = themeReducer.actions;
export default themeReducer.reducer;
