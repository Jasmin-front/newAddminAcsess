import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendDataUsers = createAsyncThunk(
    'sendReviewsData',
    async (info) => {
        await fetch(`https://test312api.pythonanywhere.com/workers/client_add`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        });
    }
);
