import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import {UserType} from "./User"
import { ProductType } from "./product";

export interface RateType{
    id: number
    user: UserType['id']
    user_username : UserType['username']
    product: ProductType['id'],
    
    }