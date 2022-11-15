import { EnhancedStore, ThunkMiddleware, AnyAction, configureStore } from '@reduxjs/toolkit'
import { waitFor } from '@testing-library/react'
import axios from 'axios'
import reducer, { ProductState, fetchProduct, fetchQueryProducts, updateProduct } from './product'

describe('product reducers', () => {
    let store: EnhancedStore<{ product: ProductState }, AnyAction, [ThunkMiddleware<{ product: ProductState }, AnyAction, undefined>]>
    const product1 = {
        id: 1,
        name: "productName1",
        mainCategory: "productMainCategory1",
        subCategory: "productSubCategory1",
        imageUrl: "productImageUrl1",
        details: "productDetail1",
        price: 1000,
        newProduct: true,
        tags: ["product1Tag1, product1Tag2"],
        averageScore: 5.0
    }
    const product2 = {
        id: 1,
        name: "productName2",
        mainCategory: "productMainCategory2",
        subCategory: "productSubCategory2",
        imageUrl: "productImageUrl2",
        details: "productDetail2",
        price: 2000,
        newProduct: false,
        tags: ["product2Tag1, product2Tag2"],
        averageScore: 3.0
    }
    const dataForUpdate = {
        id: 2,
        averageScore: 4.0
    }
    beforeAll(() => {
        store = configureStore({ reducer: { product: reducer } })
    })

    it('should handle initial state', () => {
        expect(reducer(undefined, { type: 'unknown' })).toEqual({
            products: [],
            selectedProduct: null
        })
    })
    it('should handle fetchQueryProduct', async () => {
        axios.get = jest.fn().mockResolvedValue({ data: [product1] })
        await store.dispatch(fetchQueryProducts({ mainCategory: "productMainCategory1" }))
        expect(store.getState().product.products).toEqual([product1])
    })
    it('should handle fetchProduct', async () => {
        axios.get = jest.fn().mockResolvedValue({ data: product1 })
        await store.dispatch(fetchProduct(1))
        expect(store.getState().product.selectedProduct).toEqual(product1)
      })
    it('should handle updateProduct', async () => {
        jest.spyOn(axios, 'put').mockResolvedValue({
            data: product2
        })
        await store.dispatch(updateProduct(dataForUpdate))
        await waitFor(() => expect(store.getState().product.products.find(product => product.id === product1.id)?.averageScore).toEqual(product2.averageScore))
    })
})
