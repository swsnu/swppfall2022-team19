import { useNavigate, useParams } from "react-router";
import ProductBlock from "../../components/ProductBlock/ProductBlock";
import Header from "../Header/Header"
import "./Category.css"


function Category() {

    const { id } = useParams(); // categoryID
    const navigate = useNavigate()

    const categoryHandler = () => {
        navigate(`/2/productDetail`)
    }

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