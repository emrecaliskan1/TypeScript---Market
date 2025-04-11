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

    }
})

export const { } = appSlice.actions

export default appSlice.reducer