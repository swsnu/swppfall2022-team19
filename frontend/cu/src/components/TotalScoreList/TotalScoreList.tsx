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
    rate: RateType[] | undefined
}

export default function TotalScoreList(props: Props){
    const [question4, setQuestion4] = useState("");
    const [question5, setQuestion5] = useState("");

    //props.rate is a list of following json dictionary:
    //{"id":1,"user_id":2,"username":"super","product_id":1,"scores":{"score1":5,"score2":5,"score3":5,"score4":5,"score5":5},"picture":null,"likedCount":0}
    //need to pull score1~score5 from each rate and find the average of each scores
    let score1;
    let score2;
    let score3;
    let score4;
    let score5;
    let averageScore;
    if(props.rate?.length === 0){
        score1 = 0;
        score2 = 0;
        score3 = 0;
        score4 = 0;
        score5 = 0;
        averageScore = 0;
    }

    useEffect(() => {
        for (const key in Object.keys(subCategoryQuestion)) {
          if (props.product.subCategory.includes(subCategoryQuestion[key].subCategory)) {
            setQuestion4(subCategoryQuestion[key].question4);
            setQuestion5(subCategoryQuestion[key].question5);
          }
        }
      }, [props.product])

    let totalScores = [
        {id: 1, title: "총점       ", score: averageScore  },
        {id: 2, title: "맛 만족도  ", score: score1  },
        {id: 3, title: "가성비     ", score: score2  },
        {id: 4, title: "재구매 의사", score: score3  },
        {id: 5, title: question4,    score: score4 },
        {id: 6, title: question5,    score: score5  },
    ];
    
    return (
        <div className="TotalScoreList"> 
            <div className='title'>전체 평점 및 항목별 평점</div>
            <div className='views'>
                {totalScores.map( (ts) => {
                    return (
                    <TotalScore key={ts.id}
                        title={ts.title}
                        score={ts.score!}
                    />
                );})}
            </div>
        </div> 
    )
}
