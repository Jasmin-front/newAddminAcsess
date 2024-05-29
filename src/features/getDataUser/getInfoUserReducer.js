import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	users: [],
	user: {},
};

export const getDataUsers = createAsyncThunk('getDataUsers', async (info, { dispatch, rejectWithValue }) => {
	try {
		const response = await fetch('https://656db53ebcc5618d3c23cb54.mockapi.io/todo/something/product');
		const responseData = await response.json();
		dispatch(addUsers(responseData));
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

export const getDataUserId = createAsyncThunk('getDataUserId', async (info, { dispatch, rejectWithValue }) => {
	try {
		const response = await fetch(`https://656db53ebcc5618d3c23cb54.mockapi.io/todo/something/product/${info}`);
		const responseData = await response.json();
		dispatch(addUser(responseData));
	} catch (error) {
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
	},
});

export const { addUsers, addUser } = getDataUsersSlice.actions;
export default getDataUsersSlice.reducer;
