import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../store'
import "./ProductBlock.css";
import { fetchProduct, selectProduct } from '../../store/slices/product';

const ProductBlock = () => {
    const id = useParams().id as string
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const productState = useSelector(selectProduct)

    useEffect(() => {
        dispatch(fetchProduct(Number(id)))
    }, [id, dispatch])

    let commaPrice = productState.selectedProduct?.price.toLocaleString('ko-KR');
    
    return (
        <div className="productBlock">
            {/* <a className="productA" href={props.pageLink}> */}
                <div className="productInfoBlock">
                    <div className="productImageBox">
                    <img className="productImage" src={productState.selectedProduct?.imageUrl} alt="Product"/>
                    </div>
                    <div className="productTextBlock">
                        <p className="productName">{productState.selectedProduct?.name}</p>
                        <span className="productPrice">{commaPrice}원</span>
                        <span className='productDetail'>설명:{productState.selectedProduct?.details}</span>
                        <span className='productAverageScore'>평균점수: {productState.selectedProduct?.averageScore}</span>
                    </div>
                </div>
            {/* </a> */}
        </div>
    )
}


export default ProductBlock;