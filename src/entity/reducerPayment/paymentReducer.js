import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requester } from '../../api/requester';

const initialState = {
	payment: {
		data: null,
		loading: false,
		error: null,
	},
	refunds: {
		data: null,
		loading: false,
		error: null,
	},
};

// Fetch payments
export const fetchPayments = createAsyncThunk('payment/fetchPayments', async clientId => {
	try {
		const { data } = await requester.get(`/workers/client/${clientId}/payments/`);
		return data.reverse();
	} catch (e) {
		return rejectWithValue(e.response.data.message);
	}
});

// Fetch refunds
export const fetchRefunds = createAsyncThunk('payment/fetchRefunds', async clientId => {
	try {
		const { data } = await requester.get(`/workers/client/${clientId}/refunds/`);
		return data.reverse();
	} catch (e) {
		return rejectWithValue(e.response.data.message);
	}
});

const paymentReducer = createSlice({
	name: 'paymentReducer',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			// Handle fetchPayments
			.addCase(fetchPayments.pending, state => {
				state.payment.loading = true;
				state.payment.error = null;
			})
			.addCase(fetchPayments.fulfilled, (state, action) => {
				state.payment.data = action.payload;
				state.payment.loading = false;
			})
			.addCase(fetchPayments.rejected, (state, action) => {
				state.payment.error = action.payload;
				state.payment.loading = false;
			})
			// Handle fetchRefunds
			.addCase(fetchRefunds.pending, state => {
				state.refunds.loading = true;
				state.refunds.error = null;
			})
			.addCase(fetchRefunds.fulfilled, (state, action) => {
				state.refunds.data = action.payload;
				state.refunds.loading = false;
			})
			.addCase(fetchRefunds.rejected, (state, action) => {
				state.refunds.error = action.payload;
				state.refunds.loading = false;
			});
	},
});

export default paymentReducer.reducer;
