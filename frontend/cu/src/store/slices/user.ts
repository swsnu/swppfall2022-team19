import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";

export interface UserType {
  id: number;
  username: string;
  password: string;
  loginState: boolean;
}

export interface UserState {
  users: UserType[];
  selectedUser: UserType | null;
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
};


export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (id: UserType["id"], { dispatch }) => {
    const response = await axios.get(`/api/user/login/`);
    return response.data ?? null;
  }
);

export const postUser = createAsyncThunk( // signup
  "user/postUser",
  async (user: Pick<UserType, "username" | "password" >, { dispatch }) => {
    const response = await axios.post("/api/user/signup/", user);
    console.log(postUser)
    dispatch(userActions.addUser(response.data));
  }
);

export const putUser = createAsyncThunk( // login
  "user/putUser",
  async (user: Pick<UserType, "username" | "password" >, { dispatch }) => {
    const response = await axios.put("/api/user/login/", user);
    dispatch(userActions.loginUser(response.data));
  }
);


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getAll: (state, action: PayloadAction<{ users: UserType[] }>) => {},
    getUser: (state, action: PayloadAction<{ targetId: number }>) => {
      const target = state.users.find(
        (user) => user.id === action.payload.targetId
      );
      state.selectedUser = target ?? null;
    },
    addUser: ( // register 
      state,
      action: PayloadAction<{ username: string; password: string }>
    ) => {
      const newUser = {
        id: state.users[state.users.length - 1].id + 1, // temporary
        username: action.payload.username,
        password: action.payload.password,
        loginState: false 
      };
      state.users.push(newUser);
    },

    loginUser:  ( // login 
      state,
      action: PayloadAction<{ username: string; password: string }>
    ) => {

      const target = state.users.find(
        (user) => user.username === action.payload.username
      );

      state.selectedUser = target ?? null;

      if(target!=null && target.password === action.payload.password) target.loginState = true // logged in 
      // check target is null after login trial.

      }    
  },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.selectedUser = action.payload;
    });
    builder.addCase(postUser.rejected, (_state, action) => {
      console.error(action.error);
    });
  },
});

export const userActions = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
