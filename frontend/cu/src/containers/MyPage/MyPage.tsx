import Header from "../Header/Header"
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import product, { ProductType, selectProduct } from "../../store/slices/product";

import { fetchRates, fetchUserLikedRate, fetchUserRate, RateType, selectRate } from '../../store/slices/rate';
import { useEffect, useState } from "react";

import SurveyModal from '../UserSurvey/SurveyModal';
import ProductBlock from "../../components/ProductBlock/ProductBlock";

import CommentBlock from "../../components/Comment/CommentBlock";

import "./MyPage.css"
import { selectUser } from "../../store/slices/User";

const MyPage = () => {

    const user_id = useParams().id

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [modalOn, setModalOn] = useState(false);
    const selectedUserState = useSelector(selectUser);


    useEffect(() => {
        dispatch(fetchUserRate({ user_id: Number(user_id) }));
        dispatch(fetchUserLikedRate({ user_id: Number(user_id) }))

        return () => {
            dispatch(fetchRates())
        }

    }, [user_id])

    const rates = useSelector(selectRate);

    const allProducts = useSelector(selectProduct);


    let products: ProductType[] = [];

    if (rates.selectedRates != undefined) {

        for (let index = 0; index < rates.selectedRates.length; index++) {
            if (!products.find(product => product.id === rates.selectedRates[index].product_id)) {
                const product = allProducts.products.find(product => product.id == rates.selectedRates[index].product_id)!;
                products.push(product);
            }
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
            <div className='modal'>{modalOn ? <SurveyModal setModalOn={setModalOn} /> : ''}</div>
            {/* <Header /> */}
            <div className='MyPageTitle'>{selectedUserState.selectedUser?.username}?????? ???????????????</div>
            <div className="ratedProducts">
                <h1>{selectedUserState.selectedUser?.username}?????? ????????? ??????({products.length})</h1>

                <div className="productBlocks_myPage">
                    {products.map(product => (
                        <div key={product.id}>
                            <ProductBlock
                                product_id={product.id}
                                name={product.name}
                                imageUrl={product.imageUrl}
                                details={product.details}
                                price={product.price}
                                newProduct={product.newProduct}
                                averageScore={product.averageScore}
                                rateCount={product.rateCount}
                                clickProduct={() => navigate(`/ProductDetail/${product.id}`)}
                            />
                        </div>
                    ))}
                </div>
                {products.length === 0 && <div className='alert_no_ratedProduct'>????????? ????????? ????????????</div>}
            </div>

            <div className="likedComments">
                <h1>{selectedUserState.selectedUser?.username}?????? ????????? ??????({comments.length}) </h1>
                <div className="Comments" title="Comments">
                    {comments.map(comment => (
                        <CommentBlock
                            comment={comment.comment}
                            productBlock={allProducts.products.find(product => product.id === comment.product_id)!}
                            clickCommentBlock={() => onclickCommentHandler(comment)}
                        ></CommentBlock>
                    ))}
                </div>
                {comments.length === 0 && <div className='alert_no_likedComment'>???????????? ????????? ????????????</div>}
            </div>
            <button className="modalOpenButton" onClick={onOpenModal}>????????? ?????? ????????????</button>
        </div>
    )
}


export default MyPage;

