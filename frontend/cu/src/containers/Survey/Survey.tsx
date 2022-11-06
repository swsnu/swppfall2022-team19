import React, {useState} from 'react';
import "./Survey.css";
// https://github.com/swpp22fall-practice-sessions/swpp-p4-redux-tutorial/blob/practice/4-finish/src/containers/TodoList/NewTodo/NewTodo.tsx

// yarn add react-select
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { putSurvey, surveyActions, surveyAnswer } from '../../store/slices/SurveyTemp';
// temp


// import { userSurveyOptions } from '../Data'


const animatedComponents = makeAnimated();

const Survey = () => {
    const [gender, setGender] = useState<string>("");
    const [age, setAge] = useState<number>(-1); // -1 means initialState
    const [taste, setTaste] = useState<number[]>([]);
    const [question, setQuestion] = useState<number>(-1);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();

    const putSurveyHandler = async () => {
        const data: surveyAnswer = { gender: gender, age: age, taste: taste, question:question };
        const result = await dispatch(putSurvey(data));
        if(result.type === `${putSurvey.typePrefix}/fulfilled`){
            setSubmitted(true);
        }else{
            alert("Error on put user Survey Info");
        }
    };

    interface genderOptions{
        readonly value: string;
        readonly lable: string;
    }
    const genderList: readonly genderOptions[]  = [
        { value: "M", lable: "남성"},
        { value: "F", lable: "여성"}
    ]
    interface ageOptions{
        readonly value: number;
        readonly lable: string;
    }
    const ageList: readonly ageOptions[] = [
        { value: 1, lable: "~10대"},
        { value: 2, lable: "20대"},
        { value: 3, lable: "30대"},
        { value: 4, lable: "40대"},
        { value: 5, lable: "50대"},
        { value: 6, lable: "60대~"}
    ]
    interface tasteOptions{
        readonly value: number;
        readonly lable: string;
    }
    const tasteList: readonly tasteOptions[] =[
        // Multi Choice
        { value: 1, lable: "간편식사" },
        { value: 2, lable: "과자류" },
        { value: 3, lable: "아이스크림" },
        { value: 4, lable: "식품" },
        { value: 5, lable: "음료" }
    ]

    // Question
    interface questionOptions{
        readonly value: number;
        readonly lable: string;
    }
    const questionList: readonly questionOptions[] = [
        { value: 1, lable: "맛" },
        { value: 2, lable: "가성비" },
        { value: 3, lable: "재구매 의사" }
    ]

    
    if (submitted){
        return <Navigate to="/mainpage" />; 
    }else{
        return (
            <div className="MainBox">
                <div className="SelectBox">
                    <Select options={genderList} onChange={(event) => setGender(event?.value)}/>
                    <Select options={ageList}  onChange={(event) => setAge(event?.value)} />
                    
                    <Select defaultValue={[tasteList[0]]} components={animatedComponents} isMulti options={tasteList} onChange={(event) => {
                        var temp: number[] = [];
                        temp = event.map((element) => {
                            return element.value;
                        })
                        console.log(temp); // debug
                        setTaste(temp);}}
                    />
                    
                    <Select options={questionList} onChange={(event) => setQuestion(event?.value)}/>
    
                </div>

                <button onClick={() => putSurveyHandler()}>제출하기</button>
            </div>
        )
    }

};

export default Survey;