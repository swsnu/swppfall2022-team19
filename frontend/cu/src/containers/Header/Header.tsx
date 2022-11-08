
import "./Header.css"
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";


const Header = () => {

    const meal = require('../../Categoryicon/meal.png');
    const snack = require('../../Categoryicon/snack.png');
    const icecream = require('../../Categoryicon/icecream.png');
    const food = require('../../Categoryicon/food.png');
    const drink = require('../../Categoryicon/drink.png');
    const search = require('../../Categoryicon/search.png')
    

    const [searchKey, setSearchKey] = useState<string>("");
    const [submitted, setSubmitted] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const clickSearchHandler = () => {
        setSubmitted(true);  
        }

        
    
    

    const categoryHandler = (categoryID : number) => {
        navigate(`/productList/${categoryID}`)    
        } 

    if(submitted) {
        return <Navigate to = "/home" />;

    } else { return(
        
        <div className = "Header"  >
        
            <div className="Category">
                <div className = "Meal" onClick={() => categoryHandler(0)} >
                    <img className = "CategoryIcon" src={meal} alt="CategoryIcon"
                    />
                    {/* <p>간편식사</p> */}
                </div>

            

            <div className = "Snacks" onClick={() => categoryHandler(1)} >
                <img className = "CategoryIcon"src={snack} alt="CategoryIcon" 
                />
                {/* <p>과자류</p> */}
            </div>

            <div className = "Icecream" onClick={() => categoryHandler(2)} >
                <img className = "CategoryIcon"src={icecream} alt="CategoryIcon"
                />
                {/* <p>아이스크림</p> */}
            </div>

            <div className = "Food" onClick={() => categoryHandler(3)} >
                <img className = "CategoryIcon"src={food} alt="CategoryIcon"
                onClick={() => categoryHandler(3)} 
                />
                {/* <p>식품</p> */}
            </div>

            <div className = "Drink" onClick={() => categoryHandler(4)} >
                <img className = "CategoryIcon"src={drink} alt="CategoryIcon"
                />
                {/* <p>음료</p> */}
            </div>
            
            </div>

            <div className = "SearchBox">
            
                <input className = "SearchInput"
                type="text"
                value={searchKey}
                onChange={(event) => setSearchKey(event.target.value)} />           
                
        

            <img className = "SearchIcon" onClick={() => clickSearchHandler()} src= {search} alt="SearchIcon" />
            {/* <button onClick={() => clickCreateHandler()}>찾아보기</button> */}


            </div>

                  

        </div>
        
    );
}
}



export default Header;