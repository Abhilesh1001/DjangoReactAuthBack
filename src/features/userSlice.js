import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: '',
    name: '',
}

export const userSlice = createSlice({
    name: 'user_info',
    initialState,
    reducers: {
        setUserInfo:(state,action)=>{
            state.email = action.payload.email
            state.name = action.payload.name
        },
        unSetuserInfo : (state,action)=>{
            state.email = action.payload.email
            state.name = action.payload.name
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUserInfo,unSetuserInfo } = userSlice.actions

export default userSlice.reducer