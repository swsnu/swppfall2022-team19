import ProductBlock from "../../components/ProductBlock/ProductBlock"
// import product from '../../../../../Data/product_data.json';
import "./Home.css"
// import Header from "../Header/Header"
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchQueryProducts, selectProduct } from "../../store/slices/product";
import QueryString from "qs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";


const Home = () => {

    const logo = require('../../Categoryicon/Logo.png')

    const navigate = useNavigate()

    const categoryHandler = () => {
        navigate(`/ProductDetail/1`)
    }

    const dispatch = useDispatch<AppDispatch>();
    const { search } = useLocation();
    const allProducts = useSelector(selectProduct);


    useEffect(() => {
        dispatch(fetchQueryProducts(QueryString.parse(search, { ignoreQueryPrefix: true })))
    }, [search, dispatch])


    return (

        <div className="Home">
            {/* <Header /> */}
            <img className="CenterLogo" onClick={() => navigate("/home")} src={logo} alt="homeLogo" />

            <div className="BasicList">

                <div title = "animatedTitle" className="animated-title">
                    <h1 className="titles">오늘의 편의점</h1>
                </div>

                </div>

                {/* <div className="BasicList">

                    <div className="UserList"> */}

                        <div title = "animatedTitle" className="animated-title">
                            <h1 className="titles"> 오늘의 추천 </h1>
                        </div>

                        <div title = "testProducts" className="productBlocks" onClick={() => categoryHandler()} >
                            {allProducts.products.map(product => (
                                <div key={product.id}>
                                    <ProductBlock
                                        product_id={product.id}
                                        name={product.name}
                                        imageUrl={product.imageUrl}
                                        details={product.details}
                                        price={product.price}
                                        newProduct={product.newProduct}
                                        averageScore={product.averageScore}
                                    />
                                </div>
                            ))}

                        </div>
                    </div>
                // </div>
            // </div>
        
    )
}



export default Home;

// function dispatch(arg0: any) {
//     throw new Error("Function not implemented.");
// }
