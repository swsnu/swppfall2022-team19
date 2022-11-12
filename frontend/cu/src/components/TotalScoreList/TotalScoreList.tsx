import { useState, useEffect} from 'react';
import "./TotalScoreList.css";
import TotalScore from "../TotalScore/TotalScore";
import subCategoryQuestion from "../../Questionnaires/subCategoryQuestion.json"
import { ProductType } from '../../store/slices/product';

interface Props{
    product: ProductType
}

type TotalScoreType={
    title: string;
    score: number;
}

export default function TotalScoreList(props: Props){

    const [question4, setQuestion4] = useState("");
    const [question5, setQuestion5] = useState("");
    useEffect(() => {
        for (const key in Object.keys(subCategoryQuestion)) {
          if (subCategoryQuestion[key].subCategory === props.product.subCategory[0]) {
            setQuestion4(subCategoryQuestion[key].question4);
            setQuestion5(subCategoryQuestion[key].question5);
          }
        }
      }, [props.product])

      

    //this part should differ by the product category
    const [ totalscores, setTotalScores ] = useState<TotalScoreType[]>([
        {title: "총점       ", score: 4  },
        {title: "맛 만족도  ", score: 3  },
        {title: "가성비     ", score: 3  },
        {title: "재구매 의사", score: 2  },
        {title: question4, score: 4  },
        {title: question5, score: 3  },
    ]);
    
    return (
        <div className="TotalScoreList"> 
            <div className='title'>전체 평점 및 항목별 평점</div>
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
