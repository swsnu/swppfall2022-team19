
import "./Header.css"

import { fetchSearchProducts } from "../../store/slices/product";

import { useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { signoutUser } from "../../store/slices/User";
import { UserType, loginUser, getRequestUser, getUsers, selectUser } from "../../store/slices/User"; // Login
import { RootState } from "../../store"; // Login

const Header = () => {

    const selectedUserState = useSelector(selectUser); // login
    const [searchKey, setSearchKey] = useState<string>("");
    // const [checkStateFlag, setStateFlag] = useState<number>(0);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    /*
    const effectAlert = (() => {
        alert("로그인 해야 접근 가능한 페이지입니다.");
        // effectAlertFlag++;
        return <Navigate to="/login"></Navigate>;
    });

    const moveTo = ((userState: boolean) => {
        if (userState === false) {
            return <Navigate to="/login"></Navigate>;
        } else {
            console.log("Dont' need to move");
        }
    });
    */

    const search = require('../../Categoryicon/search.png');

    const logo = require('../../Categoryicon/Logo.png');

    const myPage = require('../../Categoryicon/myPage.png');


    const clickSearchHandler = async () => {
        const result = await dispatch(fetchSearchProducts({ name: searchKey ? searchKey : "_" }));
        if (`${fetchSearchProducts.typePrefix}/fulfilled`) {
            if (searchKey == "")
                navigate(`/searchProduct/BLANK`);
            else
                navigate(`/searchProduct/${searchKey}`);
            console.log("searchKey", searchKey);
        }
    }

    const clickMyPageHandler = async () => {

        const id = selectedUserState?.selectedUser?.id
        navigate("/user/:id");
        console.log("userid", id);
    }




    const clickSignoutHandler = async () => {
        const result = await dispatch(signoutUser());
        if (`${signoutUser.typePrefix}/fulfilled`) {
            navigate("/login");
        }
    }



    const categoryHandler = (mainCategory: string) => {
        navigate(`/category/${mainCategory}`)
    }

    return (

        <div className="header"  >
            <div className="start-header">
                <img title="logo" className="Logo" onClick={() => navigate("/home")} src={logo} alt="homeLogo" />
                <nav>
                    <div className="Category">
                        <div title="CategoryMenu" className="CategoryMenu" onClick={() => categoryHandler("간편식사")} >

                            <p>간편식사</p>
                        </div>

                        <div title="CategoryMenu" className="CategoryMenu" onClick={() => categoryHandler("과자류")} >
                            <p>과자류</p>
                        </div>

                        <div title="CategoryMenu" className="CategoryMenu" onClick={() => categoryHandler("아이스크림")} >
                            <p>아이스크림</p>
                        </div>

                        <div title="CategoryMenu" className="CategoryMenu" onClick={() => categoryHandler("식품")} >
                            <p>식품</p>
                        </div>

                        <div title="CategoryMenu" className="CategoryMenu" onClick={() => categoryHandler("음료")} >
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
                <img title="searchIcon" className="SearchIcon" onClick={() => clickSearchHandler()} src={search} alt="SearchIcon" />
            </div>


            <div className="end-header">
                <img title="myPageIcon" className="MyPageIcon" onClick={() => clickMyPageHandler()} src={myPage} alt="MyPageIcon" />
                <button title="signoutButton" className="SignoutButton" onClick={() => clickSignoutHandler()}> 로그아웃</button>

            </div>
        </div>
    );

}



export default Header;