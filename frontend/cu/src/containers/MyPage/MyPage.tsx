import Header from "../Header/Header"
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { ProductType, selectProduct } from "../../store/slices/product";

import { fetchRates, fetchUserLikedRate, fetchUserRate, RateType, selectRate } from '../../store/slices/rate';
import { useEffect, useState } from "react";

import SurveyModal from '../UserSurvey/SurveyModal';
import ProductBlock from "../../components/ProductBlock/ProductBlock";

import CommentBlock from "../../components/Comment/CommentBlock";





import "./MyPage.css"



const MyPage = () => {

    const user_id = useParams().id

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [modalOn, setModalOn] = useState(false);
    const selectedUserState = useSelector(selectUser);


    useEffect(()=>{
        dispatch(fetchUserRate({user_id : Number(user_id) }));
        dispatch(fetchUserLikedRate({user_id: Number(user_id)}))

        return () => {
            dispatch(fetchRates())
        }

    }, [user_id])

    const rates = useSelector(selectRate);

    const allProducts = useSelector(selectProduct);


    let products: ProductType[] = [];

    if (rates.selectedRates != undefined) {

    for (let index = 0; index < rates.selectedRates.length; index++) {
        if (!products.find(product => product.id === rates.selectedRates[index].product_id)){
            const product = allProducts.products.find(product => product.id == rates.selectedRates[index].product_id)!;
            products.push(product);
        }
    }

    const comments: RateType[] = rates.likedRates
    
    const onOpenModal = () => {
        setModalOn(!modalOn);
    }


    const onclickCommentHandler = (comment: RateType) => {
        navigate(`/ProductDetail/${comment.product_id}`);
    }

    return (
        <div className="MyPage">
            <Header />
            <button className="modalOpenButton" onClick={onOpenModal}>사용자 정보 수정하기</button> {
                modalOn ? <SurveyModal setModalOn={setModalOn} /> : ''
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

        <div className = "Comments">
                <h1> 내가 좋아한 댓글 </h1>
                <div className = "Comments" > 
                {comments.map(comment => (
                    <CommentBlock 
                    comment={comment.comment}
                    productBlock={allProducts.products.find(product => product.id == comment.product_id)!}                        
                    clickCommentBlock = { () => onclickCommentHandler(comment) }
                    ></CommentBlock>
                ))}
                </div>
             </div>


        </div>
    )
}


export default MyPage;

