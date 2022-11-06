// ReviewList

import { useState } from 'react';
import "./ReviewList.css";
import Review from "../../components/Review/Review";

interface IProps{
    title:string;
}

type ReviewType={
    id: number;
    username:string;
    totalScore: number;
    content: string;
    likedCount: number;
    liked: boolean;
}

export default function ReviewList (props: IProps){
    const {title} = props;

    const [ reviews, setReviews ] = useState<ReviewType[]>([
        { id: 1, username: "worm", totalScore: 5, content: "제가 제일 좋아하는 CU 제품입니다", likedCount:5, liked: true },
        { id: 2, username: "sikdorak", totalScore: 5, content: "재료가 다양해서 좋아요", likedCount:5, liked: true},
        { id: 3, username: "idi", totalScore: 2, content: "제가 기대했던 맛은 아니네요",likedCount:2, liked: true },
        { id: 4, username: "yammy", totalScore: 1, content: "너무 맛없음", likedCount:1, liked: true },
        { id: 5, username: "swpp", totalScore: 5, content: "나쁘지 않음. 한 번 먹어볼만 합니다.", likedCount:5,  liked: false },
    ]);
    
    return (
        <div className="ReviewList"> 
            <div className='title'>{title}</div>
            <div className='views'>
                {reviews.map( (rv) => {
                    return (<Review 
                        key={rv.id}
                        username={rv.username}
                        totalScore={rv.totalScore}
                        content={rv.content}
                        likedCount={rv.likedCount}
                        liked={rv.liked}
                    />
                );})}
            </div>
        </div> 
    )
}


// 하나랑 합칠 때
// import {useSelector} from "react-redux";
// import {selecReview, reviewActions } from "../../store/slices/review";

// inside func
// const reviewState = useSelector(selectReview);
// const dispatch= useDispatch();

// return
// reviewState.reviews.map(rv) => {}