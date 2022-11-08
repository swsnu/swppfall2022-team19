import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductDetailPage from './containers/ProductDetailPage/ProductDetailPage';
import React from 'react';

// for debug (Minji) 아직 페이지 따로 안 만들어서 컴포넌트 별로 확인하려고 넣음
// have to install 'yarn add react-select' for Survey
import ProductBlock from "./components/ProductBlock/ProductBlock";
import Survey from "./containers/Survey/Survey";

import Login from './containers/UserList/Login'
import Signup from './containers/UserList/Signup' 

import Home from './containers/Home/Home'
import Category from './containers/Category/Category'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/productBlock" element={<ProductBlock pageLink="/" imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809140575360.jpg" name="맛있는 제품" price={3400}></ProductBlock>} />

          <Route path="/home" element={<Home />} />
          <Route path="/survey" element={<Survey></Survey>} />
          <Route path="/:productId/ProductDetail" element={<ProductDetailPage/>}/> // product id = 1,  productdetail 1 
          
          <Route path="/productList/:companyID" element = {<Category />} /> // question? 

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
