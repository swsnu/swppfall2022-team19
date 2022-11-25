// ReviewList

import { useDispatch} from "react-redux";
import "./ReviewList.css";
import { AppDispatch } from "../../store";
import Review from "../Review/Review";
import {RateType} from "../../store/slices/rate";
import { ProductType } from "../../store/slices/product";
import { UserType } from "../../store/slices/User";

interface Props{
    user?: UserType,
    product: ProductType,
    rate: RateType[] | undefined
}


export default function ReviewList (props: Props){
    const dispatch = useDispatch<AppDispatch>();

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
                {props.rate?.map( (rv) => {
                    const totalScore = (Number(rv.scores.charAt(0)) + Number(rv.scores.charAt(1))
                     + Number(rv.scores.charAt(2)) + Number(rv.scores.charAt(3)) + Number(rv.scores.charAt(5)))/5
                    return (<Review user={props.user} product={props.product} rate={rv} totalScore={totalScore}/>
                );})}
            </div>
        </div> 
    )
}
