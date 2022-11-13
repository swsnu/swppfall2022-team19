import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

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
    averageScore: number
}

export interface ProductState {
    products: ProductType[],
    selectedProduct: ProductType | null
}


//fetch all products by main category 
export const fetchQueryProducts = createAsyncThunk(
  'product/fetchProductByMainCategory',
  async (params: { mainCategory?: string }) => {
    const response = await axios.get<ProductType[]>('/api/product/', { params })
    return response.data
  }
)


//fetch product by id
  export const fetchProduct = createAsyncThunk(
    'product/fetchProduct',
    async (id: ProductType['id']) => {
      const response = await axios.get(`/api/product/${id}/`)
      return response.data
    }
  )

  //update information of score 
  export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async (product: Pick<ProductType, 'id'|'averageScore'>, { dispatch }) => { //only updates 
      const { id, averageScore } = product
      const response = await axios.put(`/api/product/${id}/`, averageScore)
      dispatch(productActions.updateProduct(response.data))
      return response.data
    }
  )

//product is not created, it's stored in db
  const initialState: ProductState = {
    products: [],
    selectedProduct: null
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
    },
    extraReducers: (builder) => {
        builder.addCase(fetchQueryProducts.fulfilled, (state, action) => {
          state.products = action.payload
        })
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
          state.selectedProduct= action.payload
        })
        builder.addCase(updateProduct.rejected, (_state, action) => {
          console.error(action.error)
        })
      }
  })


  export const productActions = productSlice.actions;
  export const selectProduct = (state: RootState) => state.product;
  export default productSlice.reducer;