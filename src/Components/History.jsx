import axios from "axios"
import style from "./flight.module.css"
import { useEffect, useState } from "react"
import qrcode from "../images/qrcode.jpg"

const convertTo12HourFormat = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const isAM = hours < 12;
    const adjustedHours = hours % 12 || 12; // Convert 0 and 12 to 12
    const amPm = isAM ? 'AM' : 'PM';
    return `${adjustedHours}:${String(minutes).padStart(2, '0')} ${amPm}`;
};

const user=JSON.parse(localStorage.getItem("user"))
const flightapi=axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.access}`
    },
    })
    
const History=()=>{
    let [tickets,Settickets]=useState([])
    let [refresh1,Setrefresh1]=useState(false)


    // PREVIOUS TICKET REMOVED //
    useEffect(()=>{
        flightapi.delete("/booking-history")
        .then(()=>{Setrefresh1(true)})
        .catch(()=>{console.log("delete error");})
    },[])

    // ALL THE TICKETS FETCHING //
    useEffect(()=>{
        flightapi.get(`/booking-history`)
        .then((response)=>{Settickets(response.data)})
        .catch(()=>{console.log("booking history error");})
    },[refresh1])


    return(
        <div id={style.history}>
            <div id={style.namepallet}>
                <h1>BOOKING HISTORY</h1>
            </div>
            <div id={style.ticketblock}>
                {tickets.map((ticket)=>{
                    return(
                        <div  id={style.tickethistory}>
                            <div id={style.tdiv1}>
                                <div id={style.tspan11}>
                                    <strong>BOARDING PASS</strong>
                                    <h6>{ticket.class_of_service.toUpperCase()}</h6>
                                </div>
                                <div id={style.tspan12} style={{backgroundImage:`url(${ticket.flight.logo})`}}>
                                    <div>
                                        <span id={style.spanname}>
                                            <h5>PASSANGER NAME</h5>
                                            <h3>{ticket.passanger_name.toUpperCase()}</h3>
                                        </span>
                                        <span id={style.spanname}>
                                            <h5>DATE</h5>
                                            <h3>{ticket.journy_date.flightdate}</h3>
                                        </span>
                                    </div>
                                    <div>
                                        <div id={style.spandetails}>
                                            <h5>FLIGHT</h5>
                                            <h3>{ticket.flight.flight_number.toUpperCase()}</h3>
                                        </div>
                                        <div id={style.spandetails}>
                                            <h5>FROM</h5>
                                            <h3>{ticket.flight.depreture_city.toUpperCase()}</h3>
                                        </div>
                                        <div id={style.spandetails}>
                                            <h5>TO</h5>
                                            <h3>{ticket.flight.destination_city.toUpperCase()}</h3>
                                        </div>
                                        <div id={style.spandetails}>
                                            <h5>CLASS</h5>
                                            <h3>{ticket.class_of_service.toUpperCase()}</h3>
                                        </div>
                                    </div>
                                    <div>
                                        <div id={style.spangate}>
                                            <div id={style.gateblock}>
                                                <h5>GATE</h5>
                                                <h3>TERMINAL-1</h3>
                                            </div>
                                            <div id={style.gateblock}>
                                                <h5>TIME</h5>
                                                <h3>{convertTo12HourFormat(ticket.flight.deprature_time)}</h3>
                                            </div>
                                            <div id={style.gateblock}>
                                                <h5>SEAT</h5>
                                                <h3>{ticket.sheet_number}</h3>
                                            </div>
                                        </div>
                                        <div id={style.spangate}>
                                            <img height={"60px"} width={"250px"} src={qrcode} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div id={style.tspan13}>
                                    <strong style={{letterSpacing:"5px"}}>{ticket.booking.booking_id}</strong>  
                                </div>
                            </div> 
                            <div id={style.tdiv2}>
                                <div id={style.tspan21}>
                                    <strong>BOARDING PASS</strong>
                                    <h6>FIRST CLASS</h6>
                                </div>
                                <div id={style.tspan22} style={{backgroundImage:`url(${ticket.flight.logo})`}}>
                                    <div>
                                        <span id={style.spanname}>
                                            <h5>PASSANGER NAME</h5>
                                            <h3>{ticket.passanger_name.toUpperCase()}</h3>
                                        </span>
                                        <span id={style.spanname}>
                                            <h5>DATE</h5>
                                            <h3>{ticket.journy_date.flightdate}</h3>
                                        </span>
                                    </div>
                                    <div>
                                        <div id={style.gateblock}>
                                            <h5>GATE</h5>
                                            <h3>TERMINAL-1</h3>
                                        </div>
                                        <div id={style.gateblock}>
                                            <h5>TIME</h5>
                                            <h3>{convertTo12HourFormat(ticket.flight.deprature_time)}</h3>
                                        </div>
                                        <div id={style.gateblock}>
                                            <h5>SEAT</h5>
                                            <h3>{ticket.class_of_service.toUpperCase()}</h3>
                                        </div>
                                    </div>
                                    <div style={{alignItems:"center"}}>
                                        <img height={"60px"} width={"250px"} src={qrcode} alt="" />
                                    </div>
                                </div>
                                <div id={style.tspan23}>
                                    <strong style={{letterSpacing:"5px"}}>{ticket.booking.booking_id}</strong>
                                </div>
                            </div> 
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default History