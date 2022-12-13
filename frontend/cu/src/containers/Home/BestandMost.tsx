
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { ProductType, selectProduct, fetchAllProducts } from '../../store/slices/product';
import { RateType, selectRate, fetchRates } from '../../store/slices/rate';
import ProductBlock from "../../components/ProductBlock/ProductBlock";
import "./BestandMost.css"
import { useEffect, useState } from 'react';
import { selectedUser } from '../../store/slices/User';
import { AppDispatch } from '../../store';

function BestandMost() {

    const dispatch = useDispatch<AppDispatch>();
    const [best, setBest] = useState<ProductType>();
    const [most, setMost] = useState<ProductType>();
    const [bestC, setBestC] = useState<RateType>();
    const [mostC, setMostC] = useState<RateType>();

    useEffect(() => {
        dispatch(fetchAllProducts());
        dispatch(fetchRates())

    }, [selectedUser])


    const allProducts = useSelector(selectProduct).products

    let copyAllProducts: ProductType[] = Object.assign([], allProducts)
    let bestProduct: ProductType | undefined = undefined
    let mostProduct: ProductType | undefined = undefined

    if (copyAllProducts){

        copyAllProducts.sort((a: ProductType, b: ProductType): number => {
            return b.averageScore - a.averageScore;  // 내림차 정렬 점수 많은 순 
        })

        bestProduct = copyAllProducts[0];

        copyAllProducts.sort((a: ProductType, b: ProductType): number => {
            return b.rateCount - a.rateCount;  // 내림차 정렬 점수 많은 순 
        })
        mostProduct = copyAllProducts[0];        
    }

    if(bestProduct && !best) setBest(bestProduct);
    if(mostProduct && !most) setMost(mostProduct);

    const allRates = useSelector(selectRate).rates;
    let copyAllRates: RateType[] = Object.assign([], allRates);
    let bestProductComments: RateType[] | undefined;
    let mostProductComments: RateType[] | undefined;
    let bestProductComment: RateType | undefined;
    let mostProductComment: RateType | undefined;

    if( copyAllRates ){
        bestProductComments = copyAllRates.filter(rate => rate.product_id == bestProduct?.id)
        bestProductComments.sort((a: RateType, b: RateType): number => {
            return b.likedCount - a.likedCount
        })

        mostProductComments = copyAllRates.filter(rate => rate.product_id === mostProduct?.id)
        mostProductComments.sort((a: RateType, b: RateType): number => {
            return b.likedCount - a.likedCount
        })
        bestProductComment = bestProductComments[0]
        mostProductComment = mostProductComments[0]
    }

    if( bestProductComment && !bestC){
        setBestC(bestProductComment)
    }

    if (mostProductComment && !mostC) {
        setMostC(mostProductComment)
    }

    



    const navigate = useNavigate();
    
    const onclickProductHandler = (product: ProductType) => {
        navigate(`/ProductDetail/${product.id}`)
    }



    return (
        <div className="BestandMostPage">
            <div className="categoryBox">
                <h1 className="category">주목받은 상품</h1>
            </div>

            <div title="Best" className="Best">

                <h2 className="Best_title"> "가장 높은 점수를 받았어요!"  </h2>

                <div className="productInfoWrap">
                    <div className="productBlockBest">
                        {best && <ProductBlock
                            product_id={best.id}
                            name={best.name}
                            imageUrl={best.imageUrl}
                            details={best.details}
                            price={best.price}
                            newProduct={best.newProduct}
                            averageScore={best.averageScore}
                            rateCount ={best.rateCount}
                            clickProduct={() => onclickProductHandler(best)}
                        />}
                    </div>

                    <div className="BestProductComment">

                        <div className="bestCommentBox">
                            <h3 className="smalltitle">인기댓글</h3>
                            <span className="smallComment">{bestC && bestC.comment}</span>
                        </div>

                        <div className="bestDetailBox">
                            <h3 className="smalltitle">상품설명</h3>
                            <span className="smallComment">{best && best.details}</span>
                        </div>
                    </div>
                </div>


            </div>


            <div title="Most" className="Most">

                <h2 className="Best_title"> "가장 많은 평가를 받았어요!" </h2>

                <div className="productInfoWrap">
                    <div className="productBlockBest">
                        {(most &&
                            <ProductBlock
                                product_id={most.id}
                                name={most.name}
                                imageUrl={most.imageUrl}
                                details={most.details}
                                price={most.price}
                                newProduct={most.newProduct}
                                averageScore={most.averageScore}
                                rateCount ={most.rateCount}
                                clickProduct={() => onclickProductHandler(most)}
                            />)}
                    </div>

                    <div className="BestProductComment">
                        <div className="bestCommentBox">
                            <h3 className="smalltitle">인기댓글</h3>
                            <span className="smallComment">{mostC && mostC.comment}</span>
                        </div>

                        <div className="bestDetailBox">
                            <h3 className="smalltitle">상품설명</h3>
                            <span className="smallComment">{most && most.details}</span>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )

}

export default BestandMost;