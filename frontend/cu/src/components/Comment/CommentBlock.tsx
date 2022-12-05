import { ProductType } from "../../store/slices/product";
import ProductBlock from "../ProductBlock/ProductBlock";
import "./CommentBlock.css";


export interface CProps{
    comment: string,
    productBlock: ProductType,
    clickCommentBlock?: () => void

}

const CommentBlock = (props: CProps) => {  
    return (
        <div className="commentBlock" >
                <div className="productBlockComment">
                    <ProductBlock 
                    product_id={props.productBlock.id} 
                    name={props.productBlock.name} 
                    imageUrl={props.productBlock.imageUrl} 
                    details={props.productBlock.details} 
                    price={props.productBlock.price} 
                    newProduct={true} 
                    averageScore={props.productBlock.averageScore}                    
                    ></ProductBlock>   
                </div>

                <div className="commentTextBlock">
                    {props.comment}
                </div>

        </div>
    )
}


export default CommentBlock;