import React, { Component } from 'react';
import "./ProductBlock.css";

type Props = {
    pageLink: string;
    imgLink: string;
    name: string;
    price: number;
}

const ProductBlock = (props: Props) => {
    let commaPrice = props.price.toLocaleString('ko-KR');
    
    return (
        <a className="productBlock" href={props.pageLink}>
            <div className="productInfoBlock">
                <img className="productImage" src={props.imgLink} alt="Product Image"/>
                <div className="productTextBlock">
                    <h4 className="productName">{props.name}</h4>
                    <p className="productPrice">{commaPrice}원</p>
                </div>
                <div className="tag">
                    
                </div>
            
            </div>
            
        </a>
    )
}


export default ProductBlock;