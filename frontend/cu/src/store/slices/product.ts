import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";

export interface ProductType {
    // pageLink: string;
    id: number,
    name: string,
    mainCategory: string,
    subCategory: string, 
    imageUrl: string,
    details: string,
    price: number,
    newProduct: boolean,
    tags: string[]
}

export interface ProductState {
    products: ProductType[],
    selectedProduct: ProductState | null
}



export const fetchProductByMainCategory= createAsyncThunk(
    'product/fetchProductByMainCategory',
    async (params: ProductType['mainCategory']) => {
      const response = await axios.get<ProductType[]>('/api/product/:mainCategory/all', { params })
      return response.data
    }
  )
  