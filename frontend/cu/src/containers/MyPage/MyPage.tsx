import Header from "../Header/Header"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { ProductType, selectProduct } from "../../store/slices/product";
import { fetchRates, fetchUserRate, selectRate } from '../../store/slices/rate';
import { useEffect } from "react";
import { useState } from "react";
import makeAnimated from 'react-select/animated';
import SurveyModal from '../UserSurvey/SurveyModal';
import { selectUser } from "../../store/slices/User";


const MyPage = () => {
    const [modalOn, setModalOn] = useState(false);
    
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const selectedUserState = useSelector(selectUser);
    const logo = require('../../Categoryicon/Logo.png');


    const onOpenModal = () => {
        setModalOn(!modalOn);
    }

    useEffect(() => {
        const result = dispatch(fetchUserRate(selectedUserState.selectedUser!.id));
    })


    return (
        <div className="MyPage">
            <Header />
            <button className="modalOpenButton" onClick={onOpenModal}>사용자 정보 수정하기</button> {
                modalOn ? <SurveyModal /> : ''
            }
        </div>
    )
}


export default MyPage;


