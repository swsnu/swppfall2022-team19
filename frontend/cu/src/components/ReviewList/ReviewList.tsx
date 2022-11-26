// ReviewList

import { useDispatch} from "react-redux";
import React, { useState, useEffect } from 'react';
import "./ReviewList.css";
import { AppDispatch } from "../../store";
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
    const dispatch = useDispatch<AppDispatch>();
    const filteredRates = props.rate.filter((rate) => rate.product_id === props.product.id);
    
    return (
        <div className="ReviewList"> 
            <div className='title'>상품 후기</div>
            <div className='fieldName'>
                <div className="fieldName_ID">ID </div>
                <div className="fieldName_totalScore">평점 </div>
                <div className="fieldName_comment">한줄 평가 </div>
                <div className="fieldName_like">좋아요 </div>
            </div>    
            <div className='reviews'>
                {   filteredRates.map( (rv) => {
                    return (<Review user={props.user} product={props.product} rate={rv}/>
                );})}
            </div>
        </div> 
    )
}
