import axios from "axios"
import { useEffect, useState } from "react"
import style from "./flight.module.css"
import { useNavigate, useParams } from "react-router-dom"
import { convertTo12HourFormat } from "../App"

const user=JSON.parse(localStorage.getItem("user"))
const flightapi=axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.access}`
    },
    })
    
const Booking=()=>{
    let[name,Setname]=useState("")
    let[age,Setage]=useState("")
    let[sheet,Setsheet]=useState("")
    let[gender,Setgender]=useState("")
    let[refresh1,Setrefresh1]=useState(false)
    let[price,Setprice]=useState(0)
    let apiid=useParams()
    let navigate=useNavigate()

    let [flight,Setflight]=useState([])
    let [tickets,Settickets]=useState([])


    // PREVIOUS TICKET REMOVED //
    useEffect(()=>{
        flightapi.delete("/booking-history")
        .then(()=>{console.log("deleted sucessfully");})
        .catch(()=>{console.log("delete error");})
    },[])

    async function ApiLoading(){
        // FLIGHT FETCHING//
        try{
            const response1=await flightapi.get(`/flightapi/${apiid.id}`)
            console.log("FLIGHT FETCHING COMPLETE IN BOOKING.JSX");
            Setflight(response1.data)
        }
        catch{
            console.log("FLIGHT FETCHING ERROR IN BOOKING.JSX");
        }
        // TICKET FETCHING //
        try{
           const response2 =await flightapi.get(`/ticketapi`)
           console.log("TICKET FETCHING COMPLETE IN BOOKING.JSX");
           Settickets(response2.data)
        }
        catch{
            console.log("TICKET FETCHING ERROR IN BOOKING.JSX");
        }
        Setrefresh1(false)
    }

    useEffect(()=>{
        ApiLoading()
    },[refresh1])
    

    // TICKET CREATION //
    async function AddTicket (element){
        element.preventDefault()
        let data = {user:user.id,flight: flight.id,passanger_name:name,passanger_age:Number(age),gender:gender,journy_date:flight.day,class_of_service:sheet} 
        try{
            let response3 = flightapi.post(`/ticketapi`,data)
            console.log("TICKET CREATION COMPLETE IN BOOKING.JSX");
        }
        catch{
            console.log("TICKET CREATION ERROR IN BOOKING.JSX");
        }
        Setrefresh1(true)
        Setprice(price+flight.price)
        Setname("")
        Setage("")
        Setsheet("")
        Setgender("")
    }
    
    // TICKET DELETATION //
    async function DeleteTicket(id){
        try{
            let response4 = await flightapi.delete(`/ticketapi/${id}`)
            console.log("TICKETE DELETATION COMPLETE IN BOOKING.JSX");
        }
        catch{
            console.log("TICKETE DELETATION ERROR IN BOOKING.JSX");   
        }
        Setrefresh1(true)
        Setprice(price-flight.price)
    }

    async function ConfirmBooking(){
        try{
            let response5=await flightapi.post("/booking-history")
            console.log("BOOKING COMPLETED SUCESSFULLY IN BOOKING.JSX");
            navigate('/history')
        }
        catch{
            console.log("BOOKING FAILED IN BOOKING.JSX");
        } 
    }


    return( 
        <div id={style.booking}>
            <div id={style.booking1}>
                <div id={style.bflight}>
                    <div id={style.bflightdetails}>
                        <div id={style.bspan1}>
                            <div style={{color:"yellow"}}>
                                <strong>FROM</strong>
                                <strong>TO</strong>
                            </div>
                            <div style={{color:"rgba(255, 136, 0, 0.879)"}}>
                                <strong>{flight.depreture_city}</strong>
                                <strong>{flight.destination_city}</strong>
                            </div>
                            <div style={{color:"rgba(255, 0, 0, 0.879)"}}>
                                <strong>{convertTo12HourFormat(flight.deprature_time)}</strong>
                                <strong>{convertTo12HourFormat(flight.arival_time)}</strong>
                            </div>
                        </div>
                        <div id={style.bspan2}>
                            <div style={{color:"yellow"}}><strong>Day:-{flight.day}</strong></div>
                            <div style={{color:"rgb(2, 255, 2)"}}><strong>Price:-{flight.price}</strong></div>
                        </div>
                        <div id={style.bspan3}>
                            <div>
                                <i style={{color:flight.color}} class="fa-solid fa-jet-fighter-up fa-2xl"></i>
                            </div>
                            <h1 style={{color:flight.color}}>{flight.airline}</h1>
                        </div>
                    </div>
                    <div id={style.bflightsheet}>
                        <span>Economic <strong>AVL{flight.economy}</strong></span>
                        <span>Business <strong>AVL{flight.business}</strong></span>
                        <span>First Class <strong>AVL{flight.fast_class}</strong></span>
                    </div>
                </div>
            </div>
            <div id={style.booking2}>
                <h1>TICKET DETAILS</h1>
                <div>
                    {tickets.map((ticket)=>{
                        return(
                            <div id={style.ticket} key={ticket.id}>
                                <div>
                                    <strong>Name:-<span></span>{ticket.passanger_name}</strong>
                                    <strong>Age:-<span></span>{ticket.passanger_age}</strong>
                                    <strong>Class:-<span></span>{ticket.class_of_service}</strong>
                                    <strong>Gender:-<span></span>{ticket.gender}</strong>
                                </div>
                                <strong><i onClick={()=>{DeleteTicket(ticket.id)}} className="fa-regular fa-trash-can"></i></strong>
                            </div>
                        )
                    })
                    }
                </div>
                <form action="" id={style.bookingform}>
                    <label htmlFor=""><strong>PASSANGER</strong> 
                        <input type="text"  placeholder="Enter Your Name" value={name} onChange={(e)=>{Setname(e.target.value)}} required/>
                    </label>
                    <label htmlFor=""><strong>AGE</strong>
                        <input type="number" placeholder="Enter Your Age" value={age} onChange={(e)=>{Setage(e.target.value)}} required/>
                    </label>
                    <label htmlFor=""><strong>CLASS</strong> 
                        <select name="" id=""  value={sheet} onChange={(e)=>{Setsheet(e.target.value)}} required>
                            <option value=""></option>
                            <option value="ECONOMICS">ECONOMICS</option>
                            <option value="BUSINESS">BUSINESS</option>
                            <option value="FIRST CLASS">FIRST CLASS</option>
                        </select>
                    </label>
                    
                    <label htmlFor=""><strong>GENDER</strong>
                        <select name="" id="" value={gender}  onChange={(e)=>{Setgender(e.target.value)}} required>
                            <option value=""></option>
                            <option value="MALE">MALE</option>
                            <option value="FEMALE">FEMALE</option>
                            <option value="TRANSGENDER">TRANSGENDER</option>
                        </select>
                    </label>
                    <button onClick={AddTicket} style={{backgroundColor:flight.color}}>ADD</button>
                </form>
            </div>
            <div id={style.booking3}>
                <h2>TOTAL PRICE :-{price}</h2>
                <h2>PASSANGER:-{price/flight.price}</h2>
                <button onClick={ConfirmBooking}>PAYMENT</button>
            </div>
        </div>
    )
}
export default Booking