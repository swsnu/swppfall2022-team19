import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import ProductDetailPage from './containers/ProductDetailPage/ProductDetailPage';
import React, { useLayoutEffect }  from 'react';
import Login from './containers/UserSurvey/Login'
import SignupSurvey from './containers/UserSurvey/SignupSurvey'
import Home from './containers/Home/Home'
import Category from './containers/Category/Category'
import SearchResult from "./containers/Header/SearchResult";
import MyPage from "./containers/MyPage/MyPage";
import { getRequestUser, getUsers } from "./store/slices/User";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

function App() {

  const dispatch = useDispatch<AppDispatch>();
  const selectedUser = (state: RootState) => state.user.selectedUser;
  const selectedUserState = useSelector(selectedUser);

  useLayoutEffect(() => {
    console.log(localStorage.getItem('loginUser'));
    if (localStorage.getItem('loginUser') === null) {
      console.log("> localStorage.getItem('loginUser')===null입니다");
    } else {
      dispatch(getUsers()).then(() => dispatch(getRequestUser()));
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
          <Route path="*" element={<Navigate replace to={"/login"} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
