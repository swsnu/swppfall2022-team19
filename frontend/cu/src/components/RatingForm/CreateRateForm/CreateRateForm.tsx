import { useState } from 'react';
import HeartRating from '../HeartRate/HeartRating'
import { useDispatch } from "react-redux";
import { AppDispatch } from '../../../store';
import { createRate, fetchRates } from '../../../store/slices/rate';
import { UserType } from '../../../store/slices/User';
import { fetchProduct, ProductType } from '../../../store/slices/product';
import "../RatingLayout.css"

interface Props {
    user: UserType,
    product: ProductType,
    question4: string,
    question5: string,
    updateState1: (arg: boolean) => void,
    updateState2: (arg: boolean) => void
}

function CreateRateForm(props: Props) {

    const dispatch = useDispatch<AppDispatch>();
    const [score1, setScore1] = useState(0);
    const [score2, setScore2] = useState(0);
    const [score3, setScore3] = useState(0);
    const [score4, setScore4] = useState(0);
    const [score5, setScore5] = useState(0);
    const [comment, setComment] = useState("");
    const [image, setImage] = useState<File | null>(null);


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


    // -----when user click 평가하러가기 button------------state: rateState1 = false, rateState2 = true
    const onclickBackToRateHandler = () => {
        props.updateState2(false);
    }

    const onclickDeleteImageHandler = () => {
        setImage(null);
    }

    const onclickSaveHandler = async () => {

        const scores = "" + score1 + score2 + score3 + score4 + score5;
        const formData = new FormData()
        formData.append('user_id', String(props.user?.id!))
        formData.append('product_id', String(props.product.id!))
        formData.append('scores', scores)
        formData.append('comment', comment)
        if (image) {
            formData.append('picture', image);
        }

        const responseRate = await dispatch(createRate(formData))
        if (responseRate.type === `${createRate.typePrefix}/fulfilled`) {
            console.log('post succeeded')
            props.updateState1(true);
            props.updateState2(true);
        }
        dispatch(fetchProduct(props.product.id))
        dispatch(fetchRates())
    }


    return (
        <div>
            <h2 className="rating_heading"> 리뷰 작성하기</h2>
            <div className='rating_box'>
                <div className='q1'> 맛 만족도 {<HeartRating score={score1} updateScore={updateScore1} />} </div>
                <div className='q2'> 가성비 {<HeartRating score={score2} updateScore={updateScore2} />}</div>
                <div className='q3'>재구매 의사 {<HeartRating score={score3} updateScore={updateScore3} />}</div>
                <div className='q4'> 
                    {props.question4}
                    {<HeartRating score={score4} updateScore={updateScore4} />}
                </div>
                <div className='q5'>
                    {props.question5}
                    {<HeartRating score={score5} updateScore={updateScore5} />}
                </div>
                <div className="comment">
                    <div>한줄 평가를 남겨주세요 </div>
                    <input className="comment_box" value={comment} onChange={(event) => setComment(event.target.value)} />
                </div>
                <div className='picture'>
                    <div className='picture_first_row'>
                    사진 첨부
                    <button className='image_delete_button' onClick={() => onclickDeleteImageHandler()}>사진 삭제</button>
                    </div>
                    <div className ='image_input'>
                    {image && (<img alt='Image Not Found' height={'180px'} width={'200px'} src={URL.createObjectURL(image)} />)}
                    <input
                        type='file'
                        accept="image/*"
                        onChange={(event) => {
                            if (event.target?.files) {
                                setImage(event.target?.files[0])
                            }
                        }}
                    />   
                    </div>
                </div> 
                <div className="buttons">              
                    <button className="create_cancel_button" onClick={() => onclickBackToRateHandler()}>취소 하기</button>
                    <button className="create_button" onClick={() => onclickSaveHandler()}>등록 하기</button>
                </div>
            </div>
        </div>
    )
}

export default CreateRateForm