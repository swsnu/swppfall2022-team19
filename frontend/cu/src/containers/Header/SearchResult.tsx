import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import ProductBlock from "../../components/ProductBlock/ProductBlock";
import { AppDispatch } from "../../store";
import { fetchSearchProducts, ProductType, selectProduct } from "../../store/slices/product";
import Header from "../Header/Header"
import "./SearchResult.css"



function SearchResult() {
    const dispatch = useDispatch<AppDispatch>();
    const { searchKey } = useParams();

    const navigate = useNavigate();
    let message = ""

    const allProducts = useSelector(selectProduct)
    let products = allProducts.products.filter(product => product.name.includes(searchKey ? searchKey : " "))
    if (products.length === 0) {
        message = "찾으시는 상품과 일치하는 상품이 없습니다. 이런 제품은 어떠신가요?"
        const m = Math.floor(Math.random() * 13) + 2
        const r = Math.floor(Math.random() * (m - 1))
        const showProducts = allProducts.products.filter(product => (product.id % m === r))
        const showLength = Math.floor(Math.random() * (showProducts.length - 5))
        products = showProducts.slice(showLength, showLength + 5)

    } else {
        message = "찾으시는 상품은 다음과 같습니다."
    }


    const onclickProductHandler = (product: ProductType) => {
        navigate(`/ProductDetail/${product.id}`)
    }


    useEffect(() => {
        dispatch(fetchSearchProducts({ name: searchKey! }))
    })

    return (
        <div className="SearchResultPage">
            <Header />
            <div className="searchResultBox">
                <h1 className="searchKey"> "{searchKey}"</h1>
                <div className="searchMessage">{message}</div>
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

export default SearchResult;