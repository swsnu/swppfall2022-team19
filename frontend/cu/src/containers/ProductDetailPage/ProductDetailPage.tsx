import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux"
import { useNavigate, useParams } from 'react-router'

import RatingForm from '../../components/RatingForm/RatingForm';
import TotalScoreList from '../../components/TotalScoreList/TotalScoreList';
import ReviewList from '../../components/ReviewList/ReviewList';
import ProductBlock from '../../components/ProductBlock/ProductBlock';
import "./ProductDetailPage.css"
import Header from '../Header/Header'
import {selectUser} from "../../store/slices/User"
import {selectProduct} from "../../store/slices/product"
import {fetchRates, RateType, selectRate} from "../../store/slices/rate"
import { AppDispatch } from '../../store';


function ProductDetailPage() {
  const dispatch = useDispatch<AppDispatch>();
  const id = useParams().id as string
  
  //왼편에 product, 오른편에 rating, 아래에 totalScoreList, 맨 아래에는 reviewList.
  //현재 로그인된 user_id, product의 subCategory를 element로 다 넘겨줘야된다. 
  const userState = useSelector(selectUser);
  const productState = useSelector(selectProduct);
  const rateState = useSelector(selectRate);
  const [rate, setRate] = useState<RateType>();
  

  //fetch all the rates stored in particular product
  useEffect(() => {
    dispatch(fetchRates(Number(id)))

    let rate;
    //find rate written by user
    if(rateState.rates){
      rate= rateState.rates.find((user) => user.user_id === userState.selectedUser?.id);
      setRate(rate);
    }else{
      setRate(undefined)
    }

  }, [id, dispatch])

  
  return (
    <div className="productDetailPage">
      <Header />
      <div className="productRate">   
        {<ProductBlock/>}
        {<RatingForm user={userState.selectedUser!} product={productState.selectedProduct!} rate={rate}/>}  {/*! -> tells that selectedUser can't be null*/}
      </div>
      <div className="scoresReviews">
        {<TotalScoreList title={"전체 평점 및 항목별 평점"} />}
        {<ReviewList title={"상품 후기"} />}
      </div>
    </div>
  )
}

export default ProductDetailPage
