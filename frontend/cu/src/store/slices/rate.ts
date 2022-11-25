import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import client from '../api/client';
import { RootState } from "..";
import { UserType } from "./User"
import { ProductType } from "./product";


export interface RateType {
    id: number,
    user_id: UserType['id'],
    user_username: UserType['username'],
    product_id: ProductType['id'],
    scores: string,  //number[]--> string, 
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
        const response = await client.get<RateType[]>(`/api/rate/`)  //id = productID
        return response.data
    }
)




export const createRate = createAsyncThunk(
    'product/createRate',
    async (data: FormData, { dispatch }) => {
        const response = await client.post(`/api/rate/`, data)
        dispatch(rateActions.addRate(response.data))
        return response.data
    }
)

export const updateRate = createAsyncThunk(
    'product/updateRate',
    async (rate: FormData, { dispatch }) => {
        const id = rate.get('id')
        const { ...data } = rate
        const response = await client.put(`/api/rate/${id}/`, data)  //id = rateID
        dispatch(rateActions.updateRate(response.data))
        return response.data
    }
)



export const deleteRate = createAsyncThunk(
    'product/deleteRate',
    async (id: RateType['id'], { dispatch }) => {
        await client.delete(`/api/rate/${id}/`)
        dispatch(rateActions.deleteRate(id))
    }
)



export const rateSlice = createSlice({
    name: 'rate',
    initialState,
    reducers: {
        addRate: (state, action: PayloadAction<RateType>) => {
            const newRate = {
                id: state.rates.length + 1,
                user_id: Number(action.payload.user_id),
                user_username: action.payload.user_username,
                product_id: Number(action.payload.product_id),
                scores: action.payload.scores,
                comment: action.payload.comment,
                picture: action.payload.picture,
                likedCount: 0
            }
            state.rates.push(newRate)
            state.selectedRate = newRate
        },
        updateRate: (state, action: PayloadAction<RateType>) => {
            const rate = state.rates.find(rate => (rate.id === Number(action.payload.id)))
            if (rate) {
                rate.scores = action.payload.scores
                rate.comment = action.payload.comment
                rate.picture = action.payload.picture
            }
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