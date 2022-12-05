import React, { useState, useEffect } from 'react';
import FixedHeartRating from '../FixedHeartRate/FixedHeartRating';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from '../../../store';
import { createRate, deleteRate, fetchRates, RateType, selectRate } from '../../../store/slices/rate';
import { UserType } from '../../../store/slices/User';
import { ProductType } from '../../../store/slices/product';

interface Props {
    user: UserType,
    product: ProductType,
    rate: RateType,
    question4: string,
    question5: string,
    updateState1: (arg: boolean) => void,
    updateState2: (arg: boolean) => void
}


function AfterRateForm(props: Props) {
    const dispatch = useDispatch<AppDispatch>();

    console.log(props.rate.scores)
    const score1 = props.rate?.scores.charAt(0);
    const score2 = props.rate?.scores.charAt(1);
    const score3 = props.rate?.scores.charAt(2);
    const score4 = props.rate?.scores.charAt(3);
    const score5 = props.rate?.scores.charAt(4);

    const onclickEditHandler = () => {
        props.updateState2(false);
    }

    const onclickDeleteHandler = async () => {
        await dispatch(deleteRate(props.rate.id!))
        props.updateState1(false);
        props.updateState2(false);
    }

    return (
        <div>
            <div>
                <h2 className="rating_heading"> 내 리뷰</h2>
                <button id='button' onClick={() => onclickEditHandler()}>수정</button>
                <button id='button' onClick={() => onclickDeleteHandler()}>삭제</button>
                <div>맛 만족도 {<FixedHeartRating score={score1!} />} </div>
                <div>가성비 {<FixedHeartRating score={score2!} />}</div>
                <div>재구매 의사 {<FixedHeartRating score={score3!} />}</div>
                <div>
                    {props.question4}
                    {<FixedHeartRating score={score4!} />}
                </div>
                <div>
                    {props.question5}
                    {<FixedHeartRating score={score5!} />}
                </div>
                <div>
                    <div>한줄평</div>
                    <div> {props.rate.comment}</div>
                </div>
                {props.rate.picture != undefined &&
                    <div className='picture'>
                        <label>사진</label>
                        <img src={props.rate.picture} width={250} />
                    </div>
                }
            </div>


        </div>
    )
}

export default AfterRateForm
