import { Link, useNavigate } from "react-router-dom"
import style from "./flight.module.css"
import { useState } from "react"
import axios from "axios"


const Login=()=>{
    let[username,Setusername]=useState("")
    let[password,Setpassword]=useState("")
    let navigate=useNavigate()

   async function login (e){
        e.preventDefault()
        let data={username:username,password:password}
        try{
            let response=await axios.post(`http://127.0.0.1:8000/user/login`,data)
            const user=response.data
            console.log(response.data);
            localStorage.setItem('user',JSON.stringify(user.user))
            navigate('/filter')
        }
        catch{
            alert("invalid cridentials")
        }
        
    }
    return(
        <div id={style.login}>
            <div>
                <form action="">
                    <h1>LogIn</h1>
                    <br />
                    <label htmlFor=""><strong>Email</strong> <br />
                        <input type="email" onChange={(e)=>{Setusername(e.target.value)}} placeholder="Enter Your Email" />
                    </label>
                    <label htmlFor=""><strong>Password</strong> <br />
                        <input type="password" onChange={(e)=>{Setpassword(e.target.value)}}  placeholder="Enter Your password"/>
                    </label>
                    <br />
                    <button onClick={login}>Login</button>
                    <p>I have no account <Link to="/register"> Register</Link></p>
                </form>

            </div>
        </div>
    )
}
export default Login