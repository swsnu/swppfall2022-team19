import Header from "../Header/Header"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { RootState } from "../../store";
import { fetchQueryProducts, ProductType, selectProduct } from "../../store/slices/product";



const MyPage = () => {

    const navigate = useNavigate();
    const selectedUserState = useSelector((state: RootState) => state.user.selectedUser);
    const logo = require('../../Categoryicon/Logo.png');


    const allProducts = useSelector(selectProduct);

    
    


    return (
        <div className="MyPage">
            <Header />
            <img title="logo" className="CenterLogo" onClick={() => navigate("/home")} src={logo} alt="homeLogo" />
            <div>
                My user name is {selectedUserState?.username}
            </div>
            <div className ="ratedProduct">


            </div>

            <div className = "likedComments">



            </div>

            </div>
    )
}

export default MyPage;