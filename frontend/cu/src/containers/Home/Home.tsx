import ProductBlock from "../../components/ProductBlock/ProductBlock"
// import product from '../../../../../Data/product_data.json';
import "./Home.css"
import Header from "../Header/Header"


const Home = () => {


    return (

        <div className="Home">
            <Header />

            <div className="BasicList">

                <h1>오늘의 편의점</h1>
                <div className="productBlocks" >
                    {/* 혹시 productBlock에 페이지 링크 안넣고, 그 위 div 에서 넣는게 어떨까? 
        #다른 페이지에서 자주 쓰이니까 말이다! */}
                    <ProductBlock pageLink="/" imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809383957350.jpg" name="핫)미트칠리빅핫도그" price={3600}></ProductBlock>
                    <ProductBlock pageLink="/" imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809383957312.jpg" name="핫)스노잉치즈빅핫도그" price={3600}></ProductBlock>
                    <ProductBlock pageLink="/" imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809383957237.jpg" name="주)스팸데리마요밥바" price={1900}></ProductBlock>
                    <ProductBlock pageLink="/" imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809692953623.jpg" name="햄)청양마요너비아니버거" price={3500}></ProductBlock>
                    <ProductBlock pageLink="/" imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809453266634.jpg" name="주)참치마요&소고기더블" price={1900}></ProductBlock>
                </div>


                <div className="UserList">

                    <h1> 오늘의 추천 </h1>
                    <div className="productBlocks" >
                        <ProductBlock pageLink="/" imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809383957350.jpg" name="핫)미트칠리빅핫도그" price={3600}></ProductBlock>
                        <ProductBlock pageLink="/" imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809383957312.jpg" name="핫)스노잉치즈빅핫도그" price={3600}></ProductBlock>
                        <ProductBlock pageLink="/" imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809383957237.jpg" name="주)스팸데리마요밥바" price={1900}></ProductBlock>
                        <ProductBlock pageLink="/" imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809692953623.jpg" name="햄)청양마요너비아니버거" price={3500}></ProductBlock>
                        <ProductBlock pageLink="/" imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809453266634.jpg" name="주)참치마요&소고기더블" price={1900}></ProductBlock>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Home;