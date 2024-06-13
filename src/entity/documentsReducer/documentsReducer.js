import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requester } from '../../api/requester';

const initialState = {
	documents: {
		data: null,
		loading: false,
		error: null,
	},
};

// Fetch documents
export const fetchDocuments = createAsyncThunk('documents/fetchDocuments', async clientId => {
	try {
		const { data } = await requester.get(`/workers/client/${clientId}/documents/`);
		return data;
	} catch (e) {
		return rejectWithValue(e.response.data.message);
	}
});

const documentsSlice = createSlice({
	name: 'documentsSlice',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			// Handle fetchDocuments
			.addCase(fetchDocuments.pending, state => {
				state.documents.loading = true;
				state.documents.error = null;
			})
			.addCase(fetchDocuments.fulfilled, (state, action) => {
				state.documents.data = action.payload;
				state.documents.loading = false;
			})
			.addCase(fetchDocuments.rejected, (state, action) => {
				state.documents.error = action.payload;
				state.documents.loading = false;
			});
	},
});

export default documentsSlice.reducer;
