import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductDetailPage from './containers/ProductDetailPage/ProductDetailPage';
import React from 'react';

// for debug (Minji) 아직 페이지 따로 안 만들어서 컴포넌트 별로 확인하려고 넣음
// have to install 'yarn add react-select' for Survey
import ProductBlock from "./components/ProductBlock/ProductBlock";
import Survey from "./containers/Survey/Survey";



function App() {
  return (
    <div>
      <p> Happy Hacking! </p>
      <BrowserRouter>
        <Routes>
          <Route path="/productBlock" element={<ProductBlock pageLink="https://www.naver.com/" imgLink="./Example.jpg" name="맛있는 제품" price={3400}></ProductBlock>} />
          <Route path="/survey" element={<Survey></Survey>} />
          <Route path="/:productId/ProductDetail" element={<ProductDetailPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
