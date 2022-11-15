import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/product"
import userReducer from "./slices/User";
import rateReducer from "./slices/rate";
import axios from "axios";
import getCookie from "axios";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


// axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
// axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        rate: rateReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;