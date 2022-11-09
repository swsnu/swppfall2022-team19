import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
// 그나마 참고할 만한 자료
// Reducer: https://github.com/swsnu/swpp2021-team13/blob/main/frontend/probloom/src/store/reducers/userReducer.tsx
// Actions: https://github.com/swsnu/swpp2021-team13/blob/main/frontend/probloom/src/store/actions/userActions.tsx
// ActionTypes: https://github.com/swsnu/swpp2021-team13/blob/main/frontend/probloom/src/store/actions/actionTypes.tsx
// 이들의 user 객체(우리와 동일): https://github.com/swsnu/swpp2021-team13/blob/main/backend/probloom/prob/models.py
export interface UserType {
  // reducers/userReducer.tsx/interface User에 대응
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
  // actions/userActions.tsx/SigninRequest에 대응
  // 로그인에 필요한 정보
  username: string;
  password: string;
}
export interface UserSignupRequest {
  // id: number;
  username: string;
  password: string;
  gender: number;
  age: number;
  taste: string;
  question: number;
  // loginState: boolean;
}



export interface UserState {
  users: UserType[];
  selectedUser: UserType | null;
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
};




// signup 회원가입에 사용되는 함수 
// Pick<UserType 옆에 넣는 거 빼고는 수정 안 함
export const postUser = createAsyncThunk( // signup
  "user/postUser",
  async (user: Pick<UserSignupRequest, "username" | "password" | "age" | "gender" | "question" | "taste">, { dispatch }) => {
    const response = await axios.post("api/user/signup/", user);

    dispatch(userActions.addUser(response.data));
  }
);

// 방금 추가한 내용, 다음을 참고하세요
// swppfall2022-team19/backend/cu/user/views.py
// 로그인 signin에 사용되는 함수
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user: Pick<UserLoginRequest, "username" | "password">, { dispatch }) => {
    // console.log("user ", user.username , user.password )
    const response = await axios.post("api/user/login/", user);
    
    dispatch(userActions.loginUser(response.data));
    // 그런데 로그인의 경우 로그인 실패 시 에러가 발생할 수도 있음
    // 에러 HttpResponse(status=401)인데, 로그인 오류 시 alert 

  }
)

export const signoutUser = createAsyncThunk(
  "user/signoutUser",
  async (user: void, { dispatch }) => {
    // console.log("user ", user.username , user.password )
    const response = await axios.get("api/user/signout/");
    
    dispatch(userActions.signoutUser(response.data));
    // 그런데 로그인의 경우 로그인 실패 시 에러가 발생할 수도 있음
    // 에러 HttpResponse(status=401)인데, 로그인 오류 시 alert 

  }
)

/*
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (username: UserType["username"], { dispatch }) => {
    const response = await axios.get(`/api/user/login/`);
    return response.data ?? null;
  }
);


export const putUser = createAsyncThunk( // login
  "user/putUser",
  async (user: Pick<UserType, "username" | "password">, { dispatch }) => {
    const response = await axios.put("/api/user/login/", user);
    if( response.data == null ){ // if login failed ,
      console.log("login failed in putUser")

    }else{
    dispatch(userActions.loginUser(response.data));}
  }
);
*/

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<UserLoginRequest>) => {
      const targetUser = state.users.find(
        (user) => (user.username === action.payload.username) 
        // && (user.password === action.payload.password)
        
      );

      if (targetUser) {
        targetUser.loginState = true;
        state.selectedUser = targetUser
        // console.log("Logged_in User: " + targetUser.username);
      }
      else {
        // alert("Username or password is wrong")
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



    /*
    getAll: (state, action: PayloadAction<{ users: UserType[] }>) => { },
    getUser: (state, action: PayloadAction<{ targetId: number }>) => {
      const target = state.users.find(
        (user) => user.username === action.payload.targetusername
      );
      state.selectedUser = target ?? null;
    },
    

    loginUser: ( // login 
      state,
      action: PayloadAction<{ username: string; password: string }>
    ) => {

      const target = state.users.find(
        (user) => user.username === action.payload.username

      );


      state.selectedUser = target ?? null;

      if (target != null && target.password === action.payload.password) target.loginState = true // logged in 
      // check target is null after login trial.
     

    }
     */
  },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    /*
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.selectedUser = action.payload;
    });
    builder.addCase(postUser.rejected, (_state, action) => {
      console.error(action.error);
    });
    */
  },
});

export const userActions = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;




/*
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


export interface UserType {
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
  async (username: UserType["username"], { dispatch }) => {
    const response = await axios.get(`/api/user/login/`);
    return response.data ?? null;
  }
);

export const postUser = createAsyncThunk( // signup
  "user/postUser",
  async (user: Pick<UserType, "username" | "password" >, { dispatch }) => {
    const response = await axios.post("/api/user/signup/", user);
    console.log("postUser")
    dispatch(userActions.addUser(response.data));
  }
);

export const putUser = createAsyncThunk( // login
  "user/putUser",
  async (user: Pick<UserType, "username" | "password" >, { dispatch }) => {
    const response = await axios.put("/api/user/login/", user);
    if( response.data == null ){ // if login failed ,
      console.log("login failed in putUser")

    }else{
    dispatch(userActions.loginUser(response.data));}
  }
);


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getAll: (state, action: PayloadAction<{ users: UserType[] }>) => {},
    getUser: (state, action: PayloadAction<{ targetusername: string }>) => {
      const target = state.users.find(
        (user) => user.username === action.payload.targetusername
      );
      state.selectedUser = target ?? null;
    },
    addUser: ( // register 
      state,
      action: PayloadAction<{ username: string; password: string }>
    ) => {

      const newUser = {
    
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

    builder.addCase(putUser.rejected, (_state, action) => {
      console.error(action.error);
    });
  },
});

export const userActions = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
*/
