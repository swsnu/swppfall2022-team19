import { userInfo } from 'os';
import React, {useState, useEffect, useRef} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../store/index';

import {
 fetchLogin,
 fetchLogout
} from "../../store/slices/user";

import { NavLink, useNavigate } from "react-router-dom";
import { AppDispatch } from '../../store/index';
import { userActions, selectUser } from '../../store/slices/user';
import userSlice from '../../store/slices/user';


interface IProps {
    islogin: boolean;
  }

const validLogin = (id:string, password:string) => {
    if(id === "swpp@snu.ac.kr" && password === "iluvswpp"){
        return true;
    }else{
        return false;
    }
}

function Login() {

    const isLogin = useSelector(selectUser).login;
    const navigate = useNavigate();

    useEffect(() => {
      if(isLogin) navigate("/articles");
      // eslint-disable-next-line react-hooks/exhaustive-deps
    });
    

    const dispatch = useDispatch<AppDispatch>();

    function onSubmit(e: React.FormEvent) {
      e.preventDefault();
    
      if (validLogin(
        idRef.current ? idRef.current.value : " ",
        passwordRef.current ? passwordRef.current.value : " ",
        )){
        dispatch(fetchLogin(idRef.current ? idRef.current.value : " "));
        navigate("/articles");        

        }
        else alert("Email or password is wrong");
    }
  
    const idRef = useRef<HTMLInputElement>(null) || " ";
    const passwordRef = useRef<HTMLInputElement>(null) || " ";

    return (
      <form onSubmit={onSubmit}>
      {/* <div> */}
        <div className="input_area">
          <input id = "email-input" type="text" placeholder="ID" ref={idRef} />
        </div>
        <div className="input_area">
          <input id = "pw-input" type="text" placeholder="Password" ref={passwordRef} />
        </div>
        
        <button id = "login-button">
        Login
        </button>
        {/* </div> */}
      </form>
    );
  }



  export default Login;