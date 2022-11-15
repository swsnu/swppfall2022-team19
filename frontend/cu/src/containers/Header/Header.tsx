
import "./Header.css"
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { signoutUser } from "../../store/slices/User";


const Header = () => {

    const meal = require('../../Categoryicon/meal.png');
    const snack = require('../../Categoryicon/snack.png');
    const icecream = require('../../Categoryicon/icecream.png');
    const food = require('../../Categoryicon/food.png');
    const drink = require('../../Categoryicon/drink.png');
    const search = require('../../Categoryicon/search.png')

    const logo = require('../../Categoryicon/Logo.png')

    const [searchKey, setSearchKey] = useState<string>("");
    const [submitted, setSubmitted] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const clickSearchHandler = () => {
        setSubmitted(true);
    }

    const clickSignoutHandler = async () => {
        const result = await dispatch(signoutUser());
        if (result.type === `${signoutUser.typePrefix}/fulfilled`) {
            alert("렛미씨유에서 또 만나요!");
            navigate("/login");
        }
        else {
            alert("당신은 렛미씨유를 떠나지 못합니다.");
            // navigate("/login"); 
        }
    }



    const categoryHandler = (categoryID: number) => {
        navigate(`/productList/${categoryID}`)
    }

    if (submitted) {
        return <Navigate to="/home" />;
    } else {
        return (

            <div className="header"  >
                <div className="start-header">
                    <img className="Logo" onClick={() => navigate("/home")} src={logo} alt="homeLogo" />
                    <nav>
                        <div className="Category">
                            <div className="CategoryMenu" onClick={() => categoryHandler(0)} >
                                {/* <img className = "CategoryIcon" src={meal} alt="CategoryIcon"/> */}
                                <p>간편식사</p>
                            </div>

                            <div className="CategoryMenu" onClick={() => categoryHandler(1)} >
                                {/* <img className = "CategoryIcon"src={snack} alt="CategoryIcon" /> */}
                                <p>과자류</p>
                            </div>

                            <div className="CategoryMenu" onClick={() => categoryHandler(2)} >
                                {/* <img className = "CategoryIcon"src={icecream} alt="CategoryIcon"/> */}
                                <p>아이스크림</p>
                            </div>

                            <div className="CategoryMenu" onClick={() => categoryHandler(3)} >
                                {/* <img className = "CategoryIcon"src={food} alt="CategoryIcon" onClick={() => categoryHandler(3)} /> */}
                                <p>식품</p>
                            </div>

                            <div className="CategoryMenu" onClick={() => categoryHandler(4)} >
                                {/* <img className = "CategoryIcon"src={drink} alt="CategoryIcon"/> */}
                                <p>음료</p>
                            </div>
                        </div>
                    </nav>
                </div>

                <div className="SearchBox">
                    <input className="SearchInput"
                        type="text"
                        value={searchKey}
                        onChange={(event) => setSearchKey(event.target.value)} />

                    <img className="SearchIcon" onClick={() => clickSearchHandler()} src={search} alt="SearchIcon" />
                    {/* <button onClick={() => clickCreateHandler()}>찾아보기</button> */}
                </div>

                <div className="end-header">
                    <button className="SignoutButton" onClick={() => clickSignoutHandler()}> 로그아웃</button>
                </div>
            </div>
        );
    }
}



export default Header;
