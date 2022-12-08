import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import ProductBlock from "../../components/ProductBlock/ProductBlock";
import { AppDispatch } from "../../store";
import { fetchQueryProducts, ProductType, selectProduct } from "../../store/slices/product";
import Header from "../Header/Header"
import "./Category.css"
import QueryString from 'qs'


function Category() {

    const url = useLocation();
    const { mainCategory } = useParams();
    const navigate = useNavigate();

    const allProducts = useSelector(selectProduct)
    let filteredProducts: ProductType[];

    if ( mainCategory != "전체") 
        filteredProducts = allProducts.products.filter(product => product.mainCategory === mainCategory)
    else filteredProducts = allProducts.products.filter(product => product )

    const [products, setProducts] = useState<ProductType[]>(filteredProducts);


    const onclickProductHandler = (product: ProductType) => {
        navigate(`/ProductDetail/${product.id}`)
        
    }

    useEffect(() => {
        setProducts(filteredProducts);
    }, [url])


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

            <div className="categoryBox">
                <h1 className="category">{mainCategory}</h1>
            </div>

            <div className = "sorting">
                <button className = "sortingButton" onClick={() => HighScoreButtonClick()}>높은 평가 순</button> |
                <button  className = "sortingButton" onClick={() => LowScoreButtonClick()}>낮은 평가 순</button> |
                <button className = "sortingButton" onClick={() => RatedButtonClick()}>평가 많은 순</button> |
                <button className = "sortingButton" onClick={() => ExpensiveButtonClick()}>가격 높은 순</button> |
                <button className = "sortingButton" onClick={() => CheapButtonClick()} >가격 낮은 순</button>

            </div>

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
                            clickProduct={() => onclickProductHandler(product)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

}

export default Category


