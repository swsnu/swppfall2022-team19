import "./Review.css"
import { useState } from 'react';
import { UserType } from "../../store/slices/User";
import { ProductType } from "../../store/slices/product";
import { RateType, updateRate} from "../../store/slices/rate";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";

interface IProps {
    user: UserType,
    product: ProductType,
    rate: RateType
}
/*
like ojbect holds
1. user object
2. rate object

[liked, setLiked] = useState<boolean>(HERE)
true: there is Like.objects.filter(user=props.user, product=props.product)
false: there is no such an object
*/

const Review = (props: IProps) => {
    const [liked, setLiked] = useState<boolean>(false);
    const [likedCount, setLikedCount] = useState(props.rate.likedCount);
    const dispatch = useDispatch<AppDispatch>();

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

    console.log("rates' likedCount: "+likedCount)

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
                        {props.rate.likedCount}
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