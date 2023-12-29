import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const store = new configureStore({
    reducer:{
        auth: authSlice
    }
})

export default store;