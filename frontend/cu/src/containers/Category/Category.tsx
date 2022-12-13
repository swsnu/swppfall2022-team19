import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import ProductBlock from "../../components/ProductBlock/ProductBlock";
import { AppDispatch } from "../../store";
import { ProductType, selectProduct, fetchAllProducts } from '../../store/slices/product';
import Header from "../Header/Header"
import "./Category.css"

import { fetchRates } from "../../store/slices/rate";
import BestandMost from "../Home/BestandMost";
import Footer from "../Header/Footer";


function Category() {

    const url = useLocation();
    const { mainCategory } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const allProducts = useSelector(selectProduct)
    let filteredProducts: ProductType[] = allProducts.products

    if (mainCategory !== "전체") {
        filteredProducts = allProducts.products.filter(product => product.mainCategory === mainCategory)
    }
    else filteredProducts = allProducts.products.filter(product => product)


    useLayoutEffect(() => {
        dispatch(fetchAllProducts());
        dispatch(fetchRates());

        setProducts(filteredProducts);
    }, [url])

    const [products, setProducts] = useState<ProductType[]>([...filteredProducts]);

    if (products.length === 0 && filteredProducts.length !== 0) {
        setProducts(filteredProducts);
    }

    const onclickProductHandler = (product: ProductType) => {
        navigate(`/ProductDetail/${product.id}`)
    }

    const HighScoreButtonClick = async () => {
        filteredProducts.sort((a, b) => (b.averageScore) - (a.averageScore))
        console.log("highScore");
        setProducts([...filteredProducts])
    }

    const LowScoreButtonClick = async () => {
        filteredProducts.sort((a, b) => (a.averageScore) - (b.averageScore))
        setProducts([...filteredProducts])
    }

    const RatedButtonClick = async () => {
        filteredProducts.sort((a, b) => (b.rateCount) - (a.rateCount))
        setProducts([...filteredProducts])
    }

    const ExpensiveButtonClick = async () => {
        filteredProducts.sort((a, b) => (b.price) - (a.price))
        setProducts([...filteredProducts])
    }

    const CheapButtonClick = async () => {
        filteredProducts.sort((a, b) => (a.price) - (b.price))
        setProducts([...filteredProducts])
    }

    return (
        <div className="CategoryPage">
            <Header />

            <div className="categoryHeader">
                <div className="categoryBox">
                    <h1 className="category">{mainCategory}</h1>
                </div>


                <div className="sorting" >
                    <button className="sortingButton" title="sortingButtons" onClick={() => HighScoreButtonClick()}>높은 평가 순</button>  │
                    <button className="sortingButton" title="sortingButtons" onClick={() => LowScoreButtonClick()}>낮은 평가 순</button>  │
                    <button className="sortingButton" title="sortingButtons" onClick={() => RatedButtonClick()}>평가 많은 순</button>  │
                    <button className="sortingButton" title="sortingButtons" onClick={() => ExpensiveButtonClick()}>가격 높은 순</button>  │
                    <button className="sortingButton" title="sortingButtons" onClick={() => CheapButtonClick()} >가격 낮은 순</button>
                </div>

            </div>

            {/* {mainCategory ==="전체" && <BestandMost></BestandMost>} */}


            <div title="productBlocks" className="productBlocks">
                {products.map(product => (
                    <div key={product.id}>
                        <ProductBlock
                            product_id={product.id}
                            name={product.name}
                            imageUrl={product.imageUrl}
                            details={product.details}
                            price={product.price}
                            newProduct={product.newProduct}
                            averageScore={product.averageScore}
                            rateCount={product.rateCount}
                            clickProduct={() => onclickProductHandler(product)}
                        />
                    </div>
                ))}
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Category
