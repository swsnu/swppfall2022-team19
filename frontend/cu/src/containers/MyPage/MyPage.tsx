import Header from "../Header/Header"
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import product, { fetchAllProducts, fetchProduct, ProductType, selectProduct } from "../../store/slices/product";

import { fetchMyRate, fetchRates, fetchUserLikedRate, fetchUserRate, RateType, selectRate } from '../../store/slices/rate';
import { useEffect, useLayoutEffect, useState } from "react";

import SurveyModal from '../UserSurvey/SurveyModal';
import ProductBlock from "../../components/ProductBlock/ProductBlock";

import CommentBlock from "../../components/Comment/CommentBlock";

import "./MyPage.css"
import { selectUser } from "../../store/slices/User";
import Footer from "../Header/Footer";

// fix JH 1211

const MyPage = () => {

    const user_id = useParams().id

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [modalOn, setModalOn] = useState(false);

    const onOpenModal = () => {
        setModalOn(!modalOn);
    }


    const selectedUserState = useSelector(selectUser);
    const rates = useSelector(selectRate);
    const allProducts = useSelector(selectProduct);

    let myProducts: ProductType[] = []



    useLayoutEffect(() => {

        dispatch(fetchAllProducts());
        dispatch(fetchRates());
        dispatch(fetchUserLikedRate({ user_id: Number(user_id) })) // 좋아한 상품평 
        dispatch(fetchMyRate({ user_id: Number(user_id) })); // 사용자의 product

    }, [user_id])

    const [products, setProducts] = useState<ProductType[]>([]);
    const [comments, setComments] = useState<RateType[]>([]);


    if ( allProducts.products.length !== 0 && rates.likedRates.length !==0 && comments.length === 0 ){
        setComments(rates.likedRates);
    }


    if ( allProducts.products.length !== 0 && rates.rateRates.length !== 0 && products.length == 0 ) {
        for (let index = 0; index < rates.rateRates.length; index++) {
            if (!myProducts.find(product => product.id === rates.rateRates[index].product_id)) {
                const product = allProducts.products.find(product => product.id == rates.rateRates[index].product_id)!;
                myProducts.push(product);
            }
        }
        setProducts(myProducts);
    }



    const onclickCommentHandler = (comment: RateType) => {
        navigate(`/ProductDetail/${comment.product_id}`);
    }

    return (
        <div className="MyPage">
            <div className='modal'>{modalOn ? <SurveyModal setModalOn={setModalOn} /> : ''}</div>
            <Header />
            <div className='MyPageTitle'>{selectedUserState.selectedUser?.username}님의 마이페이지</div>
            <div className="ratedProducts">
                <h1>{selectedUserState.selectedUser?.username}님이 평가한 제품({products.length})</h1>

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
                {products.length === 0 && <div className='alert_no_ratedProduct'>평가한 제품이 없습니다</div>}
            </div>

            <div className="likedComments">
                <h1>{selectedUserState.selectedUser?.username}님이 좋아한 리뷰({comments.length}) </h1>
                <div className="Comments" title="Comments">
                    {comments.map(comment => (
                        <CommentBlock
                            comment={comment.comment}
                            productBlock={allProducts.products.find(product => product.id === comment.product_id)!}
                            clickCommentBlock={() => onclickCommentHandler(comment)}
                        ></CommentBlock>
                    ))}
                </div>
                {comments.length === 0 && <div className='alert_no_likedComment'>좋아요한 리뷰가 없습니다</div>}
            </div>
            <button className="modalOpenButton" onClick={onOpenModal}>사용자 정보 수정하기</button>
            <Footer></Footer>
        </div>
    )
}


export default MyPage;
