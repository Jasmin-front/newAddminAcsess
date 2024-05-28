import {configureStore} from "@reduxjs/toolkit";
import loginReducer from "../features/loginReducer/loginReducer.js";
import getInfoUserReducer from "../features/getDataUser/getInfoUserReducer.js";
const store = configureStore({
    reducer:{
        userData:loginReducer,
        getUsers: getInfoUserReducer
    }
})
export default store