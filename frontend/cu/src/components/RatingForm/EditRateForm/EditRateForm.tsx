import React, { useState, useEffect } from 'react';
import HeartRating from '../HeartRate/HeartRating'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from '../../../store';
import { createRate, fetchRates, RateType, selectRate, updateRate } from '../../../store/slices/rate';
import { UserType } from '../../../store/slices/User';
import { fetchProduct, ProductType, updateProduct } from '../../../store/slices/product';
import "../RatingLayout.css"

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
    const [score1, setScore1] = useState(Number(props.rate.scores[0]));
    const [score2, setScore2] = useState(Number(props.rate.scores[1]));
    const [score3, setScore3] = useState(Number(props.rate.scores[2]));
    const [score4, setScore4] = useState(Number(props.rate.scores[3]));
    const [score5, setScore5] = useState(Number(props.rate.scores[4]));
    const [comment, setComment] = useState(props.rate.comment);
    const [image, setImage] = useState<File | null>();
    const [previousImage, setPreviousImage] = useState<string | null>(props.rate.picture);

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



    const onclickSaveEditHandler = async () => {

        const scores = "" + score1 + score2 + score3 + score4 + score5;
        const formData = new FormData()
        formData.append('id', String(props.rate?.id))
        formData.append('product_id', String(props.product.id))
        formData.append('scores', scores)
        formData.append('comment', comment)
        if (image !== null && image !== undefined) {   //if null or undefined, no picture is posted
            formData.append('picture', image);
        }
        else if(previousImage !== null){  //if did not change previous picture, then previous picture is posted
            console.log("previous image is not null")
            formData.append('picture', previousImage)
        }
        formData.append('likedCount', String(props.rate?.likedCount))
        //console.log("rate id: " + props.rate.id + " commment: " + comment)
        await dispatch(updateRate(formData))

        dispatch(fetchProduct(props.product.id))
        dispatch(fetchRates())

        props.updateState2(true);
    }

    const onclickDeleteImageHandler = () => {
        console.log("Previous image: " + previousImage)
        setImage(null);
        setPreviousImage(null);
        console.log("image: " + image)
    }


    return (
        <div>
            <h2 className="rating_heading"> 리뷰 수정하기</h2>
                <div className='rating_box'>
                    <div className='q1'>맛이 만족스럽나요? {<HeartRating score={score1} updateScore={updateScore1} />} </div>
                    <div className='q2'>가성비가 좋은가요? {<HeartRating score={score2} updateScore={updateScore2} />}</div>
                    <div className='q3'>재구매 의사가 있나요? {<HeartRating score={score3} updateScore={updateScore3} />}</div>
                    <div className='q4'>
                        {props.question4}
                        {<HeartRating score={score4} updateScore={updateScore4} />}
                    </div>
                    <div className='q5'>
                        {props.question5}
                        {<HeartRating score={score5} updateScore={updateScore5} />}
                    </div>
                    <div className="comment">
                        <div>한줄평가</div>
                        <input className="comment_box" type="text" value={comment} onChange={(event) => setComment(event.target.value)} />
                    </div>
                    <div className='picture'>
                        <div className='picture_first_row'>
                        <div>사진</div>
                        <button onClick={() => onclickDeleteImageHandler()}>사진삭제</button>
                        </div>
                        {previousImage && 
                            <img src={previousImage} height={'180px'} width={200} />}
                        {image && (
                            <div>
                                <img alt='Image Not Found' height={'180px'} width={'200px'} src={URL.createObjectURL(image)} />
                            </div>
                        )}
                        <input
                            type='file'
                            accept="image/*"
                            onChange={(event) => {
                                if (event.target?.files) {
                                    setImage(event.target?.files[0])
                                }
                                setPreviousImage(null)
                            }}
                        />
                        </div>
                        <div className="buttons">  
                        <button className='edit_cancel_button' id='button' onClick={() => onclickBackEditHandler()}>수정 취소</button>
                        <button className='edit_save_button' id='button' onClick={() => onclickSaveEditHandler()}>수정 저장</button>
                        </div>
            </div>
        </div>
    )
}

export default EditRateForm
