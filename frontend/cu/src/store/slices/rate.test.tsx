import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from '@reduxjs/toolkit'
import { waitFor } from '@testing-library/react'
import axios from 'axios'
import reducer, { RateState, createRate, deleteRate, fetchRates, updateRate} from './rate'

describe('rate reducer', () => {
  let store: EnhancedStore<{ rate: RateState }, AnyAction, [ThunkMiddleware<{ rate: RateState }, AnyAction, undefined>]>
  const rate1 = {
    id: 1,
    user_id: 1,
    username: "user1",
    product_id: 1,
    scores: "33333",
    comment: "comment1",
    picture: "picture1", //temp, need to change later
    likedCount: 0
  }
  const rate2 = {
    id: 2,
    user_id: 1,
    username: "user1",
    product_id: 1,
    scores: "55555",
    comment: "comment2",
    picture: "picture2", //temp, need to change later
    likedCount: 0
  }
  
  const formData = new FormData()
  formData.append('user_id', String(rate1))
  formData.append('username', rate1.username)
  formData.append('product_id', String(rate1.product_id))
  formData.append('scores', rate1.scores)
  formData.append('comment', rate1.comment)

  beforeAll(() => {
    store = configureStore({ reducer: { rate: reducer } })
})

  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      rates: [],
      selectedRate: null
    })
  })

  it('should handle createRate', async () => {
    jest.spyOn(axios, 'post').mockResolvedValue({ data: rate1 })
    const result = await store.dispatch(
      createRate(formData)
    )
    expect(result.type).toBe(`${createRate.typePrefix}/fulfilled`)
    expect(store.getState().rate.rates.length).toEqual(1)
  })

  it('should handle fetchRates', async () => {
    axios.get = jest.fn().mockResolvedValue({ data: [rate1] })
    await store.dispatch(fetchRates())  //id = product ID
    expect(store.getState().rate.rates).toEqual([rate1])
  })
  it('should handle deleteRate', async () => {
    axios.delete = jest.fn().mockResolvedValue({ data: null })
    await store.dispatch(deleteRate(2))
    expect(store.getState().rate.rates).toEqual([])
  })
  it('should handle updateRate', async () => {
    jest.spyOn(axios, 'post').mockResolvedValue({ data: rate1 })
    await store.dispatch(
      createRate(formData)
    )
    jest.spyOn(axios, 'post').mockResolvedValue({ data: { ...rate1, id: 2 } })
    await store.dispatch(
        createRate(formData)
    )
    jest.spyOn(axios, 'put').mockResolvedValue({
      data: rate2
    })
    await store.dispatch(updateRate(formData))
    await waitFor(() => expect(store.getState().rate.rates.find(rate => rate.id === rate1.id)?.comment).toEqual(rate2.comment))
  })
  it('should handle createRate error', async () => {
    const mockConsole = jest.fn()
    window.console.error = mockConsole
    jest.spyOn(axios, 'post').mockRejectedValue({ data: null })
    const result = await store.dispatch(
        createRate(formData)
    )
    expect(result.type).toBe(`${createRate.typePrefix}/rejected`)
  })
})
