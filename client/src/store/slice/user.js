import { createSlice } from '@reduxjs/toolkit'
import { AXIOS_POST, AXIOS_DELETE, AXIOS_GET, AXIOS_PATCH  } from './services/apiService';
import { toastr } from 'react-redux-toastr';

const initialState = {
    userList: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      getUsersList(state, action) {
          state.userList = action.payload.userList;
          state.totalCount = action.payload.totalCount;
      },
    },
})


export const getUsers = (searchKey = '') => async (dispatch) => {
    const response = await AXIOS_GET(`/user/get-all-user`);
    if (response?.data && response?.data.length) {
        dispatch(userSlice.actions.getUsersList({ userList: response?.data }))
    }else{
        dispatch(userSlice.actions.getUsersList({ userList: []}))
    }
};
  

export const saveNewUser = (payload, history) => async (dispatch) => {
    const response = await AXIOS_POST('/user/signup', payload, {});
    if (response?.data) {         
        toastr.success('Success',  response?.message);
        return true
    } else{
        toastr.error('Error', response?.message);    
        return false
    }
};
  
export const { getUsersList, loader } = userSlice.actions
export default userSlice.reducer