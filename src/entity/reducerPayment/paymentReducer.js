import {createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
    usersPayment:[]
}


export const postRequestPayment = createAsyncThunk(
    'postRequestPayment',
    async (infoPayment) => {
        await fetch(`https://656db53ebcc5618d3c23cb54.mockapi.io/todo/something/users`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(infoPayment)
        });
}
)