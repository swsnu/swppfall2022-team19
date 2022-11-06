import "./TotalScore.css"

interface IProps{
    title: string;
    score: number;
}

export default function TotalScore(props: IProps){
    return (
        <article className ='TotalScore'>
            <div className = "totalScoreTitle"> {props.title}</div>
            <div className = "totalScoreScore"> {props.score}</div>         
        </article>
    );
};