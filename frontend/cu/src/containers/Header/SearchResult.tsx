import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import ProductBlock from "../../components/ProductBlock/ProductBlock";
import { AppDispatch } from "../../store";
import { fetchSearchProducts, ProductType, selectProduct, TagType } from "../../store/slices/product";
import Header from "../Header/Header"
import "./SearchResult.css"



function SearchResult() {
    const dispatch = useDispatch<AppDispatch>();
    const { searchKey } = useParams();

    const navigate = useNavigate();
    let message = ""

    const allProducts = useSelector(selectProduct)
    let products = allProducts.products.filter(product => product.name.includes(searchKey ? searchKey : " "))
    let categoryProducts = allProducts.products.filter(product => product.mainCategory === searchKey ||  product.mainCategory == searchKey)
    const tag_SearchID = allProducts.tags.filter(tag => tag.name === String(searchKey)) // id
     
    if (tag_SearchID){
        tag_SearchID.forEach((tag: TagType) => {

            for (let index = 0; index < allProducts.products.length; index++) {
                const product = allProducts.products[index];
                for (let j = 0; j < product.tags.length; j++){
                    if (product.tags[j] == String(tag.id)){
                        products.push(product)
                    }
                }
            }
        });
    }
    
    products = products.concat(categoryProducts);

    if (products.length === 0) {
        message = "찾으시는 상품과 일치하는 상품이 없습니다. 이런 제품은 어떠신가요?"
        // const date = new Date();
        // const sec = date.getSeconds();
        // const m = Math.floor(sec/60 * 13) + 2
        // const r = Math.floor(sec/60 * (m - 1))
        // const showProducts = allProducts.products.filter(product => (product.id % m === r))
        // const showLength = Math.floor(sec/60 * (showProducts.length - 5))
        // products = showProducts.slice(showLength, showLength + 5)
        products = allProducts.products

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
            {/* <Header /> */}
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
                            rateCount={product.rateCount}
                            clickProduct={() => onclickProductHandler(product)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchResult;