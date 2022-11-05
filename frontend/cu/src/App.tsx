import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductDetailPage from './containers/ProductDetailPage/ProductDetailPage';
import React from 'react';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/:productId/ProductDetail" element = {<ProductDetailPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
