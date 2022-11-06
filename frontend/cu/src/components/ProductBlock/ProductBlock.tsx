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
        <div className="debug">
            <p>[디버그] 이것은 ProductBlock입니다</p>
            <a className="productBlock" href={props.pageLink}>
                <div className="productInfoBlock">
                    <img className="productImage" src={props.imgLink} alt="Product"/>
                    <div className="productTextBlock">
                        <h4 className="productName">{props.name}</h4>
                        <p className="productPrice">{commaPrice}원</p>
                    </div>
                </div>
                
            </a>
        </div>
    )
}


export default ProductBlock;