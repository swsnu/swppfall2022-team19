import React, { useState } from 'react';
import RatingForm from '../../components/RatingForm/RatingForm';
import TotalScoreList from '../../components/TotalScoreList/TotalScoreList';
import ReviewList from '../../components/ReviewList/ReviewList';
import ProductBlock from '../../components/ProductBlock/ProductBlock';
import "./ProductDetailPage.css"
import Header from '../Header/Header'

function ProductDetailPage() {

  //왼편에 product, 오른편에 rating, 아래에 totalScoreList, 맨 아래에는 reviewList.

  //현재 로그인된 user_id, product의 subCategory를 element로 다 넘겨줘야된다. 
  return (
    <div className="productDetailPage">
      <Header />
      <div className="productRate">   
        {<ProductBlock imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809383957350.jpg" name="핫)미트칠리빅핫도그" price={3600}/>}
        {<RatingForm user_id={1} product_id={1} category_id={0} score={[]} />}
      </div>
      <div className="scoresReviews">
        {<TotalScoreList title={"전체 평점 및 항목별 평점"} />}
        {<ReviewList title={"상품 후기"} />}
      </div>
    </div>
  )
}

export default ProductDetailPage
