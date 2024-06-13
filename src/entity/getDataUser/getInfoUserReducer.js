import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { requester } from '../../api/requester';
import { redirect } from 'react-router-dom';

const initialState = {
	users: [],
	user: {},
	loading: false,
	error: null,
};

export const getDataUsers = createAsyncThunk('getDataUsers', async (params, { dispatch, rejectWithValue }) => {
	try {
		dispatch(setLoading(true));
		const { data } = await requester.get('/workers/main/', { params });
		dispatch(addUsers(data));
	} catch (error) {
		dispatch(setError(data));
		return rejectWithValue(error.message);
	} finally {
		dispatch(setLoading(false));
	}
});

export const getDataUserId = createAsyncThunk('getDataUserId', async (userId, { dispatch, rejectWithValue }) => {
	try {
		dispatch(setLoading(true));
		const { data } = await requester.get(`/workers/client/${userId}/`);
		dispatch(addUser(data));
	} catch (error) {
		return rejectWithValue(error.message);
	} finally {
		dispatch(setLoading(false));
	}
});

export const deleteUserid = createAsyncThunk(
	'deleteUserid',
	async ({ id, params, navigate }, { dispatch, rejectWithValue }) => {
		try {
			dispatch(setLoading(true));
			await requester.delete(`/workers/client/${id}/`);
			const { data } = await requester.get('/workers/main/', { params });
			dispatch(addUsers(data));
			navigate('/');
		} catch (error) {
			return rejectWithValue(error.message);
		} finally {
			dispatch(setLoading(false));
		}
	}
);

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
