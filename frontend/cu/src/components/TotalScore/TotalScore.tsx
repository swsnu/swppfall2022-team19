import "./TotalScore.css"

interface IProps{
    title: string;
    score: number;
}

export default function TotalScore(props: IProps){
    return (
        <article className ='TotalScore'>
            <div className = "scores"> {props.title} {props.score}</div>            
        </article>
    );
};