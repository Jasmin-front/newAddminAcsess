import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requester } from '../../api/requester';
import { cookieStorage } from '../../utils';
const loginKey = 'admin_together';

const initialState = {
	loading: false,
	error: null,
	login: cookieStorage.getCookie('login'),
};

export const loginPost = createAsyncThunk('dataUser/loginPost', async formParamData => {
	try {
		const response = await requester.post('/login/user/', formParamData);
		return response.data;
	} catch (e) {
		console.error(e);
		if (error.response && error.response.data.message) {
			return rejectWithValue(error.response.data.message);
		}
		return rejectWithValue(e);
	}
});

export const logoutPost = createAsyncThunk('dataUser/logoutPost', async () => {
	try {
		requester.interceptors.request.use(config => {
			config.headers.Authorization = cookieStorage.getCookie('login');
			config.headers['Cookie'] = `X-CSRFToken=${cookieStorage.getCookie('csrftoken')}`;
			return config;
		});
		const { data } = await requester.post('/logout/');
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
	reducers: {},
	extraReducers: builder => {
		builder.addCase(loginPost.pending, state => {
			state.loading = true;
		});
		builder.addCase(loginPost.rejected, (state, action) => {
			state.error = action.payload;
			state.loading = false;
		});
		builder.addCase(loginPost.fulfilled, (state, action) => {
			state.login = true;
			cookieStorage.setCookie('login', action.payload.token);
			state.loading = false;
		});

		builder.addCase(logoutPost.pending, state => {
			state.loading = true;
		});
		builder.addCase(logoutPost.rejected, (state, action) => {
			state.error = action.payload;
			state.loading = false;
		});
		builder.addCase(logoutPost.fulfilled, (state, action) => {
			state.login = false;
			state.loading = false;
			cookieStorage.deleteCookie('login');
		});
	},
});

export default dataUserSlice.reducer;
