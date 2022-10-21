import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../store";
import { selectHero, fetchHero } from "../../store/slices/hero";
import "./RealDetail.css";

const HeroDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const heroState = useSelector(selectHero);

  useEffect(() => {
    dispatch(fetchHero(Number(id)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="HeroDetail">
      <div className="row">
        <div className="left">Name:</div>
        <div className="right">{heroState.selectedHero?.name}</div>
      </div>
      <div className="row">
        <div className="left">Content:</div>
        <div className="right">{heroState.selectedHero?.age}</div>
      </div>
    </div>
  );
};
export default HeroDetail;
