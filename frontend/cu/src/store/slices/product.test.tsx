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
            selectedProduct: null,
            tags: [
                { id : 1, name: '우유' },
                { id : 2, name: '가공유' },
                { id : 3, name: '발효유' },
                { id : 4, name: '효상요구르트' },
                { id : 5, name: '요구르트' },
                { id : 6, name: '아이스드링크' },
                { id : 7, name: '음료' },
                { id : 8, name: '건강음료' },
                { id : 9, name: '캔/병커피' },
                { id : 10, name: '커피음료' },
                { id : 11, name: '냉장커피' },
                { id : 12, name: '식재료' },
                { id : 13, name: '과일' },
                { id : 14, name: '핫바' },
                { id : 15, name: '안주류' },
                { id : 16, name: '마른안주류' },
                { id : 17, name: '육가공류' },
                { id : 18, name: '소시지' },
                { id : 19, name: '햄' },
                { id : 20, name: '냉장밀키트' },
                { id : 21, name: '냉장면' },
                { id : 22, name: '가공식사' },
                { id : 23, name: '즉석식' },
                { id : 24, name: '간편식' },
                { id : 25, name: '아이스크림' },
                { id : 26, name: '초콜릿' },
                { id : 27, name: '젤리' },
                { id : 28, name: 'HEYROO' },
                { id : 29, name: '캔디류' },
                { id : 30, name: '토이캔디' },
                { id : 31, name: '젤리류' },
                { id : 32, name: '소프트캔디' },
                { id : 33, name: '푸딩' },
                { id : 34, name: '냉장젤리' },
                { id : 35, name: '찐빵류' },
                { id : 36, name: '조리빵' },
                { id : 37, name: '과자류' },
                { id : 38, name: '스낵' },
                { id : 39, name: '디저트' },
                { id : 40, name: '냉장디저트' },
                { id : 41, name: '쿠키' },
                { id : 42, name: '비스켓' },
                { id : 43, name: '김밥' },
                { id : 44, name: '주먹밥' },
                { id : 45, name: '삼각김밥' },
                { id : 46, name: '핫도그' },
                { id : 47, name: '햄버거' },
                { id : 48, name: '간편식사' },
                { id : 49, name: '도시락' },
                ]
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
