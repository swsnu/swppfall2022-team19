import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../store";
import { postHero } from "../../../store/slices/hero";
import "./NewHero.css";

export default function NewHero() {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const postHeroHandler = async () => {
    const data = { name: name, age: age };
    const result = await dispatch(postHero(data));
    if (result.type === `${postHero.typePrefix}/fulfilled`) {
      setSubmitted(true);
    } else {
      alert("Error on post Hero");
    }
  };

  if (submitted) {
    return <Navigate to="/heros" />;
  } else {
    return (
      <div className="NewHero">
        <h1>Add a Hero</h1>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <label>Age</label>
        <input
          type="text"
          value={age}
          onChange={(event) => setAge(event.target.value)}
        />
        <button onClick={() => postHeroHandler()}>Submit</button>
      </div>
    );
  }
}
