import React, { useState, useEffect } from 'react';
import HeartRating from '../HeartRate/HeartRating'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from '../../../store';
import { createRate, RateType, updateRate } from '../../../store/slices/rate';
import { UserType } from '../../../store/slices/User';
import { ProductType, updateProduct } from '../../../store/slices/product';


interface Props {
    user: UserType,
    product: ProductType,
    rate: RateType,
    question4: string,
    question5: string,
    updateState1: (arg: boolean) => void,
    updateState2: (arg: boolean) => void
}


function EditRateForm(props: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const [score1, setScore1] = useState(0);
    const [score2, setScore2] = useState(0);
    const [score3, setScore3] = useState(0);
    const [score4, setScore4] = useState(0);
    const [score5, setScore5] = useState(0);
    const [comment, setComment] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [totalRateNum, setTotalRateNum] = useState<number>(0);

    const updateScore1 = (score: number): void => {
        setScore1(score)
    }
    const updateScore2 = (score: number): void => {
        setScore2(score)
    }
    const updateScore3 = (score: number): void => {
        setScore3(score)
    }
    const updateScore4 = (score: number): void => {
        setScore4(score)
    }
    const updateScore5 = (score: number): void => {
        setScore5(score)
    }

    const onclickBackEditHandler = () => {
        props.updateState2(true);

    }


    const onclickSaveEditHandler = async () => {   //#TODO: need to update product average score

        const scores = "" + score1 + score2 + score3 + score4 + score5;
        const formData = new FormData()
        formData.append('id', String(props.rate?.id))
        formData.append('user_id', String(props.user?.id!))
        formData.append('username', props.user?.username!)
        formData.append('product_id', String(props.product.id!))
        formData.append('scores', scores)
        formData.append('comment', comment)
        if (image) {
            formData.append('picture', image);
        }
        await dispatch(updateRate(formData))

        let averageScore = (score1 + score2 + score3 + score4 + score5) / 5;
        let totalchange = (averageScore - props.product.averageScore) / (totalRateNum + 1);
        let totalAverageScore = props.product.averageScore - totalchange;
        const dataUpdate = {
            id: props.product.id,
            averageScore: totalAverageScore
        }
        await dispatch(updateProduct(dataUpdate))
        props.updateState2(true);
    }

    const onclickDeleteImageHandler = () =>{
        setImage(null);
      }


    return (
        <div>
            <div className='rate_box'>
                <h2 className="rating_heading"> 리뷰 수정하기</h2>
                <button id='button' onClick={() => onclickBackEditHandler()}>수정 취소</button>
                <button id='button' onClick={() => onclickSaveEditHandler()}>수정 저장</button>
                <br></br>
                <div>맛 만족도 {<HeartRating score={score1} updateScore={updateScore1} />} </div>
                <div>가성비 {<HeartRating score={score2} updateScore={updateScore2} />}</div>
                <div>재구매 의사 {<HeartRating score={score3} updateScore={updateScore3} />}</div>
                <div>
                    {props.question4}
                    {<HeartRating score={score4} updateScore={updateScore4} />}
                </div>
                <div>
                    {props.question5}
                    {<HeartRating score={score5} updateScore={updateScore5} />}
                </div>
                <div>
                    <div>한줄평</div>
                    <input type="text" onChange={(event) => setComment(event.target.value)} />
                </div>
                <div className='picture'>
                    <label>사진</label>
                    {image && (
                        <div>
                            <img alt='Image Not Found' width={'300px'} src={URL.createObjectURL(image)} />
                        </div>
                    )}
                    <br />
                    <input
                        type='file'
                        accept="image/*"
                        onChange={(event) => {
                            if (event.target?.files) {
                                setImage(event.target?.files[0])
                            }
                        }}
                    />
                    <button onClick={() => onclickDeleteImageHandler()}>사진삭제</button>
                </div>
            </div>

        </div>
    )
}

export default EditRateForm
