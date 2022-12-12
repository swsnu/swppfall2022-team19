import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { useParams } from 'react-router'

import TotalScoreList from '../../components/TotalScoreList/TotalScoreList';
import ReviewList from '../../components/ReviewList/ReviewList';
import ProductBlock from '../../components/ProductBlock/ProductBlock';
import "./ProductDetailPage.css"
import Header from '../Header/Header'
import { selectUser } from "../../store/slices/User"
import { fetchProduct, selectProduct } from "../../store/slices/product"
import { fetchRates, selectRate } from "../../store/slices/rate"
import { AppDispatch } from '../../store';
import RatingLayout from '../../components/RatingForm/RatingLayout';


function ProductDetailPage() {
  //왼편에 product, 오른편에 rating, 아래에 totalScoreList, 맨 아래에는 reviewList.
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const userState = useSelector(selectUser);
  const selectedProduct = useSelector(selectProduct).selectedProduct;
  const rateState = useSelector(selectRate);
  const [callRate1, setCallRate1] = useState<boolean>();
  const [callRate2, setCallRate2] = useState<boolean>();


  //fetch all the rates stored in particular product
  useEffect(() => {
    console.log("initial fetch rates")
    dispatch(fetchProduct(Number(id)));
    dispatch(fetchRates());
  }, [id, dispatch])


  const updateRecall1 = (state: boolean): void => {  //if any state changes in RatingLayout, this is updated. 
    setCallRate1(state)
  }
  const updateRecall2 = (state: boolean): void => {
    setCallRate2(state)
  }


  //{selectedProduct?.details}
  /*        
  return (
    <div className="productDetailPage">
      <Header/>
      <div className="productRate">
          <div key={1}>
          {selectedProduct && (<ProductBlock
            product_id={selectedProduct?.id}
            name={selectedProduct?.name}
            imageUrl={selectedProduct?.imageUrl}
            details={selectedProduct?.details}
            price={selectedProduct?.price}
            newProduct={selectedProduct?.newProduct}
            averageScore={selectedProduct?.averageScore}
            rateCount={selectedProduct?.rateCount}
          />)}
          </div>
        <div key={2}>
          {
            userState.selectedUser && selectedProduct &&
            <RatingLayout user={userState.selectedUser} product={selectedProduct} rate={rateState.rates} recallRateState1={updateRecall1} recallRateState2={updateRecall2}/>
          }
        </div>

      </div>
      {<div className="scoresReviews">
        <div key={3}>
          {userState.selectedUser && selectedProduct &&
            <TotalScoreList user={userState.selectedUser} product={selectedProduct} rate={rateState.rates} />}</div>
        <div key={4}>
          {userState.selectedUser && selectedProduct &&
            <ReviewList user={userState.selectedUser} product={selectedProduct} rate={rateState.rates} />}</div>
      </div>}
    </div>
  )*/

  return (
    <div className="productDetailPage">
      <Header/>
      <div className='productRateWrapper'>
      <div className="productRate">
        <div className='productblock' key={1}>
          <img className="product_image" src={selectedProduct?.imageUrl} alt="Product"/>
          <div>{selectedProduct?.name}</div>
          <div>{selectedProduct?.mainCategory}</div>
          <div>{selectedProduct?.price}원</div>
          <div className='productblock_detail'> {selectedProduct?.details}</div>
        </div>
        <div className='ratingform' key={2}>
          {
            userState.selectedUser && selectedProduct &&
            <RatingLayout user={userState.selectedUser} product={selectedProduct} rate={rateState.rates} recallRateState1={updateRecall1} recallRateState2={updateRecall2}/>
          }
        </div>
      </div>
      </div>
      {<div className="scoresReviews">
        <div key={3}>
          {userState.selectedUser && selectedProduct &&
            <TotalScoreList user={userState.selectedUser} product={selectedProduct} rate={rateState.rates} />}</div>
        <div key={4}>
          {userState.selectedUser && selectedProduct &&
            <ReviewList user={userState.selectedUser} product={selectedProduct} rate={rateState.rates} />}</div>
      </div>}
    </div>
  )

}

export default ProductDetailPage