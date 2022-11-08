import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductDetailPage from './containers/ProductDetailPage/ProductDetailPage';
import React from 'react';

// for debug (Minji) 아직 페이지 따로 안 만들어서 컴포넌트 별로 확인하려고 넣음
// have to install 'yarn add react-select' for Survey
// yarn add redux react-redux 
// yarn add react-router-dom

import ProductBlock from "./components/ProductBlock/ProductBlock";
import Survey from "./containers/UserAndSurvey/SignupSurvey";

import Login from './containers/UserAndSurvey/Login'
import SignupSurvey from "./containers/UserAndSurvey/SignupSurvey";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/productBlock" element={<ProductBlock pageLink="/" imgLink="https://tqklhszfkvzk6518638.cdn.ntruss.com/product/8809140575360.jpg" name="맛있는 제품" price={3400}></ProductBlock>} />
          
          <Route path="/:productId/ProductDetail" element={<ProductDetailPage/>}/>

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignupSurvey />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
