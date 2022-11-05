import React from 'react'
import RatingForm from '../../components/RatingForm/RatingForm'

function ProductDetailPage() {


    //왼편에 product, 오른편에 rating, 아래에 totalScoreList, 맨 아래에는 reviewList.

  return (
    <div>
      {<RatingForm user_id={1} product_id={1} category_id = {1} score={[]}/>}
    </div>
  )
}

export default ProductDetailPage
