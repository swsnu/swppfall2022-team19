import React from 'react';
import RatingForm from '../../components/RatingForm/RatingForm';
import TotalScoreList from '../../components/TotalScoreList/TotalScoreList';
import ReviewList from '../../components/ReviewList/ReviewList';

function ProductDetailPage() {

    //왼편에 product, 오른편에 rating, 아래에 totalScoreList, 맨 아래에는 reviewList.

  return (
    <div>
      {<RatingForm user_id={1} product_id={1} category_id = {1} score={[]}/>}
      {<TotalScoreList title={"전체 평점 및 항목별 평점"} />}
      {<ReviewList title={"상품 후기"} />}
    </div>
  )
}

export default ProductDetailPage
