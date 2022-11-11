import {configureStore} from "@reduxjs/toolkit";
import productReducer from "./slices/product"
import userReducer from "./slices/User";

export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;