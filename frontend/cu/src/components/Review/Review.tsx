import "./Review.css"

import { useDispatch, useSelector } from "react-redux";
import { useState, useLayoutEffect, useEffect } from 'react';
import { RateType, fetchUserLikedRate, selectRate , updateRate} from "../../store/slices/rate";
import { ProductType } from "../../store/slices/product";
import { UserType } from "../../store/slices/User";
import { AppDispatch } from "../../store";

interface IProps {
    user: UserType,
    product: ProductType,
    rate: RateType
}


const Review = (props: IProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [liked, setLiked] = useState<boolean>(false);
    const [likedCount, setLikedCount] = useState(props.rate.likedCount);

    useEffect(() => {
        dispatch(fetchUserLikedRate({user_id: props.user.id})) 
    }, [props.user, liked])
    const rates = useSelector(selectRate).likedRates
        
    //(O)check if 'likedRates' are fetched
    //console.log("fetchedLikedRates!: ", rates);
    //console.log("props.rate!: ", props.rate)
 
    useEffect(()=> {
        //if(rates.includes(props.rate)){ ... }
        for(let index=0; index<rates.length; index++){
            if(rates[index].comment === props.rate.comment){
                setLiked(true);
                console.log("liked rate:", props.rate)
                console.log(liked)
            }
        }

    }, [props.rate])


    const likeClick = async () => {
        const scores = props.rate.scores;
        const comment = props.rate.comment;
        const formData = new FormData()
        formData.append('id', String(props.rate?.id!))
        formData.append('user_id', String(props.user?.id!))
        formData.append('username', props.user?.username!)
        formData.append('product_id', String(props.product.id!))
        formData.append('scores', scores)
        formData.append('comment', comment)

        if(liked){ // 좋아요 -> 해제
            setLiked(false)
            setLikedCount(likedCount - 1)
            formData.append('likedCount', String(likedCount-1)) 
        }
        else{ // 없음 -> 좋아요
            setLiked(true)
            setLikedCount(likedCount + 1)
            formData.append('likedCount', String(likedCount+1)) 
        }

        await dispatch(updateRate(formData))
    }

    //console.log("rates' likedCount: "+likedCount)
    // average score for each reviews
    var totalScore=0;
    for( var i=0; i<5; i++){
        totalScore+=Number(props.rate?.scores[i]);
    }
    totalScore/=5;
    

    return (
        <article className='Review'>
            <div className='review_picutre_except'>
                <div className='review_button_except'>
                    <div className="review_date"> { props.rate.created_at.toString().split('T')[0].replaceAll("-",".")} </div>
                    <div className="review_username">{props.rate.username}</div>
                    <div className="review_totalScore" style={{color: "green"}}>
                        {totalScore === 5 ? '★★★★★' : totalScore >= 4 ? '★★★★☆' : totalScore >= 3 ? '★★★☆☆' : totalScore >= 2 ? '★★☆☆☆' : totalScore >= 1 ? '★☆☆☆☆' : '☆☆☆☆☆'}
                    </div>
                    <div className="review_comment">{props.rate?.comment}</div>
                </div>
                <div className="like_set">
                        {likedCount}
                    <div className="like_button" onClick={() =>likeClick()}>  
                        {liked? (<div>❤️</div>): (<div>🤍</div>)}
                    </div>
                </div>
            </div>
            <img className='review_picture' src={props.rate.picture} width={300} />
        </article>
    );
};

export default Review;