import React, { useState } from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postRate, rateActions } from '../../store/slices/Rate';
import { postReview, reviewActions } from '../../store/slices/Review';
import HeartRating from './HeartRating'
import "./RatingForm.css"
import { AppDispatch, RootState } from '../../store';
import FixedHeartRating from './FixedHeartRating';

type Props = {
  user_id: number,
  product_id: number,
  category_id: number,
  score: number[],
  clickSubmit?: React.MouseEventHandler<HTMLButtonElement>,
  clickCancel?: React.MouseEventHandler<HTMLButtonElement>,
}


function RatingForm(props: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  //update score for each question when the user clicks rating
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [score3, setScore3] = useState(0);
  const [score4, setScore4] = useState(0);
  const [score5, setScore5] = useState(0);
  const [comment, setComment] = useState("");
  const [rateState, setRateState] = useState(false);   //user에서 해당 제품을 평가했는지 확인 후 state에 넣을 예정 
  const [clickRate, setClickRate] = useState(false);
  const [hideButton, setHideButton] = useState(false);

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

  const clickBackHandler = () => {
    setRateState(false);
    setClickRate(false);
    setHideButton(false);
  }

  const clickSaveHandler = async () => {
    const scores = [score1, score2, score3, score4, score5];
    const dataRate = { user_id: 1, product_id: 1, category_id: 1, scores: scores, comment: comment };
    const result1 = await dispatch(postRate(dataRate));

    const dataReview = { user_id: 1, scores: scores, comment: comment, likedCount: 0, liked: false };
    const result2 = await dispatch(postReview(dataReview));
    setRateState(true);
    setClickRate(false);

    if (result1.type === `${postRate.typePrefix}/fulfilled`) {
      //user가 남긴 평가 프로덕트 리스트에 추가해야함
    }

  }


  const clickRateHandler = () => {
    setClickRate(true);
    setHideButton(true);
  }

  return (
    <div>
      <div className="rating_form">
        <div id='rating_blank'>
          {rateState === false && hideButton === false && 
            <div className='rate_box'>
              <button id="rate_button" hidden={hideButton} onClick={() => clickRateHandler()}>평가하기</button>
            </div>
            }
            {rateState === false && clickRate === true &&
                  <div>
                    <h2 className="rating_heading"> 리뷰 작성하기</h2>
                    <button id='cancel_button' onClick={() => clickBackHandler()}>취소</button>
                    <button id='save_button' onClick={() => clickSaveHandler()}>저장</button>
                    <br></br>

                    <div>맛 만족도 {<HeartRating score={score1} updateScore={updateScore1} />} </div>
                    <div>가성비 {<HeartRating score={score2} updateScore={updateScore2} />}</div>
                    <div>재구매 의사 {<HeartRating score={score3} updateScore={updateScore3} />}</div>

                    <div>
                      {props.category_id === 0 &&
                        <div> 편리성 </div>
                      }
                      {props.category_id === 1 &&
                        <div> 용량 </div>
                      }
                      {props.category_id === 2 &&
                        <div> 신선도 </div>
                      }
                      {props.category_id === 3 &&
                        <div> 건더기 양 </div>
                      }
                      {props.category_id === 4 &&
                        <div> 목넘김 </div>
                      }
                      {<HeartRating score={score4} updateScore={updateScore4} />}
                    </div>

                    <div>
                      {props.category_id === 0 &&
                        <div> 재료 양 </div>
                      }
                      {props.category_id === 1 &&
                        <div> 추천 의사 </div>
                      }
                      {props.category_id === 2 &&
                        <div> 당도 </div>
                      }
                      {props.category_id === 3 &&
                        <div> 간편함 </div>
                      }
                      {props.category_id === 4 &&
                        <div> 당도 </div>
                      }
                      {<HeartRating score={score5} updateScore={updateScore5} />}
                    </div>

                    <div>
                      <div>한줄평</div>
                      <input type="text" onChange={(event) => setComment(event.target.value)} />
                    </div>
                  </div>
                }
        </div>
        {rateState === true &&
          <div>
            <h2 className="rating_heading"> 내 리뷰</h2>
            <div>맛 만족도 {<FixedHeartRating score={score1}/>} </div>
                    <div>가성비 {<FixedHeartRating score={score2} />}</div>
                    <div>재구매 의사 {<FixedHeartRating score={score3} />}</div>

                    <div>
                      {props.category_id === 0 &&
                        <div> 편리성 </div>
                      }
                      {props.category_id === 1 &&
                        <div> 용량 </div>
                      }
                      {props.category_id === 2 &&
                        <div> 신선도 </div>
                      }
                      {props.category_id === 3 &&
                        <div> 건더기 양 </div>
                      }
                      {props.category_id === 4 &&
                        <div> 목넘김 </div>
                      }
                      {<FixedHeartRating score={score4}/>}
                    </div>

                    <div>
                      {props.category_id === 0 &&
                        <div> 재료 양 </div>
                      }
                      {props.category_id === 1 &&
                        <div> 추천 의사 </div>
                      }
                      {props.category_id === 2 &&
                        <div> 당도 </div>
                      }
                      {props.category_id === 3 &&
                        <div> 간편함 </div>
                      }
                      {props.category_id === 4 &&
                        <div> 당도 </div>
                      }
                      {<FixedHeartRating score={score5}/>}
                    </div>
                    <div>
                      <div>한줄평</div>
                      <text> {comment}</text>
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
