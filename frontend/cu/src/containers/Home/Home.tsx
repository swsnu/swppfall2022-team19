import ProductBlock from "../../components/ProductBlock/ProductBlock"
// import product from '../../../../../Data/product_data.json';
import "./Home.css"
import Header from "../Header/Header"
import { useNavigate } from "react-router-dom";


const Home = () => {

    const logo = require('../../Categoryicon/Logo.png')

    const navigate = useNavigate()

    const categoryHandler = () => {
        navigate(`/productDetail/1`)
    }


    return (

        <div className="Home">
            <Header />
            <img className="CenterLogo" onClick={() => navigate("/home")} src={logo} alt="homeLogo" />

            <div className="BasicList">

                <div className="animated-title">

                    <h1 className="titles">오늘의 편의점</h1>
                </div>
                <div className="productBlocks" onClick={() => categoryHandler()} >

                    {<ProductBlock product_id={1} />}
                    {<ProductBlock product_id={2} />}
                    {<ProductBlock product_id={3} />}
                    {<ProductBlock product_id={4} />}
                    {<ProductBlock product_id={5} />}

                </div>

                <div className="BasicList">

                    <div className="UserList">

                        <div className="animated-title">

                            <h1 className="titles"> 오늘의 추천 </h1>
                        </div>
                        
                        <div className="productBlocks" onClick={() => categoryHandler()} >

                            {<ProductBlock product_id={6} />}
                            {<ProductBlock product_id={7} />}
                            {<ProductBlock product_id={8} />}
                            {<ProductBlock product_id={9} />}
                            {<ProductBlock product_id={10} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Home;