import { useState } from 'react';
import "./TotalScoreList.css";
import TotalScore from "../TotalScore/TotalScore";

interface IProps{
    title: string;
}

type TotalScoreType={
    title: string;
    score: number;
}

export default function TotalScoreList (props: IProps){
    const {title} = props;


    //this part should differ by the product category
    const [ totalscores, setTotalScores ] = useState<TotalScoreType[]>([
        {title: "총점", score: 5  },

        {title: "맛 만족도", score: 5  },
        {title: "가성비", score: 5  },
        {title: "재구매 의사", score: 5  },
        {title: "용량", score: 5  },
        {title: "추천 의사", score: 5  },
    ]);
    
    return (
        <div className="TotalScoreList"> 
            <div className='title'>{title}</div>
            <div className='views'>
                {totalscores.map( (ts) => {
                    return (
                    <TotalScore
                        title={ts.title}
                        score={ts.score}
                    />
                );})}
            </div>
        </div> 
    )
}
