import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';

var store = configureStore({
    reducer:{
             auth: authReducer
    }
});
console.log(store, 'storeeee')

export default store;