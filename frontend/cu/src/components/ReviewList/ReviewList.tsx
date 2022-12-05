// Reviews are shown in a list
// sort: 인기순, 최신순, 사진리뷰(만) <- 3 buttons
// default is in 인기순.

import { useState, useEffect } from 'react';
import { RateType } from "../../store/slices/rate";
import { ProductType } from "../../store/slices/product";
import { UserType } from "../../store/slices/User";
import Review from "../Review/Review";
import "./ReviewList.css";

interface Props{
    user: UserType,
    product: ProductType,
    rate: RateType[]
}


export default function ReviewList (props: Props){
    // filteredRates has all the list of reviews related to the product
    let filteredRates = props.rate.filter((rate) => rate.product_id === props.product.id);
    const [rates, setRates] = useState<RateType[]>(filteredRates); 
   
    useEffect(() => {
        setRates(filteredRates);
    }, [props.product, props.rate])


    const likeButtonClick = async () => {
        filteredRates.sort((a, b) => (b.likedCount) - (a.likedCount))
        setRates(filteredRates.reverse());

        console.log("인기순");
        console.log(filteredRates.reverse());
    }

    const recentButtonClick = async () => {
        filteredRates.sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf())
        setRates(filteredRates.reverse());

        console.log("최신순");
        console.log(filteredRates.reverse());
    }

    
    const pictureButtonClick = async () => {
        // reviews with picture & recent ordering
        const ratesWithPictures = filteredRates.filter((rate) => rate.picture !== null )
        .sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf())
        setRates(ratesWithPictures.reverse());

        console.log("사진 있는 것만");
        console.log(ratesWithPictures.reverse());
    }


    return (
        <div className="ReviewList"> 
                
            <div className='title'>
                상품후기( {filteredRates.length} )
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
                    return (<Review key={rv.id} user={props.user} product={props.product} rate={rv}/>
                );})}
                { filteredRates.length===0 && <div className='no_review'>첫 평가를 남겨주세요</div>}
            </div>
        </div> 
    )
}

