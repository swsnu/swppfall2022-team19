import Header from "../Header/Header"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { ProductType, selectProduct } from "../../store/slices/product";
import { fetchRates, selectRate } from '../../store/slices/rate';
import { useEffect } from "react";
import { useState } from "react";
import makeAnimated from 'react-select/animated';
import SurveyModal from '../UserSurvey/SurveyModal';


const MyPage = () => {
    const [modalOn, setModalOn] = useState(false);
    // const navigate = useNavigate();
    // const selectedUserState = useSelector((state: RootState) => state.user.selectedUser);
    // const logo = require('../../Categoryicon/Logo.png');

    const onOpenModal = () => {
        setModalOn(!modalOn);
    }
    // const allRates = useSelector(selectRate)
    // console.log("Allrate,",  allRates)

    // useEffect(() => {
    //     dispatch(fetchRates())})


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

/* 
<img title="logo" className="CenterLogo" onClick={() => navigate("/home")} src={logo} alt="homeLogo" />
    <div>
        My user name is {selectedUserState?.username}
    </div>
    <div className="ratedProduct">



    </div>

    <div className="likedComments">



    </div> 
*/

