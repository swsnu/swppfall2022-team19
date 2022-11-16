import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { useParams } from 'react-router'

import RatingForm from '../../components/RatingForm/RatingForm';
import TotalScoreList from '../../components/TotalScoreList/TotalScoreList';
import ReviewList from '../../components/ReviewList/ReviewList';
import ProductBlock from '../../components/ProductBlock/ProductBlock';
import "./ProductDetailPage.css"
import Header from '../Header/Header'
import { selectUser } from "../../store/slices/User"
import { fetchProduct, selectProduct} from "../../store/slices/product"
import { fetchRates, selectRate } from "../../store/slices/rate"
import { AppDispatch } from '../../store';


function ProductDetailPage() {
  //왼편에 product, 오른편에 rating, 아래에 totalScoreList, 맨 아래에는 reviewList.
  //현재 로그인된 user_id, product의 subCategory를 element로 다 넘겨줘야된다. 
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const userState = useSelector(selectUser);
  const selectedProduct = useSelector(selectProduct).selectedProduct;
  const rateState = useSelector(selectRate);

  //fetch all the rates stored in particular product
  useEffect(() => {
    dispatch(fetchProduct(Number(id)));
    //console.log("selectedProduct:" +selectedProduct?.name)
    //console.log("username:" + userState.selectedUser?.username)
  }, [id, dispatch])

  useEffect(() => {
    dispatch(fetchRates())
  }, [])

  return (
    <div className="productDetailPage">
      <Header />
      <div className="productRate">
        <div key={1}>
          {<ProductBlock
            product_id={selectedProduct?.id!}
            name={selectedProduct?.name!}
            imageUrl={selectedProduct?.imageUrl!}
            details={selectedProduct?.details!}
            price={selectedProduct?.price!}
            newProduct={selectedProduct?.newProduct!}
            averageScore={selectedProduct?.averageScore!}
          />}
        </div>
        <div key={2}>
          {<RatingForm user={userState.selectedUser!} product={selectedProduct!} rate={rateState.rates}/>}
        </div>

      </div>
      {/* <div className="scoresReviews">
        <div key={3}>
          {<TotalScoreList user={userState.selectedUser!} product={selectedProduct!} rate={rateState.rates} />}</div>
        <div key={4}>
          {<ReviewList user={userState.selectedUser!} product={selectedProduct!} rate={rateState.rates} />}</div>
      </div> */}
    </div>
  )
}

export default ProductDetailPage
