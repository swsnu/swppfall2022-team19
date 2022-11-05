import React from 'react'
import CircleRate from './CircleRating'

type Props = {
    user_id: number,
    product_id: number, 
    score: number[],
    clickSubmit?: React.MouseEventHandler<HTMLButtonElement>,
    clickCancel?: React.MouseEventHandler<HTMLButtonElement>
}


function RatingForm(props: Props) {
  return (
    <div>
        
        {<CircleRate/>}
    </div>
  )
}

export default RatingForm
