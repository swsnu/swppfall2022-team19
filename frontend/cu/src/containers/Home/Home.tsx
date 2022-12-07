import ProductBlock from '../../components/ProductBlock/ProductBlock';
import "./Home.css"

import Header from "../Header/Header"
import { useLocation, useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";
import { fetchAllProducts, ProductType, selectProduct } from "../../store/slices/product";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import Recommendation from './Recommendation';
import BestandMost from './BestandMost';
import { fetchRates } from '../../store/slices/rate';


const Home = () => {
    const logo = require('../../Categoryicon/Logo.png');

    const navigate = useNavigate();

    const onclickProductHandler = (product: ProductType) => {
        navigate(`/ProductDetail/${product.id}`)
    }

    const dispatch = useDispatch<AppDispatch>();


    const { search } = useLocation();

    useLayoutEffect(() => {  // 두번 뜹니다 

        dispatch(fetchAllProducts())
        dispatch(fetchRates())
        console.log("useEffect in Home")

    }, [search]);



    const allProducts = useSelector(selectProduct);


    const m = Math.floor(Math.random() * 13) + 2
    const r = Math.floor(Math.random() * (m - 1))
    const showProducts = allProducts.products.filter(product => (product.id % m === r))
    const showLength = Math.floor(Math.random() * (showProducts.length - 4))
    const showProducts5 = showProducts.slice(showLength, showLength + 4)
    // const showLength = Math.floor(Math.random() * (showProducts.length - 5))
    // const showProducts5 = showProducts.slice(showLength, showLength + 5)


    // randomly all the time 
    // product nums == 78
    // m at most 15 
    // 2 <= m <= 15
    // 0<= residue <= m-1

    // get 5 elements , 




    return (
        <div className="Home">
            <Header />
            <div className="HomeWrap">

                <div className="content1_random">
                    <div className="content_titleBox">
                        <p className="content_title"> 오늘의 편의점</p>
                        <p className="explain"> 무작위 추천을 통해 <br /> 새롭고 다양한 제품을 <br /> 즐겨보세요 </p>
                    </div>

                    <div className="productBlocks4">
                        {showProducts5.map(product => (

                            <div key={product.id}>
                                <ProductBlock
                                    product_id={product.id}
                                    name={product.name}
                                    imageUrl={product.imageUrl}
                                    details={product.details}
                                    price={product.price}
                                    newProduct={product.newProduct}
                                    averageScore={product.averageScore}
                                    clickProduct={() => onclickProductHandler(product)}
                                />
                            </div>
                        ))}
                    </div>

                </div>

                <div className="content2_recommend">

                    <div className="content_titleBox">
                        <p className="content_title"> 당신을 위한 <br /> 오늘의 추천 </p>
                        <p className="explain"> 비슷한 취향을 가진 <br /> 다른 사용자의 평가를 바탕으로 <br /> 추천해드려요 </p>
                    </div>

                    <div className="recommendBox">
                        <Recommendation></Recommendation>
                    </div>
                </div>
            </div>
        </div>

    )
}



export default Home;