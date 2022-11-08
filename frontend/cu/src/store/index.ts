import {configureStore} from "@reduxjs/toolkit";
import rateReducer from "./slices/Rate";
import reviewReducer from "./slices/Review";
import userReducer from "./slices/User"

export const store = configureStore({
    reducer: {
        rate: rateReducer,
        review: reviewReducer,
        user: userReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;