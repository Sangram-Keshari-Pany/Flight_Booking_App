import style from "./Components/flight.module.css"
import Nav from "./Components/Nav"
import { BrowserRouter,Routes,Route, useNavigate } from "react-router-dom"
import Register from "./Components/Register"
import Login from "./Components/Login"
import Filter from "./Components/Filter"
import Booking from "./Components/Booking"
import History from "./Components/History"
import Footer from "./Components/Footer"
import Logout from "./Components/Logout"
import axios from "axios"

export const convertTo12HourFormat = (timeStr) => {
    if (timeStr!=undefined){
        const [hours, minutes] = timeStr.split(':').map(Number);
        const isAM = hours < 12;
        const adjustedHours = hours % 12 || 12; // Convert 0 and 12 to 12
        const amPm = isAM ? 'AM' : 'PM';
        return `${adjustedHours}:${String(minutes).padStart(2, '0')} ${amPm}`;
    }
}

const App=()=>{
    return (
        <div id={style.body}>
            <BrowserRouter>
                <Nav></Nav>
                <Routes>
                    <Route path="/" element={<Login></Login>}></Route>
                    <Route path="/register" element={<Register></Register>}></Route>
                    <Route path="/filter" element={<Filter></Filter>} is></Route>
                    <Route path="/booking/:id" element={<Booking></Booking>}></Route>
                    <Route path="/history" element={<History></History>}></Route>
                    <Route path="logout" element={<Logout></Logout>}></Route>
                </Routes>
                <Footer></Footer>
            </BrowserRouter>
        </div>
    )
}
export default App

