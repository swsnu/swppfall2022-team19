import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";

export interface RateType{
    id: number, 
    user_id: number, 
    product_id: number, 
    category_id: number,
    score: number[],
    comment:string
    }

export interface RateState{
    rates: RateType[],
    selectedRate : RateType | null,
}

const initialState: RateState = {
    rates: [
        {id: 1, user_id: 1, product_id: 1, category_id: 1, score: [3, 3, 5, 3, 3], comment: "조금 짜긴한데 만족합니다!"}
    ],
    selectedRate: null,
}

//fetch reviews for specific product
export const fetchRate = createAsyncThunk(
    "api/productID/fetchRate",async () => {
        const response = await axios.get<RateType[]>("/api/productID/rates/");
        return response.data;
    }
)

//post review to specific product
export const postRate = createAsyncThunk(
    "api/postRate",
   async (rate: Pick<RateType, "user_id"|"product_id"|"category_id"|"score"|"comment">,{dispatch}) => {
    const response = await axios.post("/api/productID/rates/", rate);
    dispatch(rateActions.addRate(response.data));
   }
)


export const rateSlice = createSlice({
    name: "rate",
    initialState,
    reducers: {
        addRate: (state, action: PayloadAction<{user_id: number, product_id: number, category_id:number,score: number[], comment: string}>) =>{
            const newRate = {
                id: state.rates.length === 0 ? state.rates.length + 1: state.rates[state.rates.length -1].id + 1,
                user_id: action.payload.user_id,
                product_id: action.payload.product_id,
                category_id: action.payload.category_id,
                score : action.payload.score,
                comment : action.payload.comment
            }
            state.rates.push(newRate);
            state.selectedRate = newRate;
        },        
    }
});


//export actions
export const rateActions = rateSlice.actions;

//to grab data
export const selectedReview = (state: RootState) => state.rate.selectedRate;

export default rateSlice.reducer;
