// Review
// Review contains 'user_id' 'totalScore' 'comment' 'likedCount' 'liked'
// Review.ts slice has 'clickLike' reducer  to change the state of 'liked' attribute for all te Reviews.                    


import "./Review.css"
import { useState } from 'react';
import { UserType } from "../../store/slices/User";
import { ProductType } from "../../store/slices/product";
import { RateType, updateRate } from "../../store/slices/rate";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";



interface IProps {
    user: UserType,
    product: ProductType,
    rate: RateType
}

export default function Review(props: IProps) {
    const [liked, setLiked] = useState<boolean>(false);
    const [likedCount, setLikedCount] = useState(props.rate?.likedCount);
    const dispatch = useDispatch<AppDispatch>();


    const updateReviewHandler = async () => {
        if (liked === false) {
            setLiked(true)
            setLikedCount(likedCount! + 1)
        }
        else {
            setLiked(false)
            if (likedCount! >= 1) {
                setLikedCount(likedCount! - 1)
            }
        }

        const scores = props.rate.scores;
        const comment = props.rate.comment;
        const formData = new FormData()
        formData.append('likedCount', String(likedCount))
        formData.append('id', String(props.rate?.id!))
        formData.append('user_id', String(props.user?.id!))
        formData.append('username', props.user?.username!)
        formData.append('product_id', String(props.product.id!))
        formData.append('scores', scores)
        formData.append('comment', comment)
        await dispatch(updateRate(formData))
    }

    var totalScore=0;
    for( var i=0; i<5; i++){
        totalScore+=Number(props.rate?.scores[i]);
    }
    totalScore/=5;

    return (
        <article className='Review'>
            <div className='review_button_except'>
                <div className="review_user_username">{props.rate.username}</div>
                <div className="review_totalScore">
                    {totalScore === 5 ? '⭐⭐⭐⭐⭐' : totalScore >= 4 ? '⭐⭐⭐⭐' : totalScore >= 3 ? '⭐⭐⭐' : totalScore >= 2 ? '⭐⭐' : totalScore >= 1 ? '⭐' : ''}
                </div>
                <div className="review_comment">{props.rate?.comment}</div>
            </div>
            <div className="like_button" onClick={updateReviewHandler}>
                {liked ? <button>❤️</button> : <button>🤍</button>}
            </div>

        </article>
    );
};
