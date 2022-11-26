import Header from "../Header/Header"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { RootState } from "../../store";
import { ProductType, selectProduct } from "../../store/slices/product";
import { fetchRates, selectRate } from '../../store/slices/rate';
import { useEffect } from "react";



const MyPage = () => {

    const navigate = useNavigate();
    const selectedUserState = useSelector((state: RootState) => state.user.selectedUser);
    const logo = require('../../Categoryicon/Logo.png');


    const allRates = useSelector(selectRate)
    console.log("Allrate,",  allRates)

    // useEffect(() => {
    //     dispatch(fetchRates())})
        


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

function dispatch(arg0: any) {
    throw new Error("Function not implemented.");
}
