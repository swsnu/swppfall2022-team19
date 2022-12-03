import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import client from '../api/client';
import { RootState } from "..";
import { UserType } from "./User"
import { ProductType } from "./product";


export interface RateType {
    id: number,
    user_id: UserType['id'],
    username: UserType['username'],
    product_id: ProductType['id'],
    scores: string,  //number[]--> string, 
    comment: string,
    picture: string, //temp, need to change later
    likedCount: number,
}

export interface RateState {
    rates: RateType[],
    selectedRates: RateType[],
    selectedRate: RateType | null
}

const initialState: RateState = {
    rates: [],
    selectedRates: [],
    selectedRate: null
}


// export const fetchUserRate = createAsyncThunk(
//     'rate/user/',
//     async (userID: RateType['user_id']) => {
//         const response = await client.get<RateType[]>(`/api/rate/user`)
//         return response.data
//     }
// )


export const fetchUserRate = createAsyncThunk(
    'rate/userRates',
    async (params: { user_id: number }) => {
        const response = await client.get<RateType[]>('/api/rate/user/', { params })
        return response.data
    }
)


export const addUserRate = createAsyncThunk(
    'rate/addUserRates',
    async (params: { user_id: number }) => {
        const response = await client.get<RateType[]>('/api/rate/user/', { params })
        return response.data
    }
)



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
        const response = await client.put(`/api/rate/${id}/`, rate)  //id = rateID
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
            const newRate = { ...action.payload }
            state.rates.push(newRate)
            state.selectedRate = newRate
        },
        updateRate: (state, action: PayloadAction<RateType>) => {
            state.rates = state.rates.map(
                rate => (rate.id === Number(action.payload.id)) ? action.payload : rate)

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
            state.rates = action.payload;
        })
        builder.addCase(createRate.rejected, (_state, action) => {
            console.error(action.error);
        })
        builder.addCase(fetchUserRate.fulfilled, (state, action) => {
            state.selectedRates = action.payload;
        })
        builder.addCase(addUserRate.fulfilled, (state, action) => {
            action.payload.forEach(element => {
                state.selectedRates.push(element)                
            });
        })
    }

})

export const rateActions = rateSlice.actions
export const selectRate = (state: RootState) => state.rate
export default rateSlice.reducer