
import "./Header.css"
import { useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { signoutUser } from "../../store/slices/User";
import { UserType, loginUser, getRequestUser, getUsers } from "../../store/slices/User"; // Login
import { RootState } from "../../store"; // Login

const Header = () => {
    // Login
    const users = useSelector((state: RootState) => state.user.users); // login
    const userState = useSelector((state: RootState) => state.user.selectedUser?.loginState); // login
    const selectedUserState = useSelector((state: RootState) => state.user.selectedUser); // login
    const [searchKey, setSearchKey] = useState<string>("");
    const [checkStateFlag, setStateFlag] = useState<number>(0);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    // var effectAlertFlag = 0;
    // var checkStateFlag = 0;
    const effectAlert = (() => {
        alert("로그인 해야 접근 가능한 페이지입니다.");
        // effectAlertFlag++;
        return <Navigate to="/login"></Navigate>;
    });

    useEffect(() => {
        dispatch(getUsers()).then(() => dispatch(getRequestUser())).then(() => {
            // console.log(selectedUserState);
            // effectAlert(selectedUserState);
            setStateFlag(checkStateFlag + 1);
            console.log("checkStateFlag: " + checkStateFlag);
        });
        // dispatch(getUsers());
        // dispatch(getRequestUser());
    }, [dispatch]);


    useEffect(() => {
        console.log("새로운 useEffect: checkStateFlag: " + checkStateFlag);
        if (checkStateFlag === 2) {
            console.log("checkStateFlag가2입니다");
            if ((selectedUserState === null || selectedUserState === undefined)) {
                effectAlert();
            }
            setStateFlag(0);
        }
    }, [checkStateFlag]);


    /*
    useEffect(() => {
        if (selectedUserState === null || selectedUserState === undefined) {
            console.log("userState is null");
            alert("로그인 해야 접근 가능한 페이지입니다");
            moveTo(false);
            // moveTo(false);
        } else {
            console.log("userState is already loggedIn");
            //moveTo(selectedUserState.loginState);
        }
    }, [selectedUserState])
    */




    const moveTo = ((userState: boolean) => {
        if (userState === false) {
            return <Navigate to="/login"></Navigate>;
        } else {
            console.log("Dont' need to move");
        }
    });

    /*
    useEffect(() => {
        dispatch(getUsers());
        console.log("useEffect[]가 작동함");
    }, []);

    useEffect(() => {
        dispatch(getRequestUser());
        console.log("[users]값이 바뀌어서 useEffect가 작동된 건지 확인");
    }, [users]);

    useEffect(() => {
        if (selectedUserState === null || selectedUserState === undefined) {
            console.log("userState is null");
            // alert("로그인 해야 접근 가능한 페이지입니다");
            <Navigate to="/login"></Navigate>;
            // moveTo(false);
        } else {
            console.log("userState is already loggedIn");
            //moveTo(selectedUserState.loginState);
        }
    }, [selectedUserState]);


    if (userState === false) {
        console.log("userState === false입니다!!");
        return <Navigate to="/login"></Navigate> // check
    }
    */


    const search = require('../../Categoryicon/search.png')

    const logo = require('../../Categoryicon/Logo.png')



    const clickSearchHandler = () => {
        navigate('/home');
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
                <button title="signoutButton" className="SignoutButton" onClick={() => clickSignoutHandler()}> 로그아웃</button>
            </div>
        </div>
    );

}



export default Header;