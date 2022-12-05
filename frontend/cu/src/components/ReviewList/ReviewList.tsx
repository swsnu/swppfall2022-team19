// ReviewList

//import { useDispatch} from "react-redux";
import React, { useState, useEffect } from 'react';
import "./ReviewList.css";
//import { AppDispatch } from "../../store";
import Review from "../Review/Review";
import Rate, { RateType } from "../../store/slices/rate";
import { ProductType } from "../../store/slices/product";
import { UserType } from "../../store/slices/User";

interface Props{
    user: UserType,
    product: ProductType,
    rate: RateType[]
}


export default function ReviewList (props: Props){
    const filteredRates = props.rate.filter((rate) => rate.product_id === props.product.id);
    const [rates, setRates] = useState<RateType[]>(filteredRates); 

    const likeButtonClick = async () => {
        filteredRates.sort((a, b) => (b.likedCount) - (a.likedCount))
        setRates(filteredRates.reverse())
        console.log("인기순")
        console.log(filteredRates.reverse())
    }

    const recentButtonClick = async () => {
        filteredRates.sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf())
        setRates(filteredRates.reverse())
        console.log("최신순")
    }

    const pictureButtonClick = async () => {
        filteredRates.filter((rate) => rate.picture !== null)
        .sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf())
        setRates(filteredRates.reverse())
        console.log("사진 있는 것만")
        console.log(filteredRates[0].picture) //null 인데 왜 있니
    }

    return (
        <div className="ReviewList"> 
                
            <div className='title'>
                상품 후기(총 {filteredRates.length}개)
                <button id='button' className="likeButton" onClick={() =>likeButtonClick()}>인기순</button>
                <button id='button' className="recentButton" onClick={() =>recentButtonClick()}>최신순</button>
                <button id='button' className="pictureButton" onClick={() =>pictureButtonClick()}>사진리뷰</button>
            </div>
            <div className='fieldName'>
                <div className="fieldName_date">작성 날짜 </div>
                <div className="fieldName_user">작성자 </div>
                <div className="fieldName_totalScore">평점 </div>
                <div className="fieldName_comment">한줄 평가 </div>
                <div className="fieldName_like">좋아요 </div>
            </div>    
            <div className='reviews'>
                {  rates.reverse().map( (rv) => {
                    return (<Review user={props.user} product={props.product} rate={rv}/>
                );})}
                { filteredRates.length===0 && <div className='no_review'>첫 평가를 남겨주세요</div>}
            </div>
        </div> 
    )
}

