import {configureStore} from "@reduxjs/toolkit";
import productReducer from "./slices/product"
import userReducer from "./slices/User";
import rateReducer from "./slices/rate";

export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        rate: rateReducer
    }
})

export const productStore = configureStore({
    reducer: {
    product: productReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export type ProductStore = typeof productStore; 
export type ProductRootState = ReturnType<typeof productStore.getState>;