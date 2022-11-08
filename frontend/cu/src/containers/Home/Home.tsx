import ProductBlock from "../../components/ProductBlock/ProductBlock"
// import product from '../../../../../Data/product_data.json';
import "./Home.css"
import Header from "../Header/Header"
import { useNavigate } from "react-router-dom";


const Home = () => {

    const navigate = useNavigate()

    const categoryHandler = () => {
        navigate(`/1/productDetail`)
        } 

    
    return (

        <div className="Home">
        <Header />
        
        <div className="BasicList">
        
        <h1>오늘의 편의점</h1>
        <div className="productBlocks"  onClick = {()=> categoryHandler()} > 

            <ProductBlock imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809383957350.jpg" name="핫)미트칠리빅핫도그" price={3600}></ProductBlock>
            <ProductBlock imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809383957312.jpg" name="핫)스노잉치즈빅핫도그" price={3600}></ProductBlock>
            <ProductBlock imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809383957237.jpg" name="주)스팸데리마요밥바" price={1900}></ProductBlock>
            <ProductBlock imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809692953623.jpg" name="햄)청양마요너비아니버거" price={3500}></ProductBlock>
            <ProductBlock imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809453266634.jpg" name="주)참치마요&소고기더블" price={1900}></ProductBlock>
        
        </div>

            <div className="BasicList">

        <div className="UserList">
    
        <h1> 오늘의 추천 </h1>
        <div className="productBlocks" onClick={()=> categoryHandler()} >
            <ProductBlock imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801728107031.jpg" name="대산)쿠키런빅별딸기스낵" price={2000}></ProductBlock>
            <ProductBlock imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801728107024.jpg" name="대산)쿠키런빅별초코스낵" price={2000}></ProductBlock>
            <ProductBlock imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801206003800.jpg" name="탑티어)에너지후르츠젤리" price={2000}></ProductBlock>
            <ProductBlock imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801068408164.jpg" name="삼립)포켓몬딸기우유슈" price={2000}></ProductBlock>
            <ProductBlock imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8801068408157.jpg" name="삼립)포켓몬딸기바닐라컵" price={3500}></ProductBlock>
        </div>
        </div>
        </div>
        </div>
        </div>
    )
}



export default Home;