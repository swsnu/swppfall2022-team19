import React, { useState } from 'react';
import RatingForm from '../../components/RatingForm/RatingForm';
import TotalScoreList from '../../components/TotalScoreList/TotalScoreList';
import ReviewList from '../../components/ReviewList/ReviewList';
import "./ProductDetailPage.css"

function ProductDetailPage() {

  //왼편에 product, 오른편에 rating, 아래에 totalScoreList, 맨 아래에는 reviewList.


  return (
    <div>
      <div>
        {<RatingForm user_id={1} product_id={1} category_id={1} score={[]} />}
        {<TotalScoreList title={"전체 평점 및 항목별 평점"} />}
        {<ReviewList title={"상품 후기"} />}
      </div>
    </div>
  )
}

export default ProductDetailPage