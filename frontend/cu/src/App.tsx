import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductDetailPage from './containers/ProductDetailPage/ProductDetailPage';
import React from 'react';

// for debug (Minji) 아직 페이지 따로 안 만들어서 컴포넌트 별로 확인하려고 넣음
// have to install 'yarn add react-select' for Survey

import Login from './containers/UserSurvey/Login'
import SignupSurvey from './containers/UserSurvey/SignupSurvey'
import Home from './containers/Home/Home'
import Category from './containers/Category/Category'
import SearchResult from "./containers/Header/SearchResult";
import MyPage from "./containers/MyPage/MyPage";
import { useEffect } from "react"; //local
import { getRequestUser, selectUser } from "./store/slices/User";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { useSelector } from "react-redux";
import { RootState } from "./store";

function App() {

  const selectedUserState = useSelector((state: RootState) => state.user.selectedUser);
  const dispatch = useDispatch<AppDispatch>();

  const moveToLogin = ((loggedin: boolean) => {
    console.log("moveToLogin is activated");

    if (!loggedin) {
      return <Navigate to="/login"></Navigate>
    } else {
      console.log("is loggeed in");
    }
  });

  useEffect(() => {
    console.log(localStorage.getItem('localStorage: loginUser'));
    if (localStorage.getItem('loginUser') === null) {
      console.log("localStorage.getItem('loginUser')===null");
      moveToLogin(false);
    } else {
      dispatch(getRequestUser());
      console.log("selectedUser: " + selectedUserState?.username);
    }
  }, []);


  return (
    <div className="appTotal">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to={"/login"} />} />
          <Route path='/login' element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path='/signup' element={<SignupSurvey />} />
          <Route path="/ProductDetail/:id/" element={<ProductDetailPage />} />
          <Route path="/category/:mainCategory" element={<Category />} />
          <Route path="/searchProduct/:searchKey" element={<SearchResult />} />
          <Route path="/searchProduct/" element={<SearchResult />} />

          <Route path="/user/:id" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
