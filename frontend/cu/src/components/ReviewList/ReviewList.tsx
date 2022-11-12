// ReviewList

import { useDispatch, useSelector } from "react-redux";
import "./ReviewList.css";
import { AppDispatch } from "../../store";
import Review from "../Review/Review";
import { useEffect } from "react";
import { fetchRates, selectRate } from "../../store/slices/rate";
import { ProductType } from "../../store/slices/product";

interface Props{
    product: ProductType
}

export default function ReviewList (props: Props){
    const dispatch = useDispatch<AppDispatch>();
    const ratesState = useSelector(selectRate);

    useEffect(() =>{
        dispatch(fetchRates(props.product.id))
    })

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
                {ratesState.rates.map( (rv) => {
                    const totalScore = (rv.scores[0] + rv.scores[1] + rv.scores[2] + rv.scores[3] + rv.scores[4])/5
                    return (<Review 
                        key={rv.id}
                        user_id={rv.user_id}
                        totalScore={totalScore}
                        comment={rv.comment}
                        likedCount={rv.likedCount}
                        liked={rv.liked}
                    />
                );})}
            </div>
        </div> 
    )
}
