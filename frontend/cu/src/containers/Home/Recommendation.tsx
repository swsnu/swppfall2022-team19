import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductBlock from "../../components/ProductBlock/ProductBlock";
import { AppDispatch } from "../../store";
import { fetchQueryProducts, fetchSearchProducts, ProductType, selectProduct } from "../../store/slices/product";
import { useNavigate } from 'react-router';
import { selectUser, UserType } from '../../store/slices/User';
import { addUserRate, fetchUserRate, selectRate } from '../../store/slices/rate';


// user info
// user info with same user info (up to 5)
// fetch them all and randomize
// age, taste, gender, question 

// select one user among them and show rated products.





function Recommendation() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const selectedUser = useSelector(selectUser).selectedUser
    console.log("selectedUser ", selectedUser)
    const allUsers = useSelector(selectUser).users

    let recommendedUsers: UserType[] = [];

    allUsers.forEach(element => {
        if (selectedUser && (element.id != selectedUser.id)) {
            recommendedUsers.push(element);
        }
    });

    useEffect(() => {

        allUsers.forEach(element => {
            if (selectedUser && (element.id != selectedUser.id)) {
                recommendedUsers.push(element);
            }
        });


        while (true) {

            console.log("allUser: ", recommendedUsers)
            let commonUser = selectedUser && recommendedUsers.filter(user => user.gender === selectedUser.gender)

            if (commonUser && commonUser.length != 0) {
                recommendedUsers = commonUser
                console.log("gender: ", commonUser)
                commonUser = selectedUser && recommendedUsers.filter(user => user.age === selectedUser.age)
                if (commonUser && commonUser.length != 0) {
                    recommendedUsers = commonUser
                    console.log("age: ", commonUser)
                    commonUser = selectedUser && recommendedUsers.filter(user => user.question === selectedUser.question)
                    if (commonUser && commonUser.length != 0) {
                        recommendedUsers = commonUser
                        console.log("question: ", commonUser)
                        commonUser = selectedUser && recommendedUsers.filter(user => user.taste === selectedUser.taste)
                        if (commonUser && commonUser.length != 0) {
                            recommendedUsers = commonUser // 4 match
                            console.log("taste: ", commonUser)
                            break;
                        } else break;
                    } else break;
                } else break;
            } else break;

        }

        // const showUser: number = Math.floor(Math.random() * recommendedUsers.length)
        // if (recommendedUsers[showUser]){
        // // recommendedUsers[(showUser * recommendedUsers.length)] &&
        // console.log("new fetch User")
        //  dispatch(fetchUserRate({user_id: recommendedUsers[showUser].id}))
        // }




        for (let index = 0; index < recommendedUsers.length; index++) {
            if (index == 0) {
                dispatch(fetchUserRate({ user_id: recommendedUsers[index].id }))
            }
            else {
                dispatch(addUserRate({ user_id: recommendedUsers[index].id }))
            }
        }

        console.log("Recommendation UseEffect")
    }, [selectedUser]
    )


    const rates = useSelector(selectRate)

    let products: ProductType[] = [];
    const allProducts = useSelector(selectProduct)

    console.log("selectedRates.length: ", rates.selectedRates.length)



    for (let index = 0; index < rates.selectedRates.length; index++) {

        const product = allProducts.products.find(product => product.id == rates.selectedRates[index].product_id);

        if (product && products.find(org => org.id == product.id)) continue;

        product && products.push(product)

        if (products.length == 4) break;
    }






    const onclickProductHandler = (product: ProductType) => {
        navigate(`/ProductDetail/${product.id}`)
    }



    return (
        <div className="RecommendationPage">

            <div className="productBlocks4">
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
                            clickProduct={() => onclickProductHandler(product)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

}

export default Recommendation;