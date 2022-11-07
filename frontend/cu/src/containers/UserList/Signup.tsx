import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { postUser } from "../../store/slices/User";
import "./Signup.css";

export default function Signup() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const [age, setAge] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const postUserHandler = async () => {
    const data = { username: username, password: password };
    const result = await dispatch(postUser(data));
    if (result.type === `${postUser.typePrefix}/fulfilled`) {
      setSubmitted(true);
    } else {
      alert("해당 아이디는 이미 사용 중에 있습니다. 다른 아이디를 사용해주세요. ");
    }
  };

  if (submitted) {
    return <Navigate to="/login" />; 
  } else {
    return (
      <div className="Signup">
        
        <h1>Register</h1>
        <div>
        <label> 아 이 디 </label>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        </div>
      <div>
      <label>비밀번호</label>
        <input
          type="text"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        </div>
        <div>
        <button onClick={() => postUserHandler()}>등록하기</button>
        </div>
      </div>
    );
  }
}
