// ReviewList

import { useDispatch, useSelector } from "react-redux";
import "./ReviewList.css";
import { AppDispatch } from "../../store";
import { selectReview } from "../../store/slices/Review";
import Review from "../Review/Review";

interface IProps{
    title:string;
}

type ReviewType={
    id: number;
    user_id: number;
    scores: number[];
    comment: string;
    likedCount: number;
    liked: boolean;
}

export default function ReviewList (props: IProps){
    const { title } = props;
    const todoState = useSelector(selectReview);
    //const dispatch = useDispatch<AppDispatch>();

    return (
        <div className="ReviewList"> 
            <div className='title'>{title}</div>
            <div className='fieldName'>
                <div className="fieldName_ID">ID </div>
                <div className="fieldName_totalScore">평점 </div>
                <div className="fieldName_comment">한줄 평가 </div>
                <div className="fieldName_like">좋아요 </div>
            </div>    
            <div className='reviews'>
                {todoState.reviews.map( (rv) => {
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
