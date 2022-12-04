
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import {  ProductType, selectProduct } from "../../store/slices/product";
import { RateType, selectRate, fetchUserRate, fetchRates } from '../../store/slices/rate';
import ProductBlock from "../../components/ProductBlock/ProductBlock";
import "./BestandMost.css"
import { AppDispatch } from '../../store/index';
import { useEffect } from 'react';






function BestandMost() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(()=>{
        dispatch(fetchRates());
    }, [])
    
    const navigate = useNavigate();


    const allProducts = useSelector(selectProduct).products

    let copyAllProducts: ProductType[] = Object.assign([], allProducts)
    
    copyAllProducts.sort((a: ProductType, b:ProductType): number => {
        return b.averageScore - a.averageScore;  // 내림차 정렬 점수 많은 순 
    })

    const bestProduct: ProductType = copyAllProducts[0];

    const allRates = useSelector(selectRate).rates;
    let copyAllRates: RateType[] = Object.assign([], allRates);
    const bestProductComments: RateType[] = copyAllRates.filter(rate => rate.product_id == bestProduct.id)

    bestProductComments.sort((a: RateType, b: RateType): number => {
        return b.likedCount - a.likedCount
    } )

    const bestProductComment: RateType = bestProductComments[0]

    copyAllProducts.sort((a: ProductType, b:ProductType): number => {
        return b.rateCount - a.rateCount;  // 내림차 정렬 점수 많은 순 
    })

    const mostProduct: ProductType = copyAllProducts[0]

    const mostProductComments = copyAllRates.filter(rate => rate.product_id == mostProduct.id)
    mostProductComments.sort((a: RateType, b: RateType): number => {
        return b.likedCount - a.likedCount
    } )
    const mostProductComment: RateType = mostProductComments[0]
        
    
    const onclickProductHandler = (product: ProductType) =>{
        navigate(`/ProductDetail/${product.id}`)
    }



    return (
        <div className="BestandMostPage">

            <div title = "Best" className="Best">

                <h1> "가장 높은 점수를 받았어요!"  </h1>

                <div className = "productBlockBest">
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
                </div>
                
                <div className="BestProductComment">
                        
                        <h1>인기댓글</h1>
                        "{bestProductComment.comment && bestProductComment.comment}"
                        {/* FAKECOMMENT */}
                        
                        <h1>상품설명</h1>
                        {bestProduct.details}
                </div>
                
            </div>


            <div title = "Most" className="Most">
            
                <h1> "가장 많은 평가를 받았어요!" </h1>
                <div className = "productBlockMost">
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
                </div>

                <div className="BestProductComment">
                
                    <h1>인기댓글</h1>
                    "{mostProductComment.comment && mostProductComment.comment}"
                    {/* FAKECOMMENT */}
                
                    <h1>상품설명</h1>
                    {mostProduct && mostProduct.details}
                </div>
            </div>
        
        </div>
    )

}

export default BestandMost;