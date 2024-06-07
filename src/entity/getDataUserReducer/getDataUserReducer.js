import { createAsyncThunk } from '@reduxjs/toolkit';
import { requester } from '../../api/requester';
import { redirect } from 'react-router-dom';

export const sendDataUsers = createAsyncThunk('sendReviewsData', async data => {
	const response = await requester.post('/workers/client_add/', data);
	redirect('/');
});
