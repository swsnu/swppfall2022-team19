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
      alert("Error on post User");
    }
  };

  if (submitted) {
    return <Navigate to="/login" />; 
  } else {
    return (
      <div className="Signup">
        <h1>Register</h1>
        <label>ID</label>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

      <label>Password</label>
        <input
          type="text"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button onClick={() => postUserHandler()}>Signup</button>
      </div>
    );
  }
}
