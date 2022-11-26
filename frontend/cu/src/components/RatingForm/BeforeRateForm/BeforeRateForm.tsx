import React from 'react'

interface Props {
    updateState2: (arg: boolean) => void
}

function BeforeHeartRate(props: Props) {
    const onclickRateHandler = () => {
        props.updateState2(true);
      }

    return (
        <div>
            <div className='rate_box' data-testid='rate_button'>
                <button className="rate_button" onClick={() => onclickRateHandler()}>내 평가 남기러 가기</button>
            </div>
        </div>
    )
}

export default BeforeHeartRate

