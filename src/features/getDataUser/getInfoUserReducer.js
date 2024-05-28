import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    users:[]
}


export const getDataUsers = createAsyncThunk(
    'getDataUsers',
    async (info,{dispatch, rejectedWithValue}) => {
        const response = await fetch('https://656db53ebcc5618d3c23cb54.mockapi.io/todo/something/product')
        const responseData = await response.json()
        dispatch(addUsers(responseData))
    }
)

const getDataUsersSlice = createSlice({
    name: 'getDataUsersSlice',
    initialState,
    reducers:{
        addUsers:(state, action) => {
            state.users = action.payload
        }
    }
})
export const {addUsers} = getDataUsersSlice.actions
export default getDataUsersSlice.reducer