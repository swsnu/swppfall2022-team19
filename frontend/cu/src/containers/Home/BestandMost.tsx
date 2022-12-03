import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import ProductBlock from "../../components/ProductBlock/ProductBlock";

import {  fetchAllProducts, ProductType, selectProduct } from "../../store/slices/product";
import { useNavigate } from 'react-router';

import { RateType, selectRate, fetchRates } from '../../store/slices/rate';
import { fetchProduct } from '../../store/slices/product';
import { AppDispatch, AppStore } from '../../store/index';


function BestandMost() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();


    const allProducts = useSelector(selectProduct).products
    console.log("product length", allProducts.length);

    let copyAllProducts: ProductType[] = Object.assign([], allProducts)
    
    copyAllProducts.sort((a: ProductType, b:ProductType): number => {
        return b.averageScore - a.averageScore;  // 내림차 정렬 점수 많은 순 
    })

    const bestProduct = copyAllProducts[0];

    const allRates = useSelector(selectRate).rates;
    console.log("rates length", allRates.length);
    let copyAllRates: RateType[] = Object.assign([], allRates);
    const bestProductComments = copyAllRates.filter(rate => rate.product_id == bestProduct.id)

    bestProductComments.sort((a: RateType, b: RateType): number => {
        return b.likedCount - a.likedCount
    } )

    const bestProductComment = bestProductComments[0]

    copyAllRates.sort((a: RateType, b: RateType): number => {
        return a.product_id - b.product_id
    })
    
    let productIDCompare = copyAllRates[0].product_id
    let cntMost = 0
    let productIDMost = 0 // 최종 결과 
    let cntCompare = 0

    copyAllRates.forEach(element => { 

        if ( element.product_id == productIDCompare ){
            
            cntCompare = cntCompare + 1 // 이전과 같은 product ID rate 만나면 누적 추가 

        } else { // 다른 productID 만났다 ? // 이전 productID rate 처리  
            if ( cntMost < cntCompare ) { // 기존에 있던 최고 점수와 저번 productID cnt 비교 //  저번 cnt 가 더 크다 ? 
                cntMost = cntCompare // Most 변경
                productIDMost = productIDCompare // most 변경 
            }
            // 새로운 productID 처리 
            productIDCompare = element.product_id // productID 현재 처리하고 있는 것 바꿔주기 
            cntCompare = 1 // 처음 만난 친구 cnt 1 로 바꿔주세요
        }   
    });
    
    // 마지막 compare 해주세요 
    if ( cntMost < cntCompare ) { // 기존에 있던 최고 점수와 저번 productID cnt 비교 //  저번 cnt 가 더 크다 ? 
        cntMost = cntCompare // Most 변경
        productIDMost = productIDCompare // most 변경 
    }

    const mostProduct = allProducts.find(product => product.id === productIDMost )


    const mostProductComments = copyAllRates.filter(rate => rate.product_id == bestProduct.id)
    mostProductComments.sort((a: RateType, b: RateType): number => {
        return b.likedCount - a.likedCount
    } )
    const mostProductComment = mostProductComments[0]
        
    


    

    const onclickProductHandler = (product: ProductType) =>{
        navigate(`/ProductDetail/${product.id}`)
    }



    return (
        <div className="BestandMostPage">

            <div title = "Best" className="Best">

                <h1> "가장 높은 점수를 받았어요!"  </h1>

                <div>
            
                        <ProductBlock
                            product_id = {bestProduct.id}
                            name = {bestProduct.name}
                            imageUrl = {bestProduct.imageUrl}
                            details= {bestProduct.details}
                            price = {bestProduct.price}
                            newProduct = {bestProduct.newProduct}
                            averageScore = {bestProduct.averageScore}
                            clickProduct ={() => onclickProductHandler(bestProduct)}
                        />

                    <div className="BestProductComment">
                        
                        <h1>인기댓글</h1>
                        "{bestProductComment.comment}"
                        {/* FAKECOMMENT */}
                        
                        <h1>상품설명</h1>
                        {bestProduct.details}
                    </div>
                </div>
            </div>


            <div title = "Most" className="Most">
            
                <h1> "가장 많은 평가를 받았어요!" </h1>
                <div>
                {(mostProduct &&
                <ProductBlock
                    product_id = {mostProduct.id}
                    name = {mostProduct.name}
                    imageUrl = {mostProduct.imageUrl}
                    details= {mostProduct.details}
                    price = {mostProduct.price}
                    newProduct = {mostProduct.newProduct}
                    averageScore = {mostProduct.averageScore}
                    clickProduct ={() => onclickProductHandler(mostProduct)}
                />)}

                <div className="BestProductComment">
                
                    <h1>인기댓글</h1>
                    "{mostProductComment.comment}"
                    {/* FAKECOMMENT */}
                
                    <h1>상품설명</h1>
                    {mostProduct && mostProduct.details}
                </div>
        </div>
        </div>

        </div>
    )

}

export default BestandMost;