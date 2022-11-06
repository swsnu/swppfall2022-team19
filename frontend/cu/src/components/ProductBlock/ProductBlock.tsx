import React from 'react';
import "./ProductBlock.css";

interface Props {
    pageLink: string;
    imgLink: string;
    name: string;
    price: number;
}

const ProductBlock = (props: Props) => {
    let commaPrice = props.price.toLocaleString('ko-KR');
    
    return (
        <div className="productBlock">
            <a className="productA" href={props.pageLink}>
                <div className="productInfoBlock">
                    <div className="productImageBox">
                    <img className="productImage" src={props.imgLink} alt="Product"/>
                    </div>
                    <div className="productTextBlock">
                        <p className="productName">{props.name}</p>
                        <span className="productPrice">{commaPrice}원</span>
                    </div>
                </div>
                
            </a>
        </div>
    )
}


export default ProductBlock;