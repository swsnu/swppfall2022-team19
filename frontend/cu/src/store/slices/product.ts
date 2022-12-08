import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import client from '../api/client';


export interface ProductType {
    id: number,
    name: string,
    mainCategory: string,
    subCategory: string, 
    imageUrl: string,
    details: string,
    price: number,
    newProduct: boolean,
    tags: string[],
    averageScore: number,
    rateCount: number,
}

export interface TagType{
  id: number, 
  name: string,
}

export interface ProductState {
    products: ProductType[],
    selectedProduct: ProductType | null,
    tags: TagType[],
    
}


//fetch all products by main category -- does not work
export const fetchQueryProducts = createAsyncThunk(
  'product/fetchProductByMainCategory',
  async (params: { mainCategory?: string }) => {
    const response = await client.get<ProductType[]>('/api/product/', { params })
    return response.data
  }
)

// fetch products matching searching string key
export const fetchSearchProducts = createAsyncThunk(
  'product/fetchSearchProducts', 
  async (params: { name: string }) => { 
    const response = await client.get<ProductType[]>('/api/product/', { params }) 
    return response.data
  }
)

// fetch products matching searching string key
export const fetchAllProducts = createAsyncThunk(
  'product/fetchAllProducts', 
  async () => { 
    const response = await client.get<ProductType[]>('/api/product/') 
    return response.data
  }
)



//fetch product by id
  export const fetchProduct = createAsyncThunk(
    'product/fetchProduct',
    async (id: ProductType['id']) => {
      const response = await client.get(`/api/product/${id}/`)
      return response.data
    }
  )


  //update information of score 
  export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async (product: Pick<ProductType, 'id'|'averageScore'>, { dispatch }) => { //only updates 
      const { id, averageScore } = product

      const response = await client.put(`/api/product/${id}/`, product)
      dispatch(productActions.updateProduct(response.data))
      return response.data
    }
  )

//product is not created, it's stored in db
  const initialState: ProductState = {
    products: [],
    selectedProduct: null,
    tags: [
      { id : 49, name: '우유' },
      { id : 48, name: '가공유' },
      { id : 47, name: '발효유' },
      { id : 46, name: '효상요구르트' },
      { id : 45, name: '요구르트' },
      { id : 44, name: '아이스드링크' },
      { id : 43, name: '음료' },
      { id : 42, name: '건강음료' },
      { id : 41, name: '캔/병커피' },
      { id : 40, name: '커피음료' },
      { id : 39, name: '냉장커피' },
      { id : 38, name: '식재료' },
      { id : 37, name: '과일' },
      { id : 36, name: '핫바' },
      { id : 35, name: '안주류' },
      { id : 34, name: '마른안주류' },
      { id : 33, name: '육가공류' },
      { id : 32, name: '소시지' },
      { id : 31, name: '햄' },
      { id : 30, name: '냉장밀키트' },
      { id : 29, name: '냉장면' },
      { id : 28, name: '가공식사' },
      { id : 27, name: '즉석식' },
      { id : 26, name: '간편식' },
      { id : 25, name: '아이스크림' },
      { id : 24, name: '초콜릿' },
      { id : 23, name: '젤리' },
      { id : 22, name: 'HEYROO' },
      { id : 21, name: '캔디류' },
      { id : 20, name: '토이캔디' },
      { id : 19, name: '젤리류' },
      { id : 18, name: '소프트캔디' },
      { id : 17, name: '푸딩' },
      { id : 16, name: '냉장젤리' },
      { id : 15, name: '찐빵류' },
      { id : 14, name: '조리빵' },
      { id : 13, name: '과자류' },
      { id : 12, name: '스낵' },
      { id : 11, name: '디저트' },
      { id : 10, name: '냉장디저트' },
      { id : 9, name: '쿠키' },
      { id : 8, name: '비스켓' },
      { id : 7, name: '김밥' },
      { id : 6, name: '주먹밥' },
      { id : 5, name: '삼각김밥' },
      { id : 4, name: '핫도그' },
      { id : 3, name: '햄버거' },
      { id : 2, name: '간편식사' },
      { id : 1, name: '도시락' },
      ]
  }

  export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        updateProduct: (
            state, action: PayloadAction<ProductType>
          ) => {
            state.products = state.products.map(
              product => (product.id === action.payload.id) ? action.payload : product
            )
          },
          
          noProduct: (
            state,
          ) => {
            state.products = []
          },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchQueryProducts.fulfilled, (state, action) => {
          state.products = action.payload
        })
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
          state.selectedProduct= action.payload
        })
        builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
          state.products = action.payload
        })

      }
  })


  export const productActions = productSlice.actions;
  export const selectProduct = (state: RootState) => state.product;
  export const tags = initialState.tags;
  
  export default productSlice.reducer;

  
  
