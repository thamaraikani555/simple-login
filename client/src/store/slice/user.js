import { createSlice } from '@reduxjs/toolkit'
import { AXIOS_POST, AXIOS_DELETE, AXIOS_GET, AXIOS_PATCH  } from './services/apiService';
import { toastr } from 'react-redux-toastr';

const initialState = {
    userList: [],
    totalCount: 0
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


export const getUsers = (page = 1, limit = 10, searchKey = '') => async (dispatch) => {
    const skip = (page - 1) * limit;
    const response = await AXIOS_GET(`/user/get-all-user?skip=${skip}&limit=${limit}&searchKey=${searchKey}`);
    console.log(response?.data)
    if (response?.data && response?.data.length) {
        dispatch(userSlice.actions.getUsersList({ userList: response?.data, totalCount: response.totalCount }))
    }else{
        dispatch(userSlice.actions.getUsersList({ userList: [], totalCount: 0}))
    }
};
  

export const saveNewUser = (payload, history) => async (dispatch) => {
    const response = await AXIOS_POST('/user/signup', payload, {});
    if (response?.status) {         
        toastr.success('Success',  response?.message);
        return true
    } else{
        toastr.error('Error', "Internal Server Error");    
        return false
    }
};
  
export const { getUsersList, loader } = userSlice.actions
export default userSlice.reducer