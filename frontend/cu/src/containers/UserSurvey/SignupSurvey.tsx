import React, { useState } from 'react';
import "./SignupSurvey.css";


// https://github.com/swpp22fall-practice-sessions/swpp-p4-redux-tutorial/blob/practice/4-finish/src/containers/TodoList/NewTodo/NewTodo.tsx

// yarn add react-select
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { postUser } from "../../store/slices/User";

// import { putSurvey, surveyAnswer } from '../../store/slices/SurveyTemp';
// import { userSurveyOptions } from '../Data'


const animatedComponents = makeAnimated();

const SignupSurvey = () => {
    // 1. User Signup 상태관리
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // 2. User Survey 상태관리
    const [gender, setGender] = useState<number>(0);
    const [age, setAge] = useState<number>(0); // -1 means initialState
    const [taste, setTaste] = useState<string>("");
    const [question, setQuestion] = useState<number>(0);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();


    const logo = require('../../Categoryicon/Logo.png')


    const postUserHandler = async () => {
        const data = { username: username, password: password, age: age, gender: gender, taste: taste, question: question };
        console.log(data);
        const result = await dispatch(postUser(data));
        console.log(result);
        console.log(result.type);
        console.log(postUser.typePrefix);
        if (result.type === `${postUser.typePrefix}/fulfilled`) {
            setSubmitted(true);
            console.log("postUserHandler is called, username: " + username);
        } else {
            alert("이미 중복된 ID입니다.");
            console.log("Error on post User");
        }
    };



    interface genderOptions {
        readonly value: number;
        readonly label: string;
    }
    const genderList: readonly genderOptions[] = [
        { value: 1, label: "남성" },
        { value: 2, label: "여성" }
    ]
    interface ageOptions {
        readonly value: number;
        readonly label: string;
    }
    const ageList: readonly ageOptions[] = [
        { value: 1, label: "~10대" },
        { value: 2, label: "20대" },
        { value: 3, label: "30대" },
        { value: 4, label: "40대" },
        { value: 5, label: "50대" },
        { value: 6, label: "60대~" }
    ]
    interface tasteOptions {
        readonly value: string;
        readonly label: string;
    }
    const tasteList: readonly tasteOptions[] = [
        // Multi Choice
        { value: "A", label: "간편식사" },
        { value: "B", label: "과자류" },
        { value: "C", label: "아이스크림" },
        { value: "D", label: "식품" },
        { value: "E", label: "음료" }
    ]

    // Question
    interface questionOptions {
        readonly value: number;
        readonly label: string;
    }
    const questionList: readonly questionOptions[] = [
        { value: 1, label: "맛" },
        { value: 2, label: "가성비" },
        { value: 3, label: "재구매 의사" }
    ]


    if (submitted) {
        alert("회원가입 완료. 로그인 페이지로 이동합니다");
        return <Navigate to="/login" />;
    } else {
        return (
            <div className="signUpAndSurvey">
                <div className="SignupBox">
                    <h1>Register</h1>
                    <label>ID</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />

                    <label>Password</label>
                    <input
                        type="text"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                </div>

                <div className="SurveyBox">
                    <div className="SelectBox">
                        <div className="introBox">
                            <img className="CenterLogo" src={logo} alt="homeLogo" />

                            <h4>사용자 정보를 입력하고 맞춤화 된 제품을 추천받자!</h4>
                        </div>

                        <div className="questionBox">
                            <h5> 당신의 성별을 알려주세요 </h5>
                            <Select className="genderDropdown" isClearable={false} options={genderList} onChange={(event) => event === null ? setGender(0) : setGender(event.value)} />
                        </div>

                        <div className="questionBox">
                            <h5> 당신의 연령대를 알려주세요 </h5>
                            <Select className="ageDropDown" options={ageList} onChange={(event) => event === null ? setAge(0) : setAge(event.value)} />
                        </div>

                        <div className="questionBox">
                            <h5> 당신이 가장 즐겨찾는 카테고리는 무엇인가요? </h5>
                            <Select className="tasteDropDown" isMulti defaultValue={[tasteList[0]]} components={animatedComponents} options={tasteList} onChange={(event) => {
                                var getStr: string = "";
                                var temp: string[] = [];
                                temp = event.map((element) => {
                                    return element.value;
                                });

                                for (var i = 0; i < temp.length; i++) {
                                    getStr = getStr + temp[i];
                                }
                                setTaste(getStr);
                            }}
                            />
                        </div>

                        <div className="questionBox">
                            <h5> 맛 만족도, 가성비, 재구매 의사 중 가장 중요하게 여기는 평가 지표가 무엇인가요? </h5>
                            <Select className="questionDropDown" options={questionList} onChange={(event) => event === null ? setQuestion(-1) : setQuestion(event.value)} />
                        </div>

                    </div>

                    <button className="submitButton" onClick={() => postUserHandler()}>제출하기</button>
                </div>
            </div>
        )
    }

};

export default SignupSurvey;