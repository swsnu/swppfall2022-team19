
import "./Header.css"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { useState } from 'react';
import { AppDispatch } from "../../store";

import { getRequestUser } from "../../store/slices/User";
import { signoutUser } from "../../store/slices/User";
import { fetchSearchProducts } from "../../store/slices/product";
import { RootState } from "../../store";




const Header = () => {

    const search = require('../../Categoryicon/search.png');
    
    const logo = require('../../Categoryicon/Logo.png');

    const [searchKey, setSearchKey] = useState<string>("");

    const myPage = require('../../Categoryicon/myPage.png');


    const selectedUserState = useSelector((state: RootState) => state.user.selectedUser);
    
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
// urls 에 새로운 /searchProduct 추가하기 

    const clickSearchHandler = async () => {
        const result = await dispatch(fetchSearchProducts({name: searchKey!}));
        if (`${fetchSearchProducts.typePrefix}/fulfilled`) { 
            navigate(`/searchProduct/${searchKey}`);
            console.log("searchKey", searchKey);
        }
    }

    const clickMyPageHandler = async () => {
        
        const id =  selectedUserState?.id
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
                        <div  className="Category">
                            <div title= "CategoryMenu" className="CategoryMenu" onClick={() => categoryHandler("간편식사")} >
                               
                                <p>간편식사</p>
                            </div>

                            <div title= "CategoryMenu" className="CategoryMenu" onClick={() => categoryHandler("과자류")} >
                               
                                <p>과자류</p>
                            </div>

                            <div title= "CategoryMenu" className="CategoryMenu" onClick={() => categoryHandler("아이스크림")} >
                                
                                <p>아이스크림</p>
                            </div>

                            <div title= "CategoryMenu" className="CategoryMenu" onClick={() => categoryHandler("식품")} >
                                
                                <p>식품</p>
                            </div>

                            <div title= "CategoryMenu" className="CategoryMenu" onClick={() => categoryHandler("음료")} >
                                
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
                    <img title = "searchIcon" className="SearchIcon" onClick={() => clickSearchHandler()} src={search} alt="SearchIcon" />
                    </div>


                <div className="end-header">
                <img title = "myPageIcon" className="MyPageIcon" onClick={() => clickMyPageHandler()} src={myPage} alt="MyPageIcon" />
                    <button title="signoutButton" className="SignoutButton" onClick={() => clickSignoutHandler()}> 로그아웃</button>

                </div>
            </div>
        );
    
}



export default Header;