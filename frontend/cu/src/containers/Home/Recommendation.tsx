import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductBlock from "../../components/ProductBlock/ProductBlock";
import { AppDispatch } from "../../store";
import product, { ProductType, selectProduct } from "../../store/slices/product";
import { useNavigate } from 'react-router';
import { selectUser, UserType } from '../../store/slices/User';
import rate, { addUserRate, fetchUserRate,  selectRate } from '../../store/slices/rate';



function Recommendation() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const selectedUser = useSelector(selectUser).selectedUser
    const allUsers = useSelector(selectUser).users

    const [recommendedProducts, setRecommendedProduct] = useState<ProductType[]>([]);

    let recommendedUsers: UserType[] = [];


    useEffect(() => {

        allUsers.forEach(element => {
            if (selectedUser && (element.id != selectedUser.id)) {
                recommendedUsers.push(element);
            }
        });

        while (true) {

            let commonUser = selectedUser && recommendedUsers.filter(user => user.gender === selectedUser.gender)
            if (commonUser && commonUser.length > 1 ) {
                recommendedUsers = commonUser

                commonUser = selectedUser && recommendedUsers.filter(user => user.age === selectedUser.age)
                if (commonUser && commonUser.length > 1 ) {
                    recommendedUsers = commonUser
    
                    commonUser = selectedUser && recommendedUsers.filter(user => user.question === selectedUser.question)
                    if (commonUser && commonUser.length > 1 ) {
                        recommendedUsers = commonUser
    
                        commonUser = selectedUser && recommendedUsers.filter(user => user.taste === selectedUser.taste)
                        if (commonUser && commonUser.length > 1) {
                            recommendedUsers = commonUser // 4 match
                            break;
                        } else break;
                    } else break;
                } else break;
            } else break;
        }

        for (let index = 0; index < recommendedUsers.length; index++) {
            if (index == 0) {
                dispatch(fetchUserRate({ user_id: recommendedUsers[index].id }))
            }
            else {
                dispatch(addUserRate({ user_id: recommendedUsers[index].id }))
            }
        }

    }, [selectedUser] // for refresh
    )

    useEffect(() => {

        allUsers.forEach(element => {
            if (selectedUser && (element.id != selectedUser.id)) {
                recommendedUsers.push(element);
            }
        });

        while (true) {

            let commonUser = selectedUser && recommendedUsers.filter(user => user.gender === selectedUser.gender)
            if (commonUser && commonUser.length > 1 ) {
                recommendedUsers = commonUser

                commonUser = selectedUser && recommendedUsers.filter(user => user.age === selectedUser.age)
                if (commonUser && commonUser.length > 1 ) {
                    recommendedUsers = commonUser
    
                    commonUser = selectedUser && recommendedUsers.filter(user => user.question === selectedUser.question)
                    if (commonUser && commonUser.length > 1 ) {
                        recommendedUsers = commonUser
    
                        commonUser = selectedUser && recommendedUsers.filter(user => user.taste === selectedUser.taste)
                        if (commonUser && commonUser.length > 1) {
                            recommendedUsers = commonUser // 4 match
                            break;
                        } else break;
                    } else break;
                } else break;
            } else break;
        }

        for (let index = 0; index < recommendedUsers.length; index++) {
            if (index == 0) {
                dispatch(fetchUserRate({ user_id: recommendedUsers[index].id }))
            }
            else {
                dispatch(addUserRate({ user_id: recommendedUsers[index].id }))
            }
        }

    }, []
    ) // for user data changed



    const rates = useSelector(selectRate)

    let products: ProductType[] = [];
    const allProducts = useSelector(selectProduct)
    let randomProducts: ProductType[] = [];


if(rates.selectedRates && allProducts.products ) {
    for (let index = 0; index < rates.selectedRates.length; index++) {
        const product = allProducts.products.find(product => product.id == rates.selectedRates[index].product_id);
        if (product && products.find(org => org.id == product.id)) continue;
        product && products.push(product)
    }

    if (products.length > 6 && !recommendedProducts[0]){
        while(randomProducts.length < 4 ) {
            const product = products[Math.floor((Math.random() * (products.length-1) ))];
            if (product && !randomProducts.find(org => org.id == product.id)) 
                randomProducts.push(product)
        }
        
        setRecommendedProduct([...randomProducts]);
    }

    else {
        while ( products.length < 4 && !recommendedProducts[0]) {            
        products.push(allProducts.products[Math.floor((Math.random() * 78))])
        if(products.length==4 && recommendedProducts.length < 4){
            setRecommendedProduct([...products]);
            }
        }
    }
}


    if (!recommendedProducts[0] && 
        (((products.length > 6) && randomProducts[0]) || ((products.length <= 6) && (products[0]))) ){
        if (products.length > 6)
            setRecommendedProduct([...randomProducts])
        else setRecommendedProduct([...products])
        
    }


    const onclickProductHandler = (product: ProductType) => {
        navigate(`/ProductDetail/${product.id}`)
    }



    return (
        <div className="RecommendationPage">

            <div className="productBlocks4">
                {recommendedProducts[0] && allProducts.products[0] && 
                 recommendedProducts.map(product => (
                    <div key={product.id}>
                        <ProductBlock
                            product_id={product.id}
                            name={product.name}
                            imageUrl={product.imageUrl}
                            details={product.details}
                            price={product.price}
                            newProduct={product.newProduct}
                            rateCount ={product.rateCount}
                            averageScore={product.averageScore}
                            clickProduct={() => onclickProductHandler(product)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

}

export default Recommendation;