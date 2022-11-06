// Review
// username | totalScore
// cotent   | like-button
// dispatch function: clickLikeButton                       


import "./Review.css"
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { reviewActions } from "../../store/slices/Review";


interface IProps{
    username: string;
    totalScore: number;
    content: string;
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
                <div className = "review_user_and_star">{props.username} {props.totalScore}</div>
                <div className = "like_button">
                    <button className = 'like_button_on' onClick={() => postReviewHandler()}> &#10084;</button>
                </div>
                <div className = "review_content">{props.content}</div> 
            </article>
        );
    else{
        return (
            <article className ='Review'>
                <div className = "review_user_and_star">{props.username} {props.totalScore}</div>
                <div className = "like_button">
                    <button className = 'like_button_off' onClick={() => postReviewHandler()}> &#10084;</button>
                </div>
                <div className = "review_content">{props.content}</div> 
            </article>
        );
    }
};

