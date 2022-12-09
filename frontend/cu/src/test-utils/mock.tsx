import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { ProductStore, ProductRootState, RootState, AppStore } from "../store/index";
import productReducer from "../store/slices/product";

import { UserRootState } from "../store/index";
import userReducer from "../store/slices/User";
import rateReducer from "../store/slices/rate";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
    preloadedState?: PreloadedState<RootState>;
    store?: AppStore;
  }
  
export const rootInitialState: RootState = {
    user: {
        users: [],
        selectedUser: null
    },
    product: {
        products: [],
        selectedProduct: null,
        tags: []
    },
    rate: {
        rates: [],
        selectedRates: [],
        selectedRate: null,
        likedRates: [],
    }
}

export const getMockStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
        reducer: {
            user: userReducer,
            product: productReducer,
            rate: rateReducer,
        },
        preloadedState
    })
}




export function renderWithProviders(
    ui: React.ReactElement,
    {
      preloadedState,
      // Automatically create a store instance if no store was passed in
      store = getMockStore(preloadedState),
      ...renderOptions
    }: ExtendedRenderOptions = {}
  ) {
    function Wrapper({ children }: PropsWithChildren): JSX.Element {
      return <Provider store={store}>{children}</Provider>;
    }
  
    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
  }
  
  
  