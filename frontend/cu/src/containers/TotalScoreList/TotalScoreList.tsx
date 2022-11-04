import { useState } from 'react';
import "./TotalScoreList.css";
import TotalScore from "../../components/TotalScore/TotalScore";

interface IProps{
    title: string;
}

type TotalScoreType={
    title: string;
    score: number;
}

export default function totalScoreList (props: IProps){
    const {title} = props;

    const [ totalscores, setTotalScores ] = useState<TotalScoreType[]>([
        {title: "totalScore", score: 5  },

        {title: "score1", score: 5  },
        {title: "score2", score: 5  },
        {title: "score3", score: 5  },
        {title: "score4", score: 5  },
        {title: "score5", score: 5  },
    ]);
    
    return (
        <div className="ReviewList"> 
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
