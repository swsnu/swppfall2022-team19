import React, { useState } from 'react';
import RatingForm from '../../components/RatingForm/RatingForm';
import TotalScoreList from '../../components/TotalScoreList/TotalScoreList';
import ReviewList from '../../components/ReviewList/ReviewList';
import "./ProductDetailPage.css"

function ProductDetailPage() {

  //왼편에 product, 오른편에 rating, 아래에 totalScoreList, 맨 아래에는 reviewList.

  const [rateState, setRateState] = useState(false);

  const clickRateHandler = () => {
    setRateState(true);
  }

  const updateRateState = (rate: boolean): void => {
    setRateState(rate)
  }
  return (
    <div>
      <div>
        {rateState === false &&
          <div>
            <div className='rate_box'>
            <button id="rate_button" onClick={() => clickRateHandler()}>평가하기</button>
            </div>
            {<TotalScoreList title={"전체 평점 및 항목별 평점"} />}
            {<ReviewList title={"상품 후기"} />}
          </div>
        }
        {rateState === true &&
          <div>
            {<RatingForm user_id={1} product_id={1} category_id={1} score={[]} updateView={updateRateState} />}
            {<TotalScoreList title={"전체 평점 및 항목별 평점"} />}
            {<ReviewList title={"상품 후기"} />}
          </div>}
      </div>
    </div>
  )
}

export default ProductDetailPage
