import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import ProductBlock from "../../components/ProductBlock/ProductBlock";
import { AppDispatch } from "../../store";
import { fetchQueryProducts, fetchSearchProducts, ProductType, selectProduct } from "../../store/slices/product";
import { useNavigate } from 'react-router';
import { selectUser, UserType } from '../../store/slices/User';
import { addUserRate, fetchRates, fetchUserRate, RateType, selectRate } from '../../store/slices/rate';


function BestandMost() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();



    useEffect(()=> {

        

    }, []
    )


    const rates = useSelector(selectRate)

    let products: ProductType[] = [];
    const allProducts = useSelector(selectProduct)
    
    allProducts.products.sort((a: ProductType, b:ProductType): number => {
        return b.averageScore - a.averageScore;  // 내림차 정렬
    })

    const bestProduct = allProducts.products[0];

    const selectedRate = useSelector(selectRate);
    const bestProductComments = selectedRate.rates.filter(rate => rate.product_id == bestProduct.id)

    bestProductComments.sort((a: RateType, b: RateType): number => {
        return b.likedCount - a.likedCount
    } )

    const bestProductComment = bestProductComments[0]

    

    const onclickProductHandler = (product: ProductType) =>{
        navigate(`/ProductDetail/${product.id}`)
    }



    return (
        <div className="BestandMostPage">

            <div title = "productBlocks" className="productBlocks">
            
                    <div key={bestProduct.id}>
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

                    <div className="BestPRoductComment">
                        "
                        {bestProductComment.comment}
                        "
                    </div>
            
            </div>
        </div>
    )

}

export default BestandMost;