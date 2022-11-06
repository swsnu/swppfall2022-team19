// temp file for Survey
// 실제로는 store/slices/survey.ts로 들어갈 부분
// https://github.com/swpp22fall-practice-sessions/swpp-p4-redux-tutorial/blob/practice/4-finish/src/store/slices/todo.ts#L91
import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "..";

export interface surveyAnswer{
    gender: string;
    age: number;
    taste: number[];
    question: number;
}

const initialState: surveyAnswer = {
    gender: "",
    age: 0,
    taste: [],
    question: 0,
}

export const putSurvey = createAsyncThunk(
    "user/putSurvey",
    async (survey: Pick<surveyAnswer, "gender" | "age" | "taste" | "question">, {dispatch}) => {
        await axios.put(`/api/user/${id}/`);
        dispatch(surveyActions.putSurvey({userID: userID, gender: string, age: number; taste:number; question: number}));
})


/*
export const postSurvey = createAsyncThunk(
    "user/survey",
    async (survey: Pick<surveyAnswerType, "gender" | "age" | "taste" | "question" >, { dispatch }) => {
        const response = await axios.post("/api/user/survey", survey);
        dispatch(surveyActions.addSurvey(response.data));
    }
)
*/
export const surveySlice = createSlice({
    name: "survey",
    initialState,
    reducers: {
        putSurvey: (
            state,
            action: PayloadAction<{userId: number, gender: string; age: number; taste:number; question: number}>
        ) => {
            const userInfo = state.users.find(
                (user) => user.id === action.payload.userId
            );

            if(userInfo){
                userInfo.gender = action.payload.gender;
                userInfo.age = action.payload.age;
                userInfo.taste = action.payload.taste;
                userInfo.question = action.payload.question;
            }
        }
    }
})

export const surveyActions = surveySlice.actions;
export default surveySlice.reducer;