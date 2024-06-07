import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requester } from '../../api/requester';
import { cookieStorage } from '../../utils';

const initialState = {
	loading: false,
	error: null,
	login: cookieStorage.getCookie('login'),
};

export const loginPost = createAsyncThunk('dataUser/loginPost', async formParamData => {
	try {
		const { data } = await requester.post('/login/user/', formParamData);
		return data;
	} catch (e) {
		console.error(e);
		if (error.response && error.response.data.message) {
			return rejectWithValue(error.response.data.message);
		}
		return rejectWithValue(e);
	}
});

export const dataUserSlice = createSlice({
	name: 'dataUserSlice',
	initialState,
	reducers: {
		logout: state => {
			state.login = null;
			cookieStorage.deleteCookie('login');
		},
	},
	extraReducers: builder => {
		builder.addCase(loginPost.pending, state => {
			state.loading = true;
		});
		builder.addCase(loginPost.rejected, (state, action) => {
			state.error = action.payload;
			state.loading = false;
		});
		builder.addCase(loginPost.fulfilled, (state, action) => {
			const expiryDate = new Date();
			expiryDate.setDate(expiryDate.getDate() + 1); // Set the expiry to 1 day from now
			cookieStorage.setCookie('login', 'true', { expires: expiryDate });
			state.login = 'true';
			state.loading = false;
		});
	},
});

export const { logout } = dataUserSlice.actions;

export default dataUserSlice.reducer;
