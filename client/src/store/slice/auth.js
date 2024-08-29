import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { AXIOS_GET, AXIOS_PATCH, AXIOS_POST } from './services/apiService';
import { toastr } from 'react-redux-toastr';

const initialState = {
    isAuthenticated: false,
    user: null,
}

const authSlice  = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
})

export const loginMethod = (payload, history) => async (dispatch) => {  
    
    const response = await AXIOS_POST('/auth/login', payload, {});
    if(response.status == true){
        let token = response?.token;
        localStorage.setItem('authToken', token);
        toastr.success('Success',  response?.message);
        return true
    }else{
        toastr.error('Error', response?.data?.message);    
        return false    
    }
};

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
