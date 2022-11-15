import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useLocation, useNavigate, useParams} from "react-router";
import ProductBlock from "../../components/ProductBlock/ProductBlock";
import { AppDispatch } from "../../store";
import { fetchQueryProducts, selectProduct } from "../../store/slices/product";
import Header from "../Header/Header"
import "./Category.css"
import QueryString from 'qs'


function Category() {
    const dispatch = useDispatch<AppDispatch>();
    const { search } = useLocation();
    const { mainCategory} = useParams();
    const navigate = useNavigate();

    const allProducts = useSelector(selectProduct)
    const products = allProducts.products.filter(product => product.mainCategory === mainCategory)
    

    useEffect(() => {
        dispatch(fetchQueryProducts(QueryString.parse(search, { ignoreQueryPrefix: true })))
      }, [search, dispatch])

    return (
        <div className="CategoryPage">
            {/* <Header /> */}
            <div className="animated-title">
                <h1 className="titles">{mainCategory}</h1>
            </div>
            <div title="productBlocks" className="productBlocks" onClick={() => navigate(`/ProductDetail/1`)}  >
                {products.map(product => ( <div title="product" key={product.id}>
                        <ProductBlock
                            product_id = {product.id}
                            name = {product.name}
                            imageUrl = {product.imageUrl}
                            details= {product.details}
                            price = {product.price}
                            newProduct = {product.newProduct}
                            averageScore = {product.averageScore}
                        />
                        </div>
                ))}
            </div>
        </div>
    )

}

export default Category