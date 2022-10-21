import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import {
  fetchHeros,
  selectHero,
} from "../../store/slices/hero";
import "./HeroList.css";
import { AppDispatch } from "../../store";

interface IProps {
  title: string;
}

type HeroType = { id: number; name: string; age: string; };

export default function HeroList(props: IProps) {
  const navigate = useNavigate();
  const { title } = props;

  const heroState = useSelector(selectHero);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchHeros());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clickHeroHandler = (hero: HeroType) => {
    navigate("/heros/" + hero.id);
  };

  return (
    <div className="HeroList">
      <div className="title">{title}</div>
      <div className="heros">
        {heroState.heros.map((hero) => {
          return (
            <Hero
              key={hero.id}
              name={hero.name}
              age={hero.age}
              clickDetail={() => clickHeroHandler(hero)}
            />
          );
        })}
      </div>
      <div className='button-container'>
        <NavLink className='new-hero-button' to="/new-hero">New Hero</NavLink>
      </div>
    </div>
  );
}
