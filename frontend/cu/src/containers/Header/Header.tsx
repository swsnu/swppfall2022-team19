
import "./Header.css"

import { fetchSearchProducts } from "../../store/slices/product";

import { useNavigate } from "react-router-dom";
import { useState, useLayoutEffect } from 'react';
import { AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { signoutUser, selectUser, getUsers, getRequestUser } from "../../store/slices/User"; // Login


const Header = () => {

    const selectedUserState = useSelector(selectUser); // login
    const [searchKey, setSearchKey] = useState<string>("");
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();



    useLayoutEffect(() => {
        dispatch(getUsers()).then(() => dispatch(getRequestUser()));
    }, []);

    const search = require('../../Categoryicon/search.png');

    const logo = require('../../Categoryicon/Logo.png');



    const clickSearchHandler = async () => {
        if(searchKey == "" || searchKey == " "){
        }

        const result = await dispatch(fetchSearchProducts({ name: searchKey }));

        if (result.type == `${fetchSearchProducts.typePrefix}/fulfilled`) {
            navigate(`/searchProduct/searchkey=${searchKey}`);
        }
    }

    const clickMyPageHandler = async () => {

        const id = selectedUserState.selectedUser!.id;
        navigate(`/user/${id}`);
    }

    const clickSignoutHandler = async () => {
        const result = await dispatch(signoutUser());
        if (result.type == `${signoutUser.typePrefix}/fulfilled`) {
            navigate("/login");
        }
    }

    const categoryHandler = (mainCategory: string) => {
        navigate(`/category/${mainCategory}`)
    }

    return (

        <div className="header" >
            <div className="upperheader">
                <div className="upperheader_logoBox">
                    <img className="upperheader_logo" onClick={() => navigate("/home")} src={logo} alt="homeLogo" />
                </div>

                <ul className="upperheader_featureList">
                    <li>
                        <a onClick={() => clickMyPageHandler()}>마이페이지</a>
                    </li>
                    <li>
                        <a onClick={() => clickSignoutHandler()}>로그아웃</a>
                    </li>
                </ul>
            </div>

            <div className="mainheader">
                <div className="mainheader_categoryBox">
                    <ul className="navBar">
                        <li>
                            <a onClick={() => categoryHandler("전체")}>전체</a>
                        </li>
                        <li>
                            <a onClick={() => categoryHandler("간편식사")}>간편식사</a>
                        </li>
                        <li>
                            <a onClick={() => categoryHandler("과자류")}>과자류</a>
                        </li>
                        <li>
                            <a onClick={() => categoryHandler("아이스크림")}>아이스크림</a>
                        </li>
                        <li>
                            <a onClick={() => categoryHandler("식품")}>식품</a>
                        </li>
                        <li>
                            <a onClick={() => categoryHandler("음료")}>음료</a>
                        </li>

                    </ul>
                </div>

                <div className="SearchBox">
                    <input className="SearchInput"
                        type="text"
                        value={searchKey}
                        placeholder="무엇을 찾아드릴까요?"
                        onChange={(event) => setSearchKey(event.target.value)} />
                    <img title="searchIcon" className="SearchIcon" onClick={() => clickSearchHandler()} src={search} alt="SearchIcon" />
                </div>

            </div>
        </div>
    );

}



export default Header;