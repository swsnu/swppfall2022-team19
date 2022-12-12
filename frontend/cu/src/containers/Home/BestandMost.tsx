
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { ProductType, selectProduct, fetchAllProducts } from '../../store/slices/product';
import { RateType, selectRate, fetchRates } from '../../store/slices/rate';
import ProductBlock from "../../components/ProductBlock/ProductBlock";
import "./BestandMost.css"

function BestandMost() {


    const navigate = useNavigate();


    const allProducts = useSelector(selectProduct).products

    let copyAllProducts: ProductType[] = Object.assign([], allProducts)

    copyAllProducts.sort((a: ProductType, b: ProductType): number => {
        return b.averageScore - a.averageScore;  // 내림차 정렬 점수 많은 순 
    })

    const bestProduct: ProductType = copyAllProducts[0];

    const allRates = useSelector(selectRate).rates;
    let copyAllRates: RateType[] = Object.assign([], allRates);
    const bestProductComments: RateType[] = copyAllRates.filter(rate => rate.product_id == bestProduct.id)

    bestProductComments.sort((a: RateType, b: RateType): number => {
        return b.likedCount - a.likedCount
    })

    const bestProductComment: RateType = bestProductComments[0]

    copyAllProducts.sort((a: ProductType, b: ProductType): number => {
        return b.rateCount - a.rateCount;  // 내림차 정렬 점수 많은 순 
    })

    const mostProduct: ProductType = copyAllProducts[0]

    const mostProductComments = copyAllRates.filter(rate => rate.product_id === mostProduct.id)
    mostProductComments.sort((a: RateType, b: RateType): number => {
        return b.likedCount - a.likedCount
    })
    const mostProductComment: RateType = mostProductComments[0]


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
                        <ProductBlock
                            product_id={bestProduct.id}
                            name={bestProduct.name}
                            imageUrl={bestProduct.imageUrl}
                            details={bestProduct.details}
                            price={bestProduct.price}
                            newProduct={bestProduct.newProduct}
                            averageScore={bestProduct.averageScore}
                            rateCount ={bestProduct.rateCount}
                            clickProduct={() => onclickProductHandler(bestProduct)}
                        />
                    </div>

                    <div className="BestProductComment">

                        <div className="bestCommentBox">
                            <h3 className="smalltitle">인기댓글</h3>
                            <span className="smallComment">{bestProductComment.comment && bestProductComment.comment}</span>
                            {/* FAKECOMMENT */}
                        </div>

                        <div className="bestDetailBox">
                            <h3 className="smalltitle">상품설명</h3>
                            <span className="smallComment">{bestProduct.details}</span>
                        </div>
                    </div>
                </div>


            </div>


            <div title="Most" className="Most">

                <h2 className="Best_title"> "가장 많은 평가를 받았어요!" </h2>

                <div className="productInfoWrap">
                    <div className="productBlockBest">
                        {(mostProduct &&
                            <ProductBlock
                                product_id={mostProduct.id}
                                name={mostProduct.name}
                                imageUrl={mostProduct.imageUrl}
                                details={mostProduct.details}
                                price={mostProduct.price}
                                newProduct={mostProduct.newProduct}
                                averageScore={mostProduct.averageScore}
                                rateCount ={mostProduct.rateCount}
                                clickProduct={() => onclickProductHandler(mostProduct)}
                            />)}
                    </div>

                    <div className="BestProductComment">
                        <div className="bestCommentBox">
                            <h3 className="smalltitle">인기댓글</h3>
                            <span className="smallComment">{mostProductComment.comment && mostProductComment.comment}</span>
                            {/* FAKECOMMENT */}
                        </div>

                        <div className="bestDetailBox">
                            <h3 className="smalltitle">상품설명</h3>
                            <span className="smallComment">{mostProduct && mostProduct.details}</span>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )

}

export default BestandMost;