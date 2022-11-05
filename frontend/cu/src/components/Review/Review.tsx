import "./Review.css"
import React from "react";

interface IProps{
    username: string;
    clicked?: React.MouseEventHandler<HTMLDivElement>;
    totalScore: number;
    content: string;
    likedCount: number;
    liked:boolean;
}

export default function Review(props: IProps){
    return (
        <article className ='Review'>
            <div className = "review_user_and_star">{props.username} {props.totalScore}</div>
            {props.liked? <div className="liked-mark"> &#10084; </div> : <div className="liked-mark"> &#129293; </div>}
            <div className = "review_content">{props.content}</div> 
            
        </article>
    );
};