import { configureStore, PreloadedState } from '@reduxjs/toolkit'
import { render, RenderOptions } from '@testing-library/react'
import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { AppStore, RootState } from '../store'
import userReducer from '../store/slices/User'
import productReducer from '../store/slices/product'
import rateReducer from '../store/slices/rate'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<RootState>
    store?: AppStore
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
