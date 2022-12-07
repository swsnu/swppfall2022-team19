
import FixedHeartRating from '../FixedHeartRate/FixedHeartRating';
import { useDispatch } from "react-redux";
import { AppDispatch } from '../../../store';
import { deleteRate, RateType } from '../../../store/slices/rate';
import { UserType } from '../../../store/slices/User';
import { ProductType } from '../../../store/slices/product';
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
                <div className='rating_box'>
                <div className='q1'>맛이 만족스럽나요? {<FixedHeartRating score={score1!} />} </div>
                <div className='q2'>가성비가 좋은가요? {<FixedHeartRating score={score2!} />}</div>
                <div className='q3'>재구매 의사가 있나요? {<FixedHeartRating score={score3!} />}</div>
                <div className='q4'>
                    {props.question4}
                    {<FixedHeartRating score={score4!} />}
                </div>
                <div className='q5'>
                    {props.question5}
                    {<FixedHeartRating score={score5!} />}
                </div>
                <div className='comment_box_after'>
                    <div className='comment_after_title'>한줄평</div>
                    <div className='comment_after'> {props.rate.comment}</div>
                </div>
                {props.rate.picture != undefined &&
                    <div className='picture'>
                        <div className='picture_first_row'>사진</div>
                        <img src={props.rate.picture} height={'180px'} width={200} />
                    </div>
                }
                <div className="buttons"> 
                    <button className='edit_button' id='button' onClick={() => onclickEditHandler()}>수정 하기</button>
                    <button className='delete_button' id='button' onClick={() => onclickDeleteHandler()}>삭제 하기</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default AfterRateForm
