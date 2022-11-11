import { useNavigate, useParams } from "react-router";
import ProductBlock from "../../components/ProductBlock/ProductBlock";
import Header from "../Header/Header"
import "./Category.css"


function Category() {

    const { id } = useParams(); // categoryID
    const navigate = useNavigate()

    const categoryHandler = () => {
        navigate(`/1/productDetail`)
        } 

    return (
        <div className = "CategoryPage">
        <Header />

        <div className = "animated-title">
        <h1 className = "titles">간편한 식사</h1>
        </div>
        <div className="productBlocks"  onClick = {()=> categoryHandler()} > 

            <ProductBlock imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809383957350.jpg" name="핫)미트칠리빅핫도그" price={3600}></ProductBlock>
            <ProductBlock imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809383957312.jpg" name="핫)스노잉치즈빅핫도그" price={3600}></ProductBlock>
            <ProductBlock imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809383957237.jpg" name="주)스팸데리마요밥바" price={1900}></ProductBlock>
            <ProductBlock imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809692953623.jpg" name="햄)청양마요너비아니버거" price={3500}></ProductBlock>
            <ProductBlock imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809453266634.jpg" name="주)참치마요&소고기더블" price={1900}></ProductBlock>
        
        </div>

        <div className="productBlocks" onClick = {()=> categoryHandler()}  >
            <ProductBlock imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801771025320.jpg" name="도)자이언트일품닭강정" price={9900}></ProductBlock>
            <ProductBlock imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801068406542.jpg" name="햄)파마산칠리치즈버거" price={3500}></ProductBlock>
            <ProductBlock imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809895799806.jpg" name="샌)치킨브레스트샌드" price={4000}></ProductBlock>
            <ProductBlock imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801771025399.jpg" name="도)자이언트중화양장피" price={9900}></ProductBlock>
            <ProductBlock imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809802266322.jpg" name="도)유니짜장덮밥" price={3500}></ProductBlock>
        </div>
        


        </div>
    )

}

export default Category