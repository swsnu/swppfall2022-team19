import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductDetailPage from './containers/ProductDetailPage/ProductDetailPage';
import React from 'react';

// for debug (Minji) 아직 페이지 따로 안 만들어서 컴포넌트 별로 확인하려고 넣음
// have to install 'yarn add react-select' for Survey
import ProductBlock from "./components/ProductBlock/ProductBlock";


import Login from './containers/UserSurvey/Login'
import SignupSurvey from './containers/UserSurvey/SignupSurvey'
import Home from './containers/Home/Home'
import Category from './containers/Category/Category'

// 
function App() {
  return (
    <div className="appTotal">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to={"/login"} />} />
          <Route path='/login' element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path='/signup' element={<SignupSurvey />} />
<<<<<<< HEAD
          <Route path="/1/ProductDetail" element={<ProductDetailPage />} />
          <Route path="/2/ProductDetail" element={<ProductDetailPageSnack />} />
          <Route path="/productList/1" element={<Category />} />
          <Route path="/productList/0" element={<Category1 />} />
=======
          <Route path="/ProductDetail/:id/" element={<ProductDetailPage />} />
          <Route path="/category/:mainCategory" element={<Category/>} />

>>>>>>> 34b190eaf4d2c8f906eb21840627edf9ebef1ebb
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// {/* <Route path="/productList/:companyID" element={<Category />} /> */}

export default App;
