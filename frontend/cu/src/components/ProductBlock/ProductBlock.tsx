import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../store'
import "./ProductBlock.css";
import { fetchProduct, selectProduct } from '../../store/slices/product';
import { useParams } from 'react-router-dom';

interface Props{
    product_id: number
}

const ProductBlock = (props: Props) => {
    //const {id} = useParams();
    const dispatch = useDispatch<AppDispatch>()
    const productState = useSelector(selectProduct)

    
    useEffect(() => {
         dispatch(fetchProduct(props.product_id))
    }, []);


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