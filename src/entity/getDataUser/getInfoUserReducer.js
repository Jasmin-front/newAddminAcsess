import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { requester } from '../../api/requester';

const initialState = {
	users: [],
	user: {},
	loading: false,
	error: null,
};

export const getDataUsers = createAsyncThunk('getDataUsers', async (_, { dispatch, rejectWithValue }) => {
	try {
		dispatch(setLoading(true));
		const { data } = await requester.get('/workers/main/');
		dispatch(addUsers(data));
	} catch (error) {
		dispatch(setLoading(false));
		return rejectWithValue(error.message);
	} finally {
		dispatch(setLoading(false));
	}
});

export const getDataUserId = createAsyncThunk('getDataUserId', async (userId, { dispatch, rejectWithValue }) => {
	try {
		dispatch(setLoading(true));
		const response = await fetch(`https://656db53ebcc5618d3c23cb54.mockapi.io/todo/something/product/${userId}`);
		const responseData = await response.json();
		dispatch(setLoading(false));
		dispatch(addUser(responseData));
	} catch (error) {
		dispatch(setLoading(false));
		return rejectWithValue(error.message);
	}
});

export const deleteUserid = createAsyncThunk('deleteUserid', async (userId, { dispatch, rejectWithValue }) => {
	try {
		dispatch(setLoading(true));
		await axios.delete(`https://656db53ebcc5618d3c23cb54.mockapi.io/todo/something/product/${userId}`);
		dispatch(setLoading(false));
		dispatch(removeUser(userId));
	} catch (error) {
		dispatch(setLoading(false));
		return rejectWithValue(error.message);
	}
});

const getDataUsersSlice = createSlice({
	name: 'getDataUsersSlice',
	initialState,
	reducers: {
		addUsers: (state, action) => {
			state.users = action.payload;
		},
		addUser: (state, action) => {
			state.user = action.payload;
		},
		removeUser: (state, action) => {
			state.users = state.users.filter(user => user.id !== action.payload);
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setError: (state, action) => {
			state.error = action.payload;
		},
	},
});

export const { addUsers, addUser, removeUser, setLoading, setError } = getDataUsersSlice.actions;
export default getDataUsersSlice.reducer;
