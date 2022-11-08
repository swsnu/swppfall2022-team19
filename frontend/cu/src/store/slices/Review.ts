import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";

export interface ReviewType{
    id: number;
    user_id: number;
    product_id: number;
    scores: number[];
    comment: string;
    likedCount: number;
    liked: boolean;
}

export interface ReviewState {
    reviews: ReviewType[];
    selectedReview: ReviewType | null;
    selectReviewLike : boolean;
}

const initialState: ReviewState = {
    reviews: [
        { id: 1, user_id: 5, product_id: 1, scores: [5,5,5,5,5], comment: "제가 제일 좋아하는 CU 제품입니다", likedCount:5, liked: true },
        { id: 2, user_id: 4, product_id: 1, scores: [5,5,5,5,5], comment: "재료가 다양해서 좋아요", likedCount:5, liked: true},
        { id: 3, user_id: 3, product_id: 1, scores: [2,2,2,2,2], comment: "제가 기대했던 맛은 아니네요",likedCount:2, liked: true },
        { id: 4, user_id: 2, product_id: 1, scores: [1,1,1,1,1], comment: "너무 맛없음", likedCount:1, liked: true },
        { id: 5, user_id: 1, product_id: 1, scores: [5,5,5,5,5], comment: "나쁘지 않음. 한 번 먹어볼만 합니다.", likedCount:5,  liked: false },
    ],
    selectedReview: null,
    selectReviewLike: false,
}

//fetch reviews for specific product
export const fetchReview = createAsyncThunk(
    "api/productID/fetchReview",async (productID: ReviewType["product_id"]) => {
        const response = await axios.get<ReviewType[]>(`/api/${productID}/review/`);
        return response.data;
    }
)

//post review to specific product
export const postReview = createAsyncThunk(
    "api/postReview",
   async (review: Pick<ReviewType, "user_id"|"product_id"|"scores"|"comment"|"likedCount"|"liked">,{dispatch}) => {
    const response = await axios.post(`/api/${review.product_id}/review/`, review);
    dispatch(reviewActions.addReview(response.data));
   }
)

export const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
        addReview: (state, action: PayloadAction<{user_id: number, scores: number[], comment: string}>) =>{
            const newReview = {
                id: state.reviews.length === 0 ? state.reviews.length + 1: state.reviews[state.reviews.length -1].id + 1,
                user_id: 1, //action.payload.user_id,
                scores : [3,3,5,3,3],//action.payload.scores,
                comment : action.payload.comment,
                likedCount: 0,
                liked: false,
            }
            state.reviews.push(newReview);
            state.selectedReview = newReview;
        },
        clickLike: (state, action) =>{
            state.reviews[0].liked = !state.reviews[0].liked;
        },
        
        
    }
})

//export actions
export const reviewActions = reviewSlice.actions;

//to grab data
export const selectReview = (state: RootState) => state.review;

export default reviewSlice.reducer;