import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/auth';
import userReducer from './slice/user';
import { reducer as toastrReducer } from 'react-redux-toastr';

const store = configureStore({
    reducer: {
        auth: authReducer,
        toastr: toastrReducer,  
        user: userReducer
    }
});


export default store;