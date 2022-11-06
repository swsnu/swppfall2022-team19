// Review
// username | totalScore
// cotent   | like-button
// dispatch function: clickLikeButton                       


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
        if (liked == false) 
            setLiked(true)
        else
            setLiked(false)
    };

    if(liked)
        return (
            <article className ='Review'>
                <div className = "review_user_id">{props.user_id}</div>
                <div className = "review_totalScore">{props.totalScore}</div>
                <div className = "review_comment">{props.comment}</div> 
                <div className = "like_button">
                    <button className = 'like_button_on'> &#10084;</button>
                </div>
            </article>
        );
    else{
        return (
            <article className ='Review'>
                <div className = "review_user_id">{props.user_id}</div>
                <div className = "review_totalScore">{props.totalScore}</div>
                <div className = "review_comment">{props.comment}</div> 
                <div className = "like_button">
                    <button className = 'like_button_off' > &#10084;</button>
                </div>
            </article>
        );
    }
};

//onClick={() => postReviewHandler()}
//onClick={() => postReviewHandler()}
