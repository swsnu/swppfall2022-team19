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

    const onclickProductHandler = (product: ProductType) =>{
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
    const r = Math.floor(Math.random() * (m-1))
    const showProducts = allProducts.products.filter(product => (product.id % m == r))
    const showLength = Math.floor(Math.random()*(showProducts.length - 5))
    const showProducts5 = showProducts.slice(showLength, showLength + 5)
    

    // randomly all the time 
    // product nums == 78
    // m at most 15 
    // 2 <= m <= 15
    // 0<= residue <= m-1

    // get 5 elements , 




    return (

        <div className="Home">
            <Header />
            <img title="logo" className="CenterLogo" onClick={() => navigate("/home")} src={logo} alt="homeLogo" />


            <div className="BasicList">
                <div className="animated-title">
                    <h1 title="animatedTitle"  className="titles">오늘의 편의점</h1>
                </div>
                <div className="productBlocks">
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
                                clickProduct ={() => onclickProductHandler(product)}
                            />
                        </div>
                    ))}
                </div>
                    

                    <div className="UserList">

                        <div className="animated-title">

                            <h1 title="animatedTitle" className="titles"> 오늘의 추천 </h1>
                        </div>
                        <Recommendation></Recommendation>
                    </div>
                </div>
            </div>
     
    )
}



export default Home;