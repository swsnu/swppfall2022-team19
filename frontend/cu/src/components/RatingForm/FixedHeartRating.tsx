import "./FixedHeartRating.css"

interface Props{
    score: number
}

function FixedHeartRating(props: Props) {
    return (
        <div className="heart-rating">
            {[...Array(5)].map((heart, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={index <= props.score ? "on" : "off"}
                    >
                        <span className="heart">&#10084;</span>
                    </button>
                );
            })}
        </div>
    )
}


export default FixedHeartRating
