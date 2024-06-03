import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    user:{}
}

export const getUserData = createAsyncThunk(
    'getUser/getUserData',
    async (_,{dispatch}) => {
        const response = await fetch('http://16.170.253.135/login/user/')
        const responseData = await response.json()
        dispatch(addLogin(responseData))
    }
)

const dataUserSlice = createSlice({
    name:'dataUserSlice',
    initialState,
    reducers: {
        addLogin: (state, action) => {
            state.user = action.payload
        }
    }
})
export const {addLogin} = dataUserSlice.actions
export default dataUserSlice.reducer