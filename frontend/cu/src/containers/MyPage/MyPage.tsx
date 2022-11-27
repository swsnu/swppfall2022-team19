import Header from "../Header/Header"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { ProductType, selectProduct } from "../../store/slices/product";
import { fetchRates, fetchUserRate, selectRate } from '../../store/slices/rate';
import { useEffect } from "react";
import { useState } from "react";
import makeAnimated from 'react-select/animated';
import SurveyModal from '../UserSurvey/SurveyModal';
import { selectUser } from "../../store/slices/User";
import ProductBlock from "../../components/ProductBlock/ProductBlock";
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router';

import "./MyPage.css"


const MyPage = () => {

    const user_id = useParams().id

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [modalOn, setModalOn] = useState(false);

    

    useEffect( ()=>{
        dispatch(fetchUserRate({user_id : Number(user_id) }));
    }, [user_id])

    const rates = useSelector(selectRate).selectedRates; 

    const allProducts = useSelector(selectProduct);


    let products: ProductType[] = [];
    for (let index = 0; index < rates.length; index++) {
        const product = allProducts.products.find(product => product.id == rates[index].product_id)!;
        
        products.push(product);
    }


    const logo = require('../../Categoryicon/Logo.png');

    console.log(rates);


    const onOpenModal = () => {
        setModalOn(!modalOn);
    }


    return (
        <div className="MyPage">
            <Header />
            <button className="modalOpenButton" onClick={onOpenModal}>사용자 정보 수정하기</button> {
                modalOn ? <SurveyModal /> : ''
            }

        <div className = "ratedProducts">
            <h1>내가 평가한 제품들</h1>

        <div className= "productBlocks">
            {products.map(product => (
                    <div key={product.id}>
                        <ProductBlock
                            product_id = {product.id}
                            name = {product.name}
                            imageUrl = {product.imageUrl}
                            details= {product.details}
                            price = {product.price}
                            newProduct = {product.newProduct}
                            averageScore = {product.averageScore}
                            clickProduct ={() => navigate(`/ProductDetail/${product.id}`)}
                        />
                        </div>
                ))}


        </div>

        </div>

        </div>
    )
}


export default MyPage;


