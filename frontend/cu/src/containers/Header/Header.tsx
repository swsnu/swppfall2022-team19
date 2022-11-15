
import "./Header.css"
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { signoutUser } from "../../store/slices/User";


const Header = () => {

    const search = require('../../Categoryicon/search.png')

    const logo = require('../../Categoryicon/Logo.png')

    const [searchKey, setSearchKey] = useState<string>("");
    const [submitted, setSubmitted] = useState<boolean>(false);

    const navigate = useNavigate();
    // const dispatch = useDispatch<AppDispatch>();

    const clickSearchHandler = () => {
        setSubmitted(true);
    }

    const clickSignoutHandler = async () => {
        // const result = await dispatch(signoutUser());
        // if (result.type === `${signoutUser.typePrefix}/fulfilled`) {
            // alert("렛미씨유에서 또 만나요!");
            navigate("/login");
        // }
        // else {
            // alert("당신은 렛미씨유를 떠나지 못합니다.");
            // navigate("/login"); 
        // }
    }



    const categoryHandler = (mainCategory: string) => {
        navigate(`/category/${mainCategory}`)
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
                            <div title = "CategoryMenu" className="CategoryMenu" onClick={() => categoryHandler("간편식사")} >
                                <p>간편식사</p>
                            </div>

                            <div title = "CategoryMenu" className="CategoryMenu" onClick={() => categoryHandler("과자류")} >
                                <p>과자류</p>
                            </div>

                            <div title = "CategoryMenu" className="CategoryMenu" onClick={() => categoryHandler("아이스크림")} >
                                <p>아이스크림</p>
                            </div>

                            <div title = "CategoryMenu" className="CategoryMenu" onClick={() => categoryHandler("식품")} >
                                <p>식품</p>
                            </div>

                            <div title = "CategoryMenu" className="CategoryMenu" onClick={() => categoryHandler("음료")} >
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
                    <button className="SignoutButton" onClick={() => clickSignoutHandler()}>로그아웃</button>
                </div>
            </div>
        );
    }
}



export default Header;
