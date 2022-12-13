
import "./Footer.css"
import { useNavigate } from 'react-router';

const Footer = () => {

    const navigate = useNavigate();

    return (
        <div className = "footer">
            
        South Korea | 
        
        <button className = "footerButton" onClick={()=>window.open("https://github.com/swsnu/swppfall2022-team19")}> SWPPTEAM19 </button> | 
        <button className = "footerButton" onClick={()=>navigate("/home")}> LETMECU </button> | 
        <button className = "footerButton" onClick={()=>window.open("https://cu.bgfretail.com/index.do")}> NicetoCU </button>
            
        </div>


    )

}

export default Footer;