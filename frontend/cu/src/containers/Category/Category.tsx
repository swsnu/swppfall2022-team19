import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import ProductBlock from "../../components/ProductBlock/ProductBlock";
import { AppDispatch } from "../../store";
import { fetchQueryProducts } from "../../store/slices/product";
import Header from "../Header/Header"
import "./Category.css"
import QueryString from 'qs'


function Category() {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams(); // categoryID
    const { search } = useLocation()
    const navigate = useNavigate()

    const categoryHandler = () => {
        navigate(`/2/productDetail`)
    }

    useEffect(() => {
        dispatch(fetchQueryProducts(QueryString.parse(search, { ignoreQueryPrefix: true })))
      }, [search, dispatch])

    return (
        <div className="CategoryPage">
            <Header />
            <div className="animated-title">
                <h1 className="titles">과자와 간식</h1>
            </div>
            <div className="productBlocks" onClick={() => categoryHandler()}  >
                {<ProductBlock product_id={1} />}
                {<ProductBlock product_id={2} />}
                {<ProductBlock product_id={3} />}
                {<ProductBlock product_id={4} />}
                {<ProductBlock product_id={5} />}
            </div>

            <div className="productBlocks" onClick={() => categoryHandler()}  >

                {<ProductBlock product_id={6} />}
                {<ProductBlock product_id={7} />}
                {<ProductBlock product_id={8} />}
                {<ProductBlock product_id={9} />}
                {<ProductBlock product_id={10} />}
            </div>



        </div>
    )

}

export default Category