import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppDispatch } from "../../store";
// import { putUser } from "../../store/slices/user";
import "./Signup.css";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const [age, setAge] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  // const putUserHandler = async () => {
  //   const data = { username: username, password: password };
  //   const result = await dispatch(putUser(data));
  //   if (result.type === `${putUser.typePrefix}/fulfilled`) {
  //     setSubmitted(true);
  //   } else {
  //     alert("Error on login User");
  //   }
  // };

  if (submitted) {
    return <Navigate to="/home" />; // to home, temp hero
  } else {
    return (
      <div className="Login">
        <h1>Login</h1>
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

        {/* <button onClick={() => putUserHandler()}>Login</button> */}
      </div>
    );
  }
}
