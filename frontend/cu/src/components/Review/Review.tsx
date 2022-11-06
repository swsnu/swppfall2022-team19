// Review
// Review contains 'user_id' 'totalScore' 'comment' 'likedCount' 'liked'
// Review.ts slice has 'clickLike' reducer  to change the state of 'liked' attribute for all te Reviews.                    


import "./Review.css"
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { reviewActions } from "../../store/slices/Review";


interface IProps{
    user_id: number;
    totalScore: number;
    comment: string;
    likedCount: number;
    liked:boolean;
}

export default function Review(props: IProps){
    const [liked, setLiked] = useState<boolean>(false);
    const dispatch = useDispatch()
    const postReviewHandler = () => {
        dispatch(reviewActions.clickLike)
        if (liked === false) 
            setLiked(true)
        else
            setLiked(false)
    };

    return (
        <article className ='Review'>
            <div className = 'review_button_except'>
                <div className = "review_user_id">{props.user_id}</div>
                <div className = "review_totalScore">{props.totalScore}</div>
                <div className = "review_comment">{props.comment}</div> 
            </div>
            <div className = "like_button" onClick={postReviewHandler}>
                {liked? <button>❤️</button>: <button>🤍</button>}
            </div> 
        </article>
    );
};
