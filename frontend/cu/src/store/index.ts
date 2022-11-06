import {configureStore} from "@reduxjs/toolkit";
import rateReducer from "./slices/Rate";

export const store = configureStore({
    reducer: {
        rate: rateReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;