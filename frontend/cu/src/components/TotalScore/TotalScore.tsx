import "./TotalScore.css"

interface IProps{
    title: string;
    score: number;
}

export default function TotalScore(props: IProps){
    return (
        <article className ='TotalScore'>
            <div className = "totalScoreTitle"> {props.title}</div>
            <div className = "totalScoreScore"> 
                {props.score ===5? '⭐⭐⭐⭐⭐': props.score===4?'⭐⭐⭐⭐':props.score===3?'⭐⭐⭐': props.score===2?'⭐⭐': props.score===1?'⭐':''}        
            </div>         
        </article>
    );
};