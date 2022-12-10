import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// 테스팅 각주 import axios from "axios";
import client from '../api/client';
import { RootState } from "..";

// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface UserType {
  id: number;
  username: string;
  password: string;
  gender: number;
  age: number;
  taste: string;
  question: number;
  loginState: boolean;
}
export interface UserLoginRequest {
  username: string;
  password: string;
}
export interface UserSignupRequest {
  username: string;
  password: string;
  gender: number;
  age: number;
  taste: string;
  question: number;
}


export interface SurveyRequest {
  gender: number;
  age: number;
  taste: string;
  question: number;
}


export interface UserState {
  users: UserType[];
  selectedUser: UserType | null;
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
};




// 1. 회원가입 함수. 유저 정보 저장.
export const postUser = createAsyncThunk( // signup
  "user/postUser",
  async (user: Pick<UserSignupRequest, "username" | "password" | "age" | "gender" | "question" | "taste">, { dispatch }) => {
    const response = await client.post("api/user/signup/", user);

    dispatch(userActions.addUser(response.data));
  }
);

// 2. 로그인 함수. selectedUser 설정.
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user: Pick<UserLoginRequest, "username" | "password">, { dispatch }) => {
    const response = await client.post("/api/user/signin/", user);
    dispatch(userActions.loginUser(response.data));
    // localStorage.setItem('loginUser', JSON.stringify(response.data));
  }
)

// 3. 로그아웃 함수 
export const signoutUser = createAsyncThunk(
  "user/signoutUser",
  async (user: void, { dispatch }) => {
  
    const response = await client.get("/api/user/signout/");

    dispatch(userActions.signoutUser(response.data));
    // 그런데 로그인의 경우 로그인 실패 시 에러가 발생할 수도 있음
    // 에러 HttpResponse(status=401)인데, 로그인 오류 시 alert 
    // localStorage.clear();

  }
)

// 4. getUsers. 백엔드에서 userList 받아와서 initialState 업데이트
export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (user: void, { dispatch }) => {
    const response = await client.get("/api/user/userlist/");
    
    dispatch(userActions.getUsers(response.data));
    return response.data ?? null;
  }
)

// 5. getRequestUser. 현재 request.user의 정보를 받아옴
export const getRequestUser = createAsyncThunk(
  "user/getRequestUser",
  async (user: void, { dispatch }) => {
    const response = await client.get("/api/user/requestUser/");


    if (response.data === '') {
      window.location.replace('/login');
      // localStorage.clear();
    } else {

      // localStorage.setItem('loginUser', JSON.stringify(response.data));
    }
    dispatch(userActions.getRequestUser(response.data));
    return response.data ?? null;
  }
)

export const getRequestUserAtLogin = createAsyncThunk(
  "user/getRequestUser",
  async (user: void, { dispatch }) => {
    const response = await client.get("/api/user/requestUser/");

    if (response.data === '') {

      // localStorage.clear();
      // window.location.replace('/login');
    } else {
      // localStorage.setItem('loginUser', JSON.stringify(response.data));
      window.location.replace('/home');
    }
    dispatch(userActions.getRequestUser(response.data));
    return response.data ?? null;
  }
)


export const putSurvey = createAsyncThunk(
  "user/newSurvey",
  async (user: Pick<UserType, "id" | "age" | "gender" | "taste" | "question">, { dispatch }) => {

    const response = await client.put(`/api/user/newSurvey/${user.id}/`, user);

    dispatch(userActions.putSurvey(response.data));
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getRequestUser: (state, action: PayloadAction<UserType>) => {
          if (action.payload === null || action.payload === undefined) {
        state.selectedUser = null;
       
      } else {
        const targetUser = state.users.find(
          (user: UserType) => (user.username === action.payload.username)
        );
        if (targetUser) {
          state.selectedUser = targetUser;
        } else {
        
          state.selectedUser = null;
          // localStorage.clear();
          // window.location.replace('/login');
        }


      }
    },
    getUsers: (state, action: PayloadAction<UserType[]>) => {

      if (action.payload === null || action.payload === undefined) {

      } else {
        var user_list: UserType[] = [];
        for (var i = 0; i < action.payload.length; i++) {
          user_list.push({ "id": action.payload[i].id, "username": action.payload[i].username, "password": action.payload[i].password, "age": action.payload[i].age, "gender": action.payload[i].gender, "loginState": action.payload[i].loginState, "taste": action.payload[i].taste, "question": action.payload[i].question });
        }
        // 유저탈퇴 기능이 있다면 오류가 생길 수 있음

        state.users = user_list;
   
      }
    },
    loginUser: (state, action: PayloadAction<UserLoginRequest>) => {
      const targetUser = state.users.find(
        (user: UserType) => (user.username === action.payload.username)
        // && (user.password === action.payload.password)
      );

      if (targetUser) {
        targetUser.loginState = true;
        state.selectedUser = targetUser;
       
      }
      else {
       
        state.selectedUser = null;
      };

    },

    signoutUser: (state, action: PayloadAction<UserLoginRequest>) => {

      state.selectedUser!.loginState = false;
      state.selectedUser = null;

    },

    addUser: ( // register, signup
      state,
      action: PayloadAction<UserType>
    ) => {
      // return { ...state, selectedUser: action}
      const newUser = {
        id: action.payload.id, // state.users[state.users.length - 1].id + 1, // temporary
        username: action.payload.username,
        password: action.payload.password,

        gender: action.payload.gender,
        age: action.payload.age,
        taste: action.payload.taste,
        question: action.payload.question,
        loginState: false
      };
      state.users.push(newUser);

    },
    putSurvey: (state, action: PayloadAction<SurveyRequest>) => {

      if (state.selectedUser == null) {

      } else {
        state.selectedUser.gender = action.payload.gender;
        state.selectedUser.age = action.payload.age;
        state.selectedUser.taste = action.payload.taste;
        state.selectedUser.question = action.payload.question;

        state.users[state.selectedUser.id] = state.selectedUser;

      }
    },
  },

});

export const userActions = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export const userList = (state: RootState) => state.user.users;
export const selectedUser = (state: RootState) => state.user.selectedUser;
export default userSlice.reducer;


