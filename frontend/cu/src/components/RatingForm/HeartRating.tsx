import React, { useState } from 'react'
import "./HeartRating.css"

interface Props{
    score: number,
    updateScore: (arg: number) => void
}

function HeartRating(props: Props) {
    const [hover, setHover] = useState(0);
    const [rating, setRating] = useState(0);

    return (
        <div className="heart-rating">
            {[...Array(5)].map((heart, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={index <= ((hover && hover) || hover) ? "on" : "off"}
                        onClick={() => {setRating(index); props.updateScore(index)}}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                    >
                        <span className="heart">&#10084;</span>
                    </button>
                );
            })}
        </div>
    )
}


export default HeartRating
