import { useState, useEffect} from 'react';
import "./TotalScoreList.css";
import TotalScore from "../TotalScore/TotalScore";
import subCategoryQuestion from "../../Questionnaires/subCategoryQuestion.json"
import { ProductType } from '../../store/slices/product';
import { UserType } from '../../store/slices/User';
import rate, { RateType } from '../../store/slices/rate';

interface Props{
    user: UserType,
    product: ProductType,
    rate: RateType[]
}


export default function TotalScoreList(props: Props){
    const [question4, setQuestion4] = useState("");
    const [question5, setQuestion5] = useState("");
    const filteredRates = props.rate.filter((rate) => rate.product_id === props.product.id);
    
    useEffect(() => {
        for (const key in Object.keys(subCategoryQuestion)) {
          if (props.product.subCategory.includes(subCategoryQuestion[key].subCategory)) {
            setQuestion4(subCategoryQuestion[key].question4);
            setQuestion5(subCategoryQuestion[key].question5);
          }
        }
      }, [props.product])


    let score1 = 0;
    let scoreCnt1 = [0,0,0,0,0,0]; //0~5
    filteredRates.map( (rv) => {
        score1 += Number(rv.scores.charAt(0)); //rv.scores <= "55555" string type
        switch(Number(rv.scores.charAt(0))){
            case 0:
                scoreCnt1[0]++;
                break;
            case 1:
                scoreCnt1[1]++;
                break;
            case 2:
                scoreCnt1[2]++;
                break;
            case 3:
                scoreCnt1[3]++;
                break;
            case 4:
                scoreCnt1[4]++;
                break;
            default:
                scoreCnt1[5]++;
        }
    })
    if(score1!==0) score1 /= filteredRates.length;
    score1.toFixed(2);

    let score2 = 0;
    let scoreCnt2=[0,0,0,0,0,0];
    filteredRates.map( (rv) => {
        score2 += Number(rv.scores.charAt(1));
        switch(Number(rv.scores.charAt(1))){
            case 0:
                scoreCnt2[0]++;
                break;
            case 1:
                scoreCnt2[1]++;
                break;
            case 2:
                scoreCnt2[2]++;
                break;
            case 3:
                scoreCnt2[3]++;
                break;
            case 4:
                scoreCnt2[4]++;
                break;
            default:
                scoreCnt2[5]++;
        }
    })
    if(score2!==0) score2 /= filteredRates.length;
    score2.toFixed(2);

    let score3 = 0;
    let scoreCnt3 = [0,0,0,0,0,0];
    filteredRates.map( (rv) => {
        score3 += Number(rv.scores.charAt(2));
        switch(Number(rv.scores.charAt(0))){
            case 0:
                scoreCnt3[0]++;
                break;
            case 1:
                scoreCnt3[1]++;
                break;
            case 2:
                scoreCnt3[2]++;
                break;
            case 3:
                scoreCnt3[3]++;
                break;
            case 4:
                scoreCnt3[4]++;
                break;
            default:
                scoreCnt3[5]++;
        }
    })
    if(score3!==0) score3 /= filteredRates.length;
    score3.toFixed(2);

    let score4 = 0;
    let scoreCnt4 =[0,0,0,0,0,0];
    filteredRates.map( (rv) => {
        score4 += Number(rv.scores.charAt(3));
        switch(Number(rv.scores.charAt(0))){
            case 0:
                scoreCnt4[0]++;
                break;
            case 1:
                scoreCnt4[1]++;
                break;
            case 2:
                scoreCnt4[2]++;
                break;
            case 3:
                scoreCnt4[3]++;
                break;
            case 4:
                scoreCnt4[4]++;
                break;
            default:
                scoreCnt4[5]++;
        }
    })
    if(score4!==0) score4 /= filteredRates.length;
    score4.toFixed(2);

    let score5 = 0;
    let scoreCnt5 = [0,0,0,0,0,0];
    filteredRates.map( (rv) => {
        score5 += Number(rv.scores.charAt(4));
        switch(Number(rv.scores.charAt(0))){
            case 0:
                scoreCnt5[0]++;
                break;
            case 1:
                scoreCnt5[1]++;
                break;
            case 2:
                scoreCnt5[2]++;
                break;
            case 3:
                scoreCnt5[3]++;
                break;
            case 4:
                scoreCnt5[4]++;
                break;
            default:
                scoreCnt5[5]++;
        }
    })
    if(score5!==0) score5 /= filteredRates.length;
    score5.toFixed(2);


    let totalScore = 0;
    filteredRates.map( (rv) => {
        for(var i=0; i<5; i++){
            totalScore+=Number(rv.scores.charAt(i));
        }
    })
    if(totalScore!==0) totalScore /= 5*filteredRates.length;
    totalScore.toFixed(2);

    let totalScores = [
        {id: 1, title: "맛 만족도  ",   score: score1 },
        {id: 2, title: "가성비     ",   score: score2  },
        {id: 3, title: "재구매 의사",   score: score3  },
        {id: 4, title: question4,       score: score4 },
        {id: 5, title: question5,       score: score5  },
    ];



    
    
    return (
        <div className="TotalScoreList"> 
            <div className='title'>전체 평점 및 항목별 평점</div>
                <div className='total'>총점 {totalScore}</div>
                    <div className='scores'>
                        {totalScores.map( (ts) => {
                            return (
                            <TotalScore key={ts.id}
                                title={ts.title}
                                score={ts.score}
                            />
                        );})}
                    </div>
        </div> 
    )
}