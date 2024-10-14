import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Logout=()=>{
    let navigate=useNavigate()
    useEffect(()=>{
        // localStorage.removeItem('user')
        navigate("/")
    },[])
}
export default Logout