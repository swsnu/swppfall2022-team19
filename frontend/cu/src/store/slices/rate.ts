import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { UserType } from "./User"
import { ProductType } from "./product";

export interface RateType {
    id: number,
    user_id: UserType['id'],
    user_username: UserType['username'],
    product: ProductType['id'],
    scores: number[],
    comment: string,
    picture: string, //temp, need to change later
    likedCount: number,
    liked: boolean
}

export interface RateState {
    rates: RateType[],
    selectedRate: RateType | null
}

const initialState: RateState = {
    rates: [],
    selectedRate: null
}


export const fetchRates = createAsyncThunk(
    'product/fetchRates',
    async (id: ProductType['id']) => {
        const response = await axios.get<RateType[]>(`/api/product/${id}/rates/`)  //id = productID
        return response.data
    }
)



export const createRate = createAsyncThunk(
    'product/createRate',
    async ({id, data}: {id: ProductType['id'], data: Omit<RateType, 'id'>}, { dispatch }) => {
        const response = await axios.post(`/api/product/${id}/rate/`, data)  
        dispatch(rateActions.addRate(response.data))
        return response.data
    }
)

export const updateRate = createAsyncThunk(
    'product/updateRate',
    async (rate: RateType, { dispatch }) => {
        const { id, ...data } = rate
        const response = await axios.put(`/api/product/rate/${id}/`, data)
        dispatch(rateActions.updateRate(response.data))
        return response.data
    }
)



export const deleteRate = createAsyncThunk(
    'product/deleteRate',
    async (id: RateType['id'], { dispatch }) => {
        await axios.delete(`/api/product/rate/${id}/`)
        dispatch(rateActions.deleteRate(id))
    }
)



export const rateSlice = createSlice({
    name: 'rate',
    initialState,
    reducers: {
        addRate: (state, action: PayloadAction<RateType>) => {
            const newRate = { ...action.payload }
            state.rates.push(newRate)
            state.selectedRate = newRate
        },
        updateRate: (state, action: PayloadAction<RateType>) => {
            state.rates = state.rates.map(
                rate => (rate.id === action.payload.id) ? action.payload : rate
            )
        },
        deleteRate: (state, action: PayloadAction<RateType['id']>) => {
            state.rates = state.rates.filter(
                rate => rate.id != action.payload
            )
            state.selectedRate = null
        }
    },

})

export const rateActions = rateSlice.actions
export const selectedRate = (state: RootState) => state.rate.selectedRate
export default rateSlice.reducer