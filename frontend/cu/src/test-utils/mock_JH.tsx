import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { ProductStore, ProductRootState } from "../store/index";
import productReducer from "../store/slices/product";
import rateReducer from '../store/slices/rate'


import { UserRootState } from "../store/index";
import userReducer from "../store/slices/User";


interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<ProductRootState>;
  store?: ProductStore;
}

export const getMockProductStore = (preloadedState?: PreloadedState<ProductRootState>) => {
  return configureStore({
    reducer: {
      user: userReducer,
      product: productReducer,
      rate: rateReducer,
     },
    preloadedState,
  });
};


export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState,
    // Automatically create a store instance if no store was passed in
    store = getMockProductStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}



// User Mock State

export const getMockUserStore = (preloadedState?: PreloadedState<UserRootState>) => {
  return configureStore({
    reducer: { user: userReducer,
     },
    preloadedState,
  });
};
