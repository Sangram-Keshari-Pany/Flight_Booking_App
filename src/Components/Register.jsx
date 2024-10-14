import { Link, useNavigate } from "react-router-dom"
import style from "./flight.module.css"
import { useState } from "react"
import axios from "axios"

const Register=()=>{
    let [email,Setemail]=useState("")
    let [password,Setpassword]=useState("")
    let [conf_password,Setconf_password]=useState("")
    let navigate=useNavigate()

    function register (e){
        e.preventDefault()
        if (password===conf_password){
            let data={username:email,email:email,password:password}
            axios.post('http://127.0.0.1:8000/user/registration',data)
            .then(()=>{navigate("/")})
            .catch(()=>{alert("user already present")})
        }
        else{alert("ivalid cridentials")}
    }

    return(
        <div id={style.login}>
            <div>
                <form action="">
                    <h1>Register</h1>
                    <br />
                    <label htmlFor=""><strong>Email</strong> <br />
                        <input type="email" onChange={(e)=>{Setemail(e.target.value)}} placeholder="Enter Your Email" />
                    </label>
                    <br />
                    <label htmlFor=""><strong>Password</strong> <br />
                        <input type="password" onChange={(e)=>{Setpassword(e.target.value)}} placeholder="Enter Your password" />
                    </label>
                    <br />
                    <label htmlFor=""><strong>Confirm Password</strong> <br />
                        <input type="password" onChange={(e)=>{Setconf_password(e.target.value)}} placeholder="REenter Your password"/>
                    </label>
                    <br />
                    <button onClick={register}>Register</button>
                    <br />
                    <p>Already Have a account <Link to="/">LogIn</Link></p>
                </form>
            </div>
        </div>
    )
}
export default Register