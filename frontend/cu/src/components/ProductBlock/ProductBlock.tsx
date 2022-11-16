import "./ProductBlock.css";


export interface Props{
    product_id: number,
    name: string,
    imageUrl: string,
    details: string,
    price: number,
    newProduct: boolean,
    averageScore: number,
    clickProduct?: () => void
}

const ProductBlock = (props: Props) => {  
    return (
        <div className="productBlock" onClick={props.clickProduct!}>
                <div className="productInfoBlock">
                    <div className="productImageBox">
                    <img className="productImage" src={props.imageUrl} alt="Product"/>
                    </div>
                    <div className="productTextBlock">
                        <p className="productName">{props.name}</p>
                        <span title="price" className="productPrice">{props.price}원</span>
                        {props.details !== "null" &&
                            <span title="detail" className='productDetail'>설명:{props.details}</span>
                        }
                        <span title="score" className='productAverageScore'>평균점수: {props.averageScore}</span>
                    </div>
                </div>
        </div>
    )
}


export default ProductBlock;