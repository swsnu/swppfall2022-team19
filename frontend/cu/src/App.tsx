import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductDetailPage from './containers/ProductDetailPage/ProductDetailPage';
import React, { useEffect, useLayoutEffect } from 'react';
import Login from './containers/UserSurvey/Login'
import SignupSurvey from './containers/UserSurvey/SignupSurvey'
import Home from './containers/Home/Home'
import Category from './containers/Category/Category'
import SearchResult from "./containers/Header/SearchResult";
import MyPage from "./containers/MyPage/MyPage";
// import BestandMost from "./containers/Home/BestandMost";
import { fetchAllProducts } from "./store/slices/product";
import { fetchRates } from "./store/slices/rate";
import { AppDispatch } from "./store";
import { useDispatch } from "react-redux";


function App() {

  const dispatch = useDispatch<AppDispatch>();



  useEffect(() => {

    dispatch(fetchAllProducts);
    dispatch(fetchRates);

  }, []) 

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
          <Route path="/searchProduct/searchkey=:searchKey" element={<SearchResult />} />
          <Route path="/searchProduct/searchkey=" element={<SearchResult />} />
          <Route path="/user/:id" element={<MyPage />} />
          <Route path="*" element={<Navigate replace to={"/login"} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
