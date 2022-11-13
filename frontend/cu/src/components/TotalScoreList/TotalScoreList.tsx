import { useState, useEffect} from 'react';
import "./TotalScoreList.css";
import TotalScore from "../TotalScore/TotalScore";
import subCategoryQuestion from "../../Questionnaires/subCategoryQuestion.json"
import { ProductType } from '../../store/slices/product';
import { UserType } from '../../store/slices/User';
import { RateType } from '../../store/slices/rate';

interface Props{
    user?: UserType,
    product: ProductType,
    rate: RateType | undefined
}

export default function TotalScoreList(props: Props){
    const [question4, setQuestion4] = useState("");
    const [question5, setQuestion5] = useState("");

    const score1 = props.rate?.scores[0]!
    const score2 = props.rate?.scores[1]!
    const score3 = props.rate?.scores[2]!
    const score4 = props.rate?.scores[3]!
    const score5 = props.rate?.scores[4]!
    const averageScore = (score1 + score2 + score3 + score4 + score5)/5;

    useEffect(() => {
        for (const key in Object.keys(subCategoryQuestion)) {
          if (subCategoryQuestion[key].subCategory === props.product.subCategory[0]) {
            setQuestion4(subCategoryQuestion[key].question4);
            setQuestion5(subCategoryQuestion[key].question5);
          }
        }
      }, [props.product])

    let totalScores = [
        {title: "총점       ", score: averageScore  },
        {title: "맛 만족도  ", score: score1  },
        {title: "가성비     ", score: score2  },
        {title: "재구매 의사", score: score3  },
        {title: question4,    score: score4 },
        {title: question5,    score: score5  },
    ];
    
    return (
        <div className="TotalScoreList"> 
            <div className='title'>전체 평점 및 항목별 평점</div>
            <div className='views'>
                {totalScores.map( (ts) => {
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
