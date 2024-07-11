import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState:{
        user: null,
        token: null,
        error: null,
        loading: false,
    },
    reducers:{
        setUser: (state, action) => {
            state.user = {
                uid: action.payload.user.uid,
                email: action.payload.user.email
                // Add other necessary fields from user object
            };
            state.token = action.payload.token;
            state.error = null;
            state.loading = false;
            console.log(state.token)
            console.log(state.user)
            localStorage.setItem('user', JSON.stringify(state.user));
            localStorage.setItem('token', state.token);
        },
        removeUser: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            state.loading = false;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
        setUserFromLocalStorage: (state) => {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = localStorage.getItem('token');
            if (user && token) {
                state.user = user;
                state.token = token;
            } else {
                state.user = null;
                state.token = null;
            }
            console.log("token "+token)
            console.log("user "+user)
        }
    }
});

export const { setUser, removeUser, setUserFromLocalStorage } = authSlice.actions;

export default authSlice.reducer;
