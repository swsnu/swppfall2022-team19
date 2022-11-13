import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

// axios.defaults.xsrfCookieName = 'XSRF-TOKEN'
// axios.default.xsrfHeaderName = 'X-XSRF-TOKEN' 

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

/*
export interface SurveyRequest {
  gender: number;
  age: number;
  taste: string;
  question: number;
}
*/

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
    const response = await axios.post("api/user/signup/", user);

    dispatch(userActions.addUser(response.data));
  }
);

// 2. 로그인 함수. selectedUser 설정.
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user: Pick<UserLoginRequest, "username" | "password">, { dispatch }) => {
    const response = await axios.post("api/user/signin/", user);
    dispatch(userActions.loginUser(response.data));
  }
)

// 3. 로그아웃 함수 
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

// 4. getUsers. 백엔드에서 userList 받아와서 initialState 업데이트
export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (user: void, { dispatch }) => {
    const response = await axios.get("api/user/userlist/");
    console.log(response);
    dispatch(userActions.getUsers(response.data));
    return response.data ?? null;
  }
)

// 5. getRequestUser. 현재 request.user의 정보를 받아옴
export const getRequestUser = createAsyncThunk(
  "user/getRequestUser",
  async (user: void, { dispatch }) => {
    const response = await axios.get("api/user/requestUser/");
    console.log(response);
    console.log(response.data);
    dispatch(userActions.getRequestUser(response.data));
    return response.data ?? null;
  }
)



export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getRequestUser: (state, action: PayloadAction<UserType>) => {
      // console.log("getRequestUser의 리듀서 실행됨");
      // console.log(action.payload);
      // console.log(state.selectedUser);
      if (action.payload === null || action.payload === undefined) {
        state.selectedUser = null;
        // console.log("현재 로그인된 게 없어서 action.payload도 비어있어서 selectedUser에 null을 줌");
      } else {
        const targetUser = state.users.find(
          (user: UserType) => (user.username === action.payload.username)
        );
        if (targetUser) {
          state.selectedUser = targetUser;
          // console.log("targetUser를 selectedUser로");
        } else {
          // console.log("targetUser가 undefined라 selectedUser는 null로");
          state.selectedUser = null;
        }

        // console.log("targetUser");
        // console.log(targetUser);

      }
    },
    getUsers: (state, action: PayloadAction<UserType[]>) => {
      console.log(action.payload);
      if (action.payload === null || action.payload === undefined) {
        console.log("아무 User도 등록되지 않은 상태");
      } else {
        var user_list: UserType[] = [];
        for (var i = 0; i < action.payload.length; i++) {
          user_list.push({ "id": action.payload[i].id, "username": action.payload[i].username, "password": action.payload[i].password, "age": action.payload[i].age, "gender": action.payload[i].gender, "loginState": action.payload[i].loginState, "taste": action.payload[i].taste, "question": action.payload[i].question });
        }
        // 유저탈퇴 기능이 있다면 오류가 생길 수 있음

        state.users = user_list;
        console.log(user_list);
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
        // console.log("Logged_in User: " + targetUser.username);
      }
      else {
        console.log("Username or password is wrong");
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
  },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    /*
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.selectedUser = action.payload;
    });
    */
    builder.addCase(postUser.rejected, (_state, action) => {
      console.error(action.error);
    });
  },
});

export const userActions = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export const userList = (state: RootState) => state.user.users;

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
