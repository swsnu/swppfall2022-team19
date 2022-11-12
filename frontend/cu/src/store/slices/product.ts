import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";

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
    selectedProduct: ProductState | null
}


//fetch all products by main category
export const fetchProductByMainCategory= createAsyncThunk(
    'product/fetchProductByMainCategory',
    async (mainCategory: ProductType['mainCategory']) => {
      const response = await axios.get<ProductType[]>(`/api/product/${mainCategory}/all/`)
      return response.data
    }
  )
  
//fetch product by id
  export const fetchProduct = createAsyncThunk(
    'book/fetchProduct',
    async (id: ProductType['id']) => {
      const response = await axios.get(`/api/product/${id}/`)
      return response.data
    }
  )

  //update information of score 
  export const updateProduct = createAsyncThunk(
    'book/updateBook',
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
        builder.addCase(fetchProductByMainCategory.fulfilled, (state, action) => {
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
  export const selectedProduct = (state: RootState) => state.product.selectedProduct;
  export default productSlice.reducer;