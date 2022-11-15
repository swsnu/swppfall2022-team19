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
import { fetchProduct, selectProduct, ProductType } from "../../store/slices/product"
import rate, { fetchRates, RateType, selectRate } from "../../store/slices/rate"
import { AppDispatch } from '../../store';


function ProductDetailPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  //const id = useParams().id as string

  //왼편에 product, 오른편에 rating, 아래에 totalScoreList, 맨 아래에는 reviewList.
  //현재 로그인된 user_id, product의 subCategory를 element로 다 넘겨줘야된다. 
  const userState = useSelector(selectUser);
  const selectedProduct = useSelector(selectProduct).selectedProduct;
  const rateState = useSelector(selectRate);

  //const [selectedProduct, setSelectedProduct] = useState<ProductType>();

  //fetch all the rates stored in particular product
  useEffect(() => {
    dispatch(fetchProduct(Number(id)));
    dispatch(fetchRates())

    // console.log("selectedProduct: " + selectedProduct)
    // console.log("user: " + userState.selectedUser?.username)
  }, [id, dispatch])



  return (
    <div className="productDetailPage">
      <Header />
      <div className="productRate">
        <div key={selectedProduct?.id}>
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
        <div key={userState.selectedUser?.id}>
          {<RatingForm user={userState.selectedUser!} product={selectedProduct!} rate={rateState.rates} />}
        </div>

      </div>
      <div className="scoresReviews">
        <div key={userState.selectedUser?.id}>
          {<TotalScoreList user={userState.selectedUser!} product={selectedProduct!} rate={rateState.rates} />}</div>
        <div key={userState.selectedUser?.id}>
          {<ReviewList user={userState.selectedUser!} product={selectedProduct!} rate={rateState.rates} />}</div>
      </div>
    </div>
  )
}

export default ProductDetailPage
