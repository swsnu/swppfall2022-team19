import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useLocation, useNavigate, useParams, Navigate} from "react-router";
import ProductBlock from "../../components/ProductBlock/ProductBlock";
import { AppDispatch } from "../../store";
import { fetchQueryProducts, ProductType, selectProduct } from "../../store/slices/product";
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
    

    const onclickProductHandler = (product: ProductType) =>{
        navigate(`/ProductDetail/${product.id}`)
    }
   

    useEffect(() => {
        dispatch(fetchQueryProducts(QueryString.parse(search, { ignoreQueryPrefix: true })))
      }, [search, dispatch])

    return (
        <div className="CategoryPage">
            <Header />
            <div className="animated-title">
                <h1 className="titles">{mainCategory}</h1>
            </div>
            <div className="productBlocks">
                {products.map(product => (
                    <div key={product.id}>
                        <ProductBlock
                            product_id = {product.id}
                            name = {product.name}
                            imageUrl = {product.imageUrl}
                            details= {product.details}
                            price = {product.price}
                            newProduct = {product.newProduct}
                            averageScore = {product.averageScore}
                            clickProduct ={() => onclickProductHandler(product)}
                        />
                        </div>
                ))}
            </div>
        </div>
    )

}

export default Category