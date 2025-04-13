import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { ProductType } from '../types/Types'

export interface BasketSliceType {
    basket:ProductType[]
}

const initialState = {
    basket:[]
}

const basketSlice = createSlice({
    name:"basket",
    initialState,
    reducers: {
        addProductToBasket : (state:BasketSliceType,action:PayloadAction<ProductType>)=>{
            if(state.basket.length==0){
                state.basket = [action.payload]
            }else{
                //ürün var ise
                const findProduct = state.basket.find((product:ProductType)=> product.id === action.payload.id)
                if(findProduct){
                    //ürün zaten ekli
                    if(findProduct.count && action.payload.count){
                        findProduct.count = findProduct.count + action.payload.count

                        state.basket = [...state.basket.map((product:ProductType)=>product.id === findProduct.id ? findProduct : product )]
                    }
                }
                else{
                    //yeni ürün. önceki ürünleri distract et, yeni geleni ekle.
                    state.basket = [...state.basket, action.payload]
                }
            }
        }
    }
})

export const { } = basketSlice.actions

export default basketSlice.reducer