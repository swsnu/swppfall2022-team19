
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

    const myPage = require('../../Categoryicon/myPage.png');


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
                        <a onClick={() => clickMyPageHandler()}>???????????????</a>
                    </li>
                    <li>
                        <a onClick={() => clickSignoutHandler()}>????????????</a>
                    </li>
                </ul>
            </div>

            <div className="mainheader">
                <div className="mainheader_categoryBox">
                    <ul className="navBar">
                        <li>
                            <a onClick={() => categoryHandler("??????")}>??????</a>
                        </li>
                        <li>
                            <a onClick={() => categoryHandler("????????????")}>????????????</a>
                        </li>
                        <li>
                            <a onClick={() => categoryHandler("?????????")}>?????????</a>
                        </li>
                        <li>
                            <a onClick={() => categoryHandler("???????????????")}>???????????????</a>
                        </li>
                        <li>
                            <a onClick={() => categoryHandler("??????")}>??????</a>
                        </li>
                        <li>
                            <a onClick={() => categoryHandler("??????")}>??????</a>
                        </li>

                    </ul>
                </div>

                <div className="SearchBox">
                    <input className="SearchInput"
                        type="text"
                        value={searchKey}
                        placeholder="????????? ???????????????????"
                        onChange={(event) => setSearchKey(event.target.value)} />
                    <img title="searchIcon" className="SearchIcon" onClick={() => clickSearchHandler()} src={search} alt="SearchIcon" />
                </div>

            </div>
        </div>
    );

}



export default Header;