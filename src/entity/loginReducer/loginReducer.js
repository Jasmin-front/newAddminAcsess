import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    user:{}
}

export const getUserData = createAsyncThunk(
    'getUser/getUserData',
    async (_,{dispatch}) => {
        const response = await fetch('https://656db53ebcc5618d3c23cb54.mockapi.io/todo/something/product')
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