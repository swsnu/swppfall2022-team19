import { useState, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { loginUser, getRequestUserAtLogin, getUsers } from '../../store/slices/User';
import './Login.css';

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

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
    dispatch(getUsers()).then(() => dispatch(getRequestUserAtLogin()));

  }, []);

  const clickCreateHandler = () => {
    navigate("/signup");
  }


  if (submitted) {
    window.location.replace('/home');
    return null;
    // 테스트 각주 return <Navigate to="/home" />;
  } else {
    return (
      <div className="Login">
        <div className="loginWholeWrap">
          <div className="LoginLogoBox">
            <img className="CenterLogo" src={logo} alt="homeLogo" />
          </div>


          <div className="IDPassword">
            <div className="IDBox">
              <div className="spanIDDiv">
                <span className="spanID">아이디</span>
              </div>

              <input className="inputID"
                type="text"
                value={username}
                placeholder="아이디를 입력해주세요"
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>

            <div className="IDBox">
              <div className="spanIDDiv">
                <span className="spanID">비밀번호</span>
              </div>
              <input className="inputID"
                type="password"
                value={password}
                placeholder="비밀번호를 입력해주세요"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

          </div>

          <div className="buttonBox">
            <button onClick={() => loginUserHandler()}> 로그인 </button>
            <button onClick={() => clickCreateHandler()}> 회원가입 </button>
          </div>

        </div>

      </div>

    );
  }
}