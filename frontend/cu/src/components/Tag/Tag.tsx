import "./Tag.css"

export interface TProps {
    name: string,
    click: React.MouseEventHandler<HTMLDivElement>;
}

export const Tag = (props: TProps) => {

    return (
        <div onClick={props.click}>
        <button className="custom-btn btn">
        <span>Click!</span>
        <span>{props.name}</span>
        </button>
        </div>
    )

}