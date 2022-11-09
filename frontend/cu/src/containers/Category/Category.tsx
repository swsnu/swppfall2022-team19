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
        <div className = "CategoryPage">
        <Header />

        <h1>과자와 간식</h1>
        <div className="productBlocks" onClick = {()=> categoryHandler()}  >
            <ProductBlock imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801728107031.jpg" name="대산)쿠키런빅별딸기스낵" price={2000}></ProductBlock>
            <ProductBlock imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801728107024.jpg" name="대산)쿠키런빅별초코스낵" price={2000}></ProductBlock>
            <ProductBlock imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801206003800.jpg" name="탑티어)에너지후르츠젤리" price={2000}></ProductBlock>
            <ProductBlock imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801068408164.jpg" name="삼립)포켓몬딸기우유슈" price={2000}></ProductBlock>
            <ProductBlock imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801068408157.jpg" name="삼립)포켓몬딸기바닐라컵" price={3500}></ProductBlock>
        </div>

        <div className="productBlocks" onClick = {()=> categoryHandler()}  >
            <ProductBlock imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/9300605122994.jpg" name="네슬레)킷캣골드4핑거" price={2000}></ProductBlock>
            <ProductBlock imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/6942836723811.jpg" name="롯데)허쉬코코아리치커피" price={1800}></ProductBlock>
            <ProductBlock imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/6942836723781.jpg" name="롯데)허쉬코코아카라멜" price={1800}></ProductBlock>
            <ProductBlock imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/6942836723767.jpg" name="롯데)허쉬코코아믹스베리" price={1800}></ProductBlock>
            <ProductBlock imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809841060615.jpg" name="나무)프린세스캔디" price={5000}></ProductBlock>
        </div>
        


        </div>
    )

}

export default Category