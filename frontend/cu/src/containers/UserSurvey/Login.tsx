import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { loginUser } from "../../store/slices/User";
import './Login.css';


export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const loginUserHandler = async () => {
    const data = { username: username, password: password };
    const result = await dispatch(loginUser(data));
    // console.log("Login.tsx result ")
    // console.log(result)
    if (result.type === `${loginUser.typePrefix}/fulfilled`) {
      setSubmitted(true);
    } else {
      alert("사이트에 처음 방문하셨다면 회원가입을 먼저 진행해주세요! \n또는 입력하신 비밀번호를 다시 한번 확인해주시기를 바랍니다. ");
    }
  };

  const navigate = useNavigate();

  const clickCreateHandler = () => {
    navigate("/signup");
  }


  if (submitted) {
    return <Navigate to="/home" />; // to home, temp hero
  } else {
    return (
      <div className="Login">

        <div className = "IDPassword">
        <h1>로그인</h1>
        <div className = "IDText">
          
          <label>아  이  디  </label>
          <input className = "inputID"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div className = "PassText">
          <label>비밀번호</label>
          <input className = "inputPassword"
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
