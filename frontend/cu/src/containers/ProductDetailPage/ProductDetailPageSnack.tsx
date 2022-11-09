import React, { useState } from 'react';
import RatingForm from '../../components/RatingForm/RatingForm';
import TotalScoreList from '../../components/TotalScoreList/TotalScoreList';
import ReviewList from '../../components/ReviewList/ReviewList';
import ProductBlock from '../../components/ProductBlock/ProductBlock';
import "./ProductDetailPage.css"
import Header from '../Header/Header'

function ProductDetailPageSnack() {

  //왼편에 product, 오른편에 rating, 아래에 totalScoreList, 맨 아래에는 reviewList.

  return (
    <div className="productDetailPage">
      <Header />
      <div className="productRate">   
      {<ProductBlock imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801728107031.jpg" name="대산)쿠키런빅별딸기스낵" price={2000}></ProductBlock>}
        {<RatingForm user_id={1} product_id={1} category_id={1} score={[]} />}
      </div>
      <div className="scoresReviews">
        {<TotalScoreList title={"전체 평점 및 항목별 평점"} />}
        {<ReviewList title={"상품 후기"} />}
      </div>
    </div>
  )
}

export default ProductDetailPageSnack
