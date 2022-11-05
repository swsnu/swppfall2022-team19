import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";

export interface ReviewType{
    id: number, 
    user_id: number, 
    product_id: number, 
    category_id: number,
    score: number[],
    //comment:string  --> 다른 컴포넌트에 만들어져 있어서 어떻게 integrate할 지 결정해야함
    }

export interface ReviewState{
    reviews: ReviewType[],
    selectedReview : ReviewType | null
 }

const initialState: ReviewState = {
    reviews: [
        {id: 1, user_id: 1, product_id: 1, category_id: 1, score: [4, 3, 5, 3, 3]}
    ],
    selectedReview: null
}

//fetch reviews for specific product
export const fetchReview = createAsyncThunk(
    "api/productID/fetchReviews",async () => {
        const response = await axios.get<ReviewType[]>("/api/productID/reviews/");
        return response.data;
    }
)

//post review to specific product
export const postReview = createAsyncThunk(
    "api/postReview",
   async (review: Pick<ReviewType, "user_id"|"product_id"|"category_id"|"score">,{dispatch}) => {
    const response = await axios.post("/api/productID/reviews/", review);
    dispatch(reviewActions.addReview(response.data));
   }
)


export const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
        addReview: (state, action: PayloadAction<{user_id: number, product_id: number, category_id:number,score: number[]}>) =>{
            const newReview = {
                id: state.reviews.length === 0 ? state.reviews.length + 1: state.reviews[state.reviews.length -1].id + 1,
                user_id: action.payload.user_id,
                product_id: action.payload.product_id,
                category_id: action.payload.category_id,
                score : action.payload.score,
            }
            state.reviews.push(newReview);
            state.selectedReview = newReview;
        }
    }
});


//export actions
export const reviewActions = reviewSlice.actions;

//to grab data
export const selectedReview = (state: RootState) => state.review.selectedReview;

export default reviewSlice.reducer;