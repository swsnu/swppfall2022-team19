import { useState, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { loginUser, getRequestUser, getUsers, selectUser } from '../../store/slices/User';
import { RootState } from "../../store";
import './Login.css';

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);


  const users = useSelector((state: RootState) => state.user.users);
  const userState = useSelector((state: RootState) => state.user.selectedUser?.loginState);
  const selectedUserState = useSelector((state: RootState) => state.user.selectedUser);

  const logo = require('../../Categoryicon/Logo.png')

  const loginUserHandler = async () => {
    const data = { username: username, password: password };
    const result = await dispatch(loginUser(data));
    if (result.type === `${loginUser.typePrefix}/fulfilled`) {
      setSubmitted(true);
    } else {
      alert("사이트에 처음 방문하셨다면 회원가입을 먼저 진행해주세요! \n또는 입력하신 비밀번호를 다시 한번 확인해주시기를 바랍니다. ");
    }
  };

  useLayoutEffect(() => {
    console.log(localStorage.getItem('loginUser'));
    if (localStorage.getItem('loginUser') != null) {
      window.location.replace('/home');
    }



  }, [dispatch]);

  const clickCreateHandler = () => {
    navigate("/signup");
  }


  if (submitted) {
    window.location.replace('/home');
    return null;
    //return <Navigate to="/home" />; // to home, temp hero
  } else {
    return (
      <div className="Login">
        <img className="CenterLogo" src={logo} alt="homeLogo" />
        <div className="IDPassword">
          <h1>로그인</h1>
          <div className="IDText">

            <label className="signinText">아  이  디  </label>
            <input className="inputID"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div className="PassText">
            <label className="signinText">비밀번호</label>
            <input className="inputPassword"
              type="text"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

        </div>

        {<button onClick={() => loginUserHandler()}>Login</button>}
        <button onClick={() => clickCreateHandler()}>회원가입</button>
      </div>



    );
  }
}