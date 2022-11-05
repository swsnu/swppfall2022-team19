import {configureStore} from "@reduxjs/toolkit";
import reviewReducer from "./slices/Review";

export const store = configureStore({
    reducer: {
        review: reviewReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;