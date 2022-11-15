import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import HeartRating from './HeartRating'
import "./RatingForm.css"
import { AppDispatch} from '../../store';
import FixedHeartRating from './FixedHeartRating';
import subCategoryQuestion from "../../Questionnaires/subCategoryQuestion.json"
import { createRate, deleteRate, RateType, updateRate } from '../../store/slices/rate';
import { UserType } from '../../store/slices/User';
import { ProductType, selectProduct} from '../../store/slices/product';

interface Props {
  user?: UserType,
  product: ProductType,
  rate: RateType[] | undefined
}


function RatingForm(props: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const productState = useSelector(selectProduct);

  let user_has_rate = (props.rate != undefined)   //check if user has rated the product or not

  //update score for each question when the user clicks rating
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [score3, setScore3] = useState(0);
  const [score4, setScore4] = useState(0);
  const [score5, setScore5] = useState(0);
  const [comment, setComment] = useState("");

  const [rateState1, setRateState1] = useState<boolean>(user_has_rate); //true if user has rated product
  const [rateState2, setRateState2] = useState<boolean>(user_has_rate);

  const [question4, setQuestion4] = useState("");
  const [question5, setQuestion5] = useState("");
  const [rate, setRate] = useState<RateType>();

  //whenever there is change in product, find the appropriate question by subCategory
  useEffect(() => {

    console.log("subcategory:" + productState.selectedProduct?.subCategory);
    for (const key in Object.keys(subCategoryQuestion)) {
      if (props.product.subCategory.includes(subCategoryQuestion[key].subCategory)) {
        setQuestion4(subCategoryQuestion[key].question4);
        setQuestion5(subCategoryQuestion[key].question5);
      }
    }

      if(props.rate){
        const singleRate = props.rate.filter((rate) => rate.product_id === props.product.id!).find((rate) => rate.user_id === props.user?.id!)
        setRate(singleRate);
      }
  }, [])


  const updateScore1 = (score: number): void => {
    setScore1(score)
  }
  const updateScore2 = (score: number): void => {
    setScore2(score)
  }
  const updateScore3 = (score: number): void => {
    setScore3(score)
  }
  const updateScore4 = (score: number): void => {
    setScore4(score)
  }
  const updateScore5 = (score: number): void => {
    setScore5(score)
  }


  //below are the functions shown for each click of button in different state of rating form
  //------when user has not rate the product--------state: rateState1 = false, rateState2 = false
  const onclickRateHandler = () => {
    setRateState2(true);
  }

  // -----when user click 평가하러가기 button------------state: rateState1 = false, rateState2 = true
  const onclickBackToRateHandler = () => {
    setRateState2(false);
  }

  const onclickSaveHandler = async () => {   //#TODO: need to update product average score

    const scores = [score1, score2, score3, score4, score5];
    const rateData = {
      user_id: props.user?.id!,
      user_username: props.user?.username!,
      product_id: props.product.id!,
      scores: scores,
      comment: comment,
      picture: "picture",
      likedCount: 0
    }
    const responseRate = await dispatch(createRate(rateData))
    if (responseRate.type === `${createRate.typePrefix}/fulfilled`) {
      setRateState1(true);
      setRateState2(true);
    }
  }

  //------when user has written rate-------state: rateState1 = true, rateState2 = true
  const onclickEditHandler = () => {
    setRateState2(false);
  }

  const onclickDeleteHandler = async () => {
    await dispatch(deleteRate(rate?.id!))
    setRateState1(false);
    setRateState2(false);
  }


  //------when user is in edit rate------state: rateState1 = true, rateState2 = false
  const onclickBackEditHandler = () => {
    setRateState1(true);
  }


  const onclickSaveEditHandler = async () => {   //#TODO: need to update product average score

    const scores = [score1, score2, score3, score4, score5];
    const editedRateData = {
      id: rate?.id!,
      user_id: props.user?.id!,
      user_username: props.user?.username!,
      product_id: props.product.id!,
      scores: scores,
      comment: comment,
      picture: "picture",
      likedCount: rate?.likedCount!
    }
    await dispatch(updateRate(editedRateData))
    setRateState2(true)
  }


  return (
    <div>
      <div className="rating_form">
        <div className='rating_blank'>
          {rateState1 === false && rateState2 === false &&
            <div className='rate_box'>
              <button className="rate_button" hidden={rateState2} onClick={() => onclickRateHandler()}>내 평가 남기러 가기</button>
            </div>
          }
          {rateState1 === false && rateState2 === true &&
            <div className='rate_box'>
              <h2 className="rating_heading"> 리뷰 작성하기</h2>
              <button id='button' onClick={() => onclickBackToRateHandler()}>작성 취소</button>
              <button id='button' onClick={() => onclickSaveHandler()}>저장</button>
              <br></br>
              <div>맛 만족도 {<HeartRating score={score1} updateScore={updateScore1} />} </div>
              <div>가성비 {<HeartRating score={score2} updateScore={updateScore2} />}</div>
              <div>재구매 의사 {<HeartRating score={score3} updateScore={updateScore3} />}</div>
              <div>
                {question4}
                {<HeartRating score={score4} updateScore={updateScore4} />}
              </div>
              <div>
                {question5}
                {<HeartRating score={score5} updateScore={updateScore5} />}
              </div>
              <div>
                <div>한줄평</div>
                <input type="text" onChange={(event) => setComment(event.target.value)} />
              </div>
            </div>
          }
        </div>
        {rateState1 === true && rateState2 === true &&
          <div>
            <h2 className="rating_heading"> 내 리뷰</h2>
            <button id='button' onClick={() => onclickEditHandler()}>수정</button>
            <button id='button' onClick={() => onclickDeleteHandler()}>삭제</button>
            <div>맛 만족도 {<FixedHeartRating score={score1} />} </div>
            <div>가성비 {<FixedHeartRating score={score2} />}</div>
            <div>재구매 의사 {<FixedHeartRating score={score3} />}</div>
            <div>
              {question4}
              {<FixedHeartRating score={score4} />}
            </div>
            <div>
              {question5}
              {<FixedHeartRating score={score5} />}
            </div>
            <div>
              <div>한줄평</div>
              <text> {comment}</text>
            </div>
          </div>
        }
        {rateState1 === true && rateState2 === false &&
          <div className='rate_box'>
            <h2 className="rating_heading"> 리뷰 작성하기</h2>
            <button id='button' onClick={() => onclickBackEditHandler()}>수정 취소</button>
            <button id='button' onClick={() => onclickSaveEditHandler()}>수정 저장</button>
            <br></br>
            <div>맛 만족도 {<HeartRating score={score1} updateScore={updateScore1} />} </div>
            <div>가성비 {<HeartRating score={score2} updateScore={updateScore2} />}</div>
            <div>재구매 의사 {<HeartRating score={score3} updateScore={updateScore3} />}</div>
            <div>
              {question4}
              {<HeartRating score={score4} updateScore={updateScore4} />}
            </div>
            <div>
              {question5}
              {<HeartRating score={score5} updateScore={updateScore5} />}
            </div>
            <div>
              <div>한줄평</div>
              <input type="text" onChange={(event) => setComment(event.target.value)} />
            </div>
          </div>
        }
        <div>
        </div>
      </div>
    </div>

  )
}

export default RatingForm
