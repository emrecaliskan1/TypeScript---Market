import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserType } from '../types/Types'

//uygulama genelindeki ortak slice'lar toplanacak.

export interface AppSliceType{
    currentUser: UserType | null,
    loading:boolean
}

const initialState = {
    currentUser:null,
    loading:false
}

const appSlice = createSlice({
    name:"app",
    initialState,
    reducers:{
        setLoading : (state:AppSliceType, action:PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setCurrentUser:(state:AppSliceType,action:PayloadAction<UserType>) => {
            state.currentUser = action.payload
        }
    }
})

export const {setLoading ,setCurrentUser} = appSlice.actions

export default appSlice.reducer