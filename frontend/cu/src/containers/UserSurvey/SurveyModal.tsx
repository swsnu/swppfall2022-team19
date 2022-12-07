import "./SurveyModal.css";
import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { RootState } from '../../store';
import { putSurvey } from '../../store/slices/User';

import { useEffect } from 'react';
type Props = {
    setModalOn: (modalOn: boolean) => void;
}

const SurveyModal = (props: Props) => {

    const animatedComponents = makeAnimated();
    const nowUser = useSelector((state: RootState) => state.user.selectedUser!);
    const [gender, setGender] = useState<number>(nowUser === null ? 0 : nowUser.gender);
    const [age, setAge] = useState<number>(nowUser === null ? 0 : nowUser.age); // -1 means initialState
    const [taste, setTaste] = useState<string>(nowUser === null ? "" : nowUser.taste);
    const [question, setQuestion] = useState<number>(nowUser === null ? 0 : nowUser.question);
    const dispatch = useDispatch<AppDispatch>();


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


    var defaultTaste: tasteOptions[] = [];
    console.log("defaultTaste가 초기화되는 시점");
    for (var tasteElement of nowUser.taste) {
        console.log("defaultTaste가 다시 부활!");
        console.log(nowUser.taste);
        if (tasteElement === 'A') {
            defaultTaste.push(tasteList[0]);
        } else if (tasteElement === 'B') {
            defaultTaste.push(tasteList[1]);
        } else if (tasteElement === 'C') {
            defaultTaste.push(tasteList[2]);
        } else if (tasteElement === 'D') {
            defaultTaste.push(tasteList[3]);
        } else if (tasteElement === 'E') {
            defaultTaste.push(tasteList[4]);
        }
    }

    useEffect(() => {
        console.log("현재 taste는 " + taste);
    }, [taste]);


    const putSurveyHandler = async () => {
        const data = { id: nowUser.id, age: age, gender: gender, taste: taste, question: question };

        console.log(data);
        const result = await dispatch(putSurvey(data));
        console.log(result);
        if (result.type === `${putSurvey.typePrefix}/fulfilled`) {
            // setSubmitted(true);
            console.log("putSurveyHandler is called");
            console.log(nowUser);
            props.setModalOn(false);
        } else {
            alert("Error on putSurvey");
        }
    };

    return (
        <div className="wrapper">
            <div className="surveyModal">
                <div className="SelectBoxModal">
                    <div className="introBoxModal">
                        <h4>사용자 정보를 입력하고 맞춤화 된 제품을 추천받자!</h4>
                    </div>

                    <div className="questionBoxModal">
                        <h5> 당신의 성별을 알려주세요 </h5>
                        <h6><Select className="genderDropdown" defaultValue={[genderList[gender - 1]]} isClearable={false} options={genderList} onChange={(event) => event === null ? setGender(0) : setGender(event.value)} /></h6>
                    </div>

                    <div className="questionBoxModal">
                        <h5> 당신의 연령대를 알려주세요 </h5>
                        <h6><Select className="ageDropDown" defaultValue={[ageList[age - 1]]} options={ageList} onChange={(event) => event === null ? setAge(0) : setAge(event.value)} /></h6>
                    </div>

                    <div className="questionBoxModal">
                        <h5> 당신이 가장 즐겨찾는 카테고리는 무엇인가요? </h5>
                        <h6><Select className="tasteDropDown" isMulti defaultValue={defaultTaste} components={animatedComponents} options={tasteList} onChange={(event) => {
                            console.log("event입니다");
                            console.log(event);

                            var getStr: string = "";
                            var temp: string[] = [];
                            temp = event.map((element) => {
                                return element.value;
                            });
                            temp.sort();
                            console.log("temp:");
                            console.log(temp);
                            for (let value of temp) {
                                getStr = getStr + value;
                            }
                            console.log("getStr: " + getStr);
                            setTaste(getStr);
                        }}
                        /></h6>
                    </div>

                    <div className="questionBoxModal">
                        <h5> 맛 만족도, 가성비, 재구매 의사 중 가장 중요하게 여기는 평가 지표가 무엇인가요? </h5>
                        <h6><Select className="questionDropDown" defaultValue={[questionList[question - 1]]} options={questionList} onChange={(event) => event === null ? setQuestion(-1) : setQuestion(event.value)} /></h6>
                    </div>

                </div>
                <button className="closeButton" onClick={() => { putSurveyHandler(); }}>수정하기</button>
            </div>
        </div>
    )

}

export default SurveyModal;