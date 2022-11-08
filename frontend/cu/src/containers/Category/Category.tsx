import { useParams } from "react-router";
import ProductBlock from "../../components/ProductBlock/ProductBlock";

function Category() {

    const { id } = useParams(); // categoryID

    return (
        <div className = "Category">
        Category

        <div className="productBlocks" >  // temporary put 
            <ProductBlock pageLink="/" imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809383957350.jpg" name="핫)미트칠리빅핫도그" price={3600}></ProductBlock>
            <ProductBlock pageLink="/" imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809383957312.jpg" name="핫)스노잉치즈빅핫도그" price={3600}></ProductBlock>
            <ProductBlock pageLink="/" imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809383957237.jpg" name="주)스팸데리마요밥바" price={1900}></ProductBlock>
            <ProductBlock pageLink="/" imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809692953623.jpg" name="햄)청양마요너비아니버거" price={3500}></ProductBlock>
            <ProductBlock pageLink="/" imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809453266634.jpg" name="주)참치마요&소고기더블" price={1900}></ProductBlock>
        </div>

        </div>
    )

}

export default Category