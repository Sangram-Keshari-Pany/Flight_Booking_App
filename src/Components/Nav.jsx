import { Link } from "react-router-dom"
import style from "./flight.module.css"
import logo from "../images/image (4).png"
import flag from "../images/download (4).png"
import { useEffect, useState } from "react"

let user
let username
try{
    user=JSON.parse(localStorage.getItem("user"))
    username=user.useranme
}
catch{
    username="Anonymous"
}

const Nav=()=>{
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(new Date());
        }, 1000); 
        return () => {
            clearInterval(timerId);
        };
    }, []);
    const options = {hour: '2-digit',minute: '2-digit',second: '2-digit',hour12: true};
    const options2={year:'numeric',month:'numeric',day:'numeric',}
    return(
        <div id={style.nav}>
            <div id={style.navdiv1}>
                <img height={"40px"} width={"70px"} src={flag} alt="" />
                <small style={{fontSize:"10px"}}>{username}</small>
            </div>
            <div id={style.navdiv2}>
                <Link to="/filter">HOME<i class="fa-solid fa-plane-up"></i></Link>
                {/* <Link to="/booking/1">BOOKING<i class="fa-solid fa-ticket"></i></Link> */}
                <Link to="/history">TICKETS<i class="fa-solid fa-rectangle-list"></i></Link>  
            </div>
            <div id={style.navdiv3}>
                <div>
                   <img height={"60px"} width={"60px"} src={logo} alt="" />
                </div>
                <div>
                    <h1>{time.toLocaleTimeString('en-US', options)}</h1>
                    <h1 style={{color:"orange"}}>{time.toLocaleDateString('en-US', options2)}</h1>
                </div>
            </div>           
            <div id={style.navdiv4}>
                <Link to="logout">LOGOUT<i class="fa-solid fa-right-from-bracket"></i></Link>
            </div>
        </div>
    )
}
export default Nav