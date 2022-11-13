import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { loginUser, getRequestUser, getUsers } from "../../store/slices/User";
import { RootState } from "../../store";
import './Login.css';


export default function Login() {
  const userState = useSelector((state: RootState) => state.user.selectedUser?.loginState);
  const selectedUserState = useSelector((state: RootState) => state.user.selectedUser);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const logo = require('../../Categoryicon/Logo.png')

  const loginUserHandler = async () => {
    const data = { username: username, password: password };
    // const result_temp = await dispatch(signoutUser()); // temp
    const result = await dispatch(loginUser(data));
    // console.log("Login.tsx result ")
    // console.log(result)
    if (result.type === `${loginUser.typePrefix}/fulfilled`) {
      setSubmitted(true);
    } else {
      alert("사이트에 처음 방문하셨다면 회원가입을 먼저 진행해주세요! \n또는 입력하신 비밀번호를 다시 한번 확인해주시기를 바랍니다. ");
    }
  };

  const moveTo = ((userState: boolean) => {
    if (userState === true) {
      return <Navigate to="/home"></Navigate>
    } else {
      console.log("Dont' need to move");
    }
  });

  useEffect(() => {
    // console.log(userState);
    dispatch(getUsers());
    const result = dispatch(getRequestUser());
    console.log(result);
    if (selectedUserState === null || selectedUserState === undefined) {
      console.log("userState is null");
    } else {
      console.log("userState is already loggedIn");
      moveTo(selectedUserState.loginState);
    }
  }, []);

  if (userState === true) {
    console.log("userState === true가 참입니다!!");
    return <Navigate to="/home"></Navigate> // check
  }

  const clickCreateHandler = () => {
    navigate("/signup");
  }


  if (submitted) {
    return <Navigate to="/home" />; // to home, temp hero
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
