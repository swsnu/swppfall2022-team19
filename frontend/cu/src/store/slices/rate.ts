import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { UserType } from "./User"
import { ProductType } from "./product";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface RateType {
    id: number,
    user_id: UserType['id'],
    username: UserType['username'],
    product_id: ProductType['id'],
    scores: number[],
    comment: string,
    picture: string, //temp, need to change later
    likedCount: number,
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
    async () => {
        const response = await axios.get<RateType[]>(`/api/rate/`)  //id = productID
        return response.data
    }
)



export const createRate = createAsyncThunk(
    'product/createRate',
    async (data: Omit<RateType, 'id'>, { dispatch }) => {
        const response = await axios.post(`/api/rate/`, data)  
        dispatch(rateActions.addRate(response.data))
        return response.data
    }
)

export const updateRate = createAsyncThunk(
    'product/updateRate',
    async (rate: RateType, { dispatch }) => {
        const { id, ...data } = rate
        const response = await axios.put(`/api/rate/${id}/`, data)  //id = rateID
        dispatch(rateActions.updateRate(response.data))
        return response.data
    }
)



export const deleteRate = createAsyncThunk(
    'product/deleteRate',
    async (id: RateType['id'], { dispatch }) => {
        await axios.delete(`/api/rate/${id}/`)
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
                rate => rate.id !== action.payload
            )
            state.selectedRate = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRates.fulfilled, (state, action) => {
          state.rates = action.payload
        })
        builder.addCase(createRate.rejected, (_state, action) => {
          console.error(action.error)
        })
      }

})

export const rateActions = rateSlice.actions
export const selectRate = (state: RootState) => state.rate
export default rateSlice.reducer