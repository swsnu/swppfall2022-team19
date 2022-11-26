import React, { useState, useEffect } from 'react';
import "./RatingLayout.css"
import subCategoryQuestion from "../../Questionnaires/subCategoryQuestion.json"
import { RateType} from '../../store/slices/rate';
import { UserType } from '../../store/slices/User';
import { ProductType, } from '../../store/slices/product';
import BeforeRateForm from './BeforeRateForm/BeforeRateForm';
import CreateRateForm from './CreateRateForm/CreateRateForm';
import AfterRateForm from './AfterRateForm/AfterRateForm';
import EditRateForm from './EditRateForm/EditRateForm';

interface Props {
    user: UserType,
    product: ProductType,
    rate: RateType[]
}


function RatingLayout(props: Props) {

    const [rateState1, setRateState1] = useState<boolean>(false); //true if user has rated product
    const [rateState2, setRateState2] = useState<boolean>(false);

    const [question4, setQuestion4] = useState("만족하시나요?");
    const [question5, setQuestion5] = useState("추천하시나요?");
    const [rate, setRate] = useState<RateType>();
    const [totalRateNum, setTotalRateNum] = useState<number>(0);

    //whenever there is change in product, find the appropriate question by subCategory
    //(O)user있고, product 있을때, fetchRates() 잘 작동한다. 
    useEffect(() => {
        console.log("subcategoryName:" + props.product?.name + " id: " + props.product?.id);
        console.log("username " + props.user?.username!)

        const filterRate = props.rate.filter((rate) => rate.product_id === props.product.id!);
        setTotalRateNum(filterRate.length);
        const singleRate = filterRate.find((rate) => rate.user_id === props.user?.id!);

        setRate(singleRate);
        console.log(singleRate?.username)
        if (singleRate === undefined) {
            setRateState1(false);
            setRateState2(false);
        }
        else {
            setRateState1(true);
            setRateState2(true);
        }

        for (const key in Object.keys(subCategoryQuestion)) {
            if (props.product.subCategory.includes(subCategoryQuestion[key].subCategory)) {
                setQuestion4(subCategoryQuestion[key].question4);
                setQuestion5(subCategoryQuestion[key].question5);
            }
        }
    }, [props.product])

    const updateRateState2 = (state: boolean): void => {
        setRateState2(state)
    }
    const updateRateState1 = (state: boolean): void => {
        setRateState1(state)
    }

    return (
        <div>
            <div className='rating_form'>
                {rateState1 === false && rateState2 === false && <BeforeRateForm updateState2={updateRateState2} />}
                {rateState1 === false && rateState2 === true && <CreateRateForm user={props.user} product={props.product}
                    question4={question4} question5={question5}
                    updateState1={updateRateState1} updateState2={updateRateState2} />
                }
                {rateState1 === true && rateState2 === true && rate && <AfterRateForm user={props.user} product={props.product}
                    rate={rate} question4={question4} question5={question5}
                    updateState1={updateRateState1} updateState2={updateRateState2} />}
                {rateState1 === true && rateState2 === false && rate && <EditRateForm user={props.user} product={props.product}
                    rate={rate} question4={question4} question5={question5}
                    updateState1={updateRateState1} updateState2={updateRateState2} />}

            </div>
        </div>
    )
}

export default RatingLayout
