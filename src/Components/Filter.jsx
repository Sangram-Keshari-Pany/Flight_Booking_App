import { useEffect, useState } from "react"
import style from "./flight.module.css"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { convertTo12HourFormat } from "../App";
import { API } from "../App";

const user=JSON.parse(localStorage.getItem("user"))
const flightapi=axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.access}`
    },
    })

    
const Filter=()=>{
    let [flights,Setflights]=useState([])
    let [from,Setfrom]=useState("")
    let [to,Setto]=useState("")
    let [date,Setdate]=useState("")
    let [age,Setage]=useState("")
    let [people,Setpeople]=useState(0)
    let [apidata,Setapidata]=useState([])
    const [minDate, setMinDate] = useState();


    useEffect(()=>{
        flightapi.get("/flightapi")
        .then((response)=>{Setflights(response.data)})
        .catch(()=>{console.log("frtch flight error in filter.jsx")})
        const today = new Date().toISOString().split('T')[0];
        setMinDate(today);
    },[])
    
    function search(e){ 
        e.preventDefault();
        if (from !== "" && to !== ""){
            const data={from:from,to:to,date,date}
            flightapi.post("/flightapi",data)
            .then((response)=>{Setflights(response.data)})
            .catch(()=>{"search flights error in filter.jsx"})
        }
    }
    
    return(
        <div id={style.filter}>
            <div id={style.section1}>
                <h1>SEARCH FOR FLIGHT</h1>
                <form action="">
                    <div>
                        <label htmlFor="form">From</label>
                        <label htmlFor="password">To</label>
                    </div>
                    <div>
                        <input type="text" name="from" id="form" placeholder="From" onChange={(e)=>{Setfrom(e.target.value)}} required/>
                        <input type="text" name="password" id="password" placeholder="To" onChange={(e)=>{Setto(e.target.value)}} required/>
                    </div>
                    <div>
                        <input type="date" name="date" min={minDate} onChange={(e)=>{Setdate(e.target.value)}} />
                        <select name="" id="" onChange={(e)=>{Setage(e.target.value)}}>
                            <option value="ADULT">ADULT</option>
                            <option value="CHILD">CHILD</option>
                            <option value="AGED">AGED</option>
                        </select>
                        <select name="" id="" onChange={(e)=>{Setpeople(e.target.value)}}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>

                        </select>
                    </div>
                    <section id={style.button}>
                        <button onClick={search}>SEARCH</button>
                    </section>
                </form>
            </div>
            <div id={style.section2}>
                <div> 
                    <div>
                        <div>
                            <lable>FROM</lable>
                            <lable>TO</lable>
                        </div>
                        <div>
                            <lable>DATE</lable>
                            <lable>PRICE</lable>
                            <lable>AIRLINE</lable>
                        </div>
                    </div>
                    {flights.map((flight)=>{
                        return(
                        <Link to={`/booking/${flight.id}`} key={flight.id}>
                            <div style={{border:`1px dashed ${flight.color}`}} id={style.flight}>
                                <div id={style.flightdetails}>
                                    <span id={style.span1}>
                                        <div style={{color:"rgba(255, 136, 0, 0.879)"}}>
                                            <strong>{flight.depreture_city}</strong>
                                            <strong>{flight.destination_city}</strong>
                                        </div>
                                        <div style={{color:"rgba(255, 0, 0, 0.879)"}}>
                                            <strong>{convertTo12HourFormat(flight.deprature_time)}</strong>
                                            <strong>{convertTo12HourFormat(flight.arival_time)}</strong>
                                        </div>
                                    </span>
                                    <span id={style.span2}>
                                        <div style={{color:"yellow"}}>{flight.day}</div>
                                    </span>
                                    <span id={style.span2}>
                                        <div style={{color:"rgb(2, 255, 2)"}}>Price:-{flight.price}</div>
                                    </span>
                                    <span id={style.span3}>
                                        <h3 style={{color:flight.color}}>{flight.airline}</h3>
                                    </span>
                                </div>
                                <div id={style.flightsheet}>
                                    <span>Economic <strong>AVL{flight.economy}</strong></span>
                                    <span>Business <strong>AVL{flight.business}</strong></span>
                                    <span>First Class <strong>AVL{flight.fast_class}</strong></span>
                                </div>
                            </div>
                        </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default Filter