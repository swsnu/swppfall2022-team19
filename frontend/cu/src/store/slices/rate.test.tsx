import { EnhancedStore, ThunkMiddleware, AnyAction, configureStore } from '@reduxjs/toolkit'
import axios from 'axios'
import reducer, {
    RateState, fetchRates, fetchUserRate, fetchUserLikedRate, addUserRate, createRate,
    updateRate, deleteRate
} from './rate'

describe('ratereducers', () => {
    let store: EnhancedStore<{ rate: RateState }, AnyAction, [ThunkMiddleware<{ rate: RateState }, AnyAction, undefined>]>
    const rate1 = {
        id: 1,
        user_id: 1,
        username: 'username',
        product_id: 1,
        scores: '55555',
        comment: 'rate_comment',
        picture: 'rate_picture',
        likedCount: 0,
        created_at: 22 / 12 / 13,
    }
    const rateList = [{
        id: 1,
        user_id: 1,
        username: 'username',
        product_id: 1,
        scores: '55555',
        comment: 'rate_comment',
        picture: 'rate_picture',
        likedCount: 0,
        created_at: 22 / 12 / 13,
    }]

    const rateList2 = [
        {
            id: 1,
            user_id: 1,
            username: 'username',
            product_id: 1,
            scores: '55555',
            comment: 'rate_comment',
            picture: 'rate_picture',
            likedCount: 0,
            created_at: 22 / 12 / 13,
        },
        {
            id: 1,
            user_id: 1,
            username: 'username',
            product_id: 1,
            scores: '55555',
            comment: 'rate_comment',
            picture: 'rate_picture',
            likedCount: 0,
            created_at: 22 / 12 / 13,
        }
    ]
    const dataForUpdate = {
        id: 2,
        averageScore: 4.0
    }

    const formData = new FormData()
    formData.append('user_id', String(1))
    formData.append('product_id', String(1))
    formData.append('scores', '55555')
    formData.append('comment','rate_comment')
    formData.append('picture', 'rate_picture')

    beforeAll(() => {
        store = configureStore({ reducer: { rate: reducer } })
    })

    it('should handle initial state', () => {
        expect(reducer(undefined, { type: 'unknown' })).toEqual({
            rates: [],
            selectedRates: [],
            selectedRate: null,
            likedRates: [],
        })
    })
    it('should handle fetchUserRate', async () => {
        axios.get = jest.fn().mockResolvedValue({ data: [rate1] })
        await store.dispatch(fetchUserRate({ user_id: 1 }))
        expect(store.getState().rate.selectedRates).toEqual(rateList)
    })
    it('should handle fetchUserLikedRate', async () => {
        axios.get = jest.fn().mockResolvedValue({ data: [rate1] })
        await store.dispatch(fetchUserLikedRate({ user_id: 1 }))
        expect(store.getState().rate.selectedRates).toEqual(rateList)
    })
    it('should handle addUserRate', async () => {
        axios.get = jest.fn().mockResolvedValue({ data: [rate1] })
        await store.dispatch(addUserRate({ user_id: 1 }))
        expect(store.getState().rate.selectedRates).toEqual(rateList2)
    })
    it('should handle fetchRates', async () => {
        axios.get = jest.fn().mockResolvedValue({ data: rate1 })
        await store.dispatch(fetchRates())
        expect(store.getState().rate.rates).toEqual(rate1)
    })
    it('should handle createRate', async () => {
        axios.get = jest.fn().mockResolvedValue({ data: rate1 })
        await store.dispatch(createRate(formData))
        expect(store.getState().rate.selectedRate).toEqual(null)
    })
    it('should handle updateRate', async () => {
        axios.get = jest.fn().mockResolvedValue({ data: rate1 })
        await store.dispatch(updateRate(formData))
        expect(store.getState().rate.selectedRate).toEqual(null)
    })
    it('should handle deleteRate', async () => {
        axios.get = jest.fn().mockResolvedValue({ data: rate1 })
        await store.dispatch(deleteRate(1))
        expect(store.getState().rate.selectedRate).toEqual(null)
    })
})
