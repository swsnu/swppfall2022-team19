import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from 'react-router'

import RatingForm from '../../components/RatingForm/RatingForm';
import TotalScoreList from '../../components/TotalScoreList/TotalScoreList';
import ReviewList from '../../components/ReviewList/ReviewList';
import ProductBlock from '../../components/ProductBlock/ProductBlock';
import "./ProductDetailPage.css"
import Header from '../Header/Header'
import { selectUser } from "../../store/slices/User"
import { selectProduct } from "../../store/slices/product"
import { fetchRates, RateType, selectRate } from "../../store/slices/rate"
import { AppDispatch } from '../../store';


function ProductDetailPage() {
  const dispatch = useDispatch<AppDispatch>();
  const id = useParams().id as string

  //왼편에 product, 오른편에 rating, 아래에 totalScoreList, 맨 아래에는 reviewList.
  //현재 로그인된 user_id, product의 subCategory를 element로 다 넘겨줘야된다. 
  const userState = useSelector(selectUser);
  const productState = useSelector(selectProduct);
  const product = productState.selectedProduct;
  const rateState = useSelector(selectRate);
  const [rate, setRate] = useState<RateType>();


  //fetch all the rates stored in particular product
  useEffect(() => {
    // dispatch(fetchRates())

    let rate;
    //find rate written by user
    if (rateState.rates) {
      rate = rateState.rates.find((user) => user.user_id === userState.selectedUser?.id);
      setRate(rate);
    } else {
      setRate(undefined)
    }

  }, [id, dispatch])


  return (
    <div className="productDetailPage">
      <Header />
      <div className="productRate">
        <div key={product?.id}>
          {<ProductBlock
            product_id={product?.id!}
            name={product?.name!}
            imageUrl={product?.imageUrl!}
            details={product?.details!}
            price={product?.price!}
            newProduct={product?.newProduct!}
            averageScore={product?.averageScore!}
          />}
        </div>
        <div key={rate?.id}>
          {<RatingForm user={userState.selectedUser!} product={productState.selectedProduct!} rate={rate} />}  {/*! -> tells that selectedUser can't be null*/}
        </div>

      </div>
      <div className="scoresReviews">
        <div key={rate?.id}>
          {<TotalScoreList user={userState.selectedUser!} product={productState.selectedProduct!} rate={rate} />}</div>
        <div key={rate?.id}>
          {<ReviewList user={userState.selectedUser!} product={productState.selectedProduct!} rate={rate} />}</div>
      </div>
    </div>
  )
}

export default ProductDetailPage
