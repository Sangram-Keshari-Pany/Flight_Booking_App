import style from "./flight.module.css"


const Footer=()=>{
    return(
        <footer id={style.footer}>
            <div id={style.footerblock}>
                <div id={style.div1}></div>
                <div id={style.footer1}>
                    <h4>Company Information</h4>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Flight Status</a></li>
                        <li><a href="#">Cancellation Policy</a></li>
                    </ul>
                </div>
                <div id={style.footer2}>
                    <h4>Legal</h4>
                    <ul>
                        <li><a href="#">Baggage Information</a></li>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Cookie Policy</a></li>
                        <li><a href="#">Refund Policy</a></li>
                        <li><a href="#">Travel Insurance</a></li>
                    </ul>
                </div>
                <div id={style.footer3}>
                    <h4>Company Information</h4>
                    <ul>
                        <li><a href="#"><i class="fa-brands fa-square-facebook"></i> Facebook</a></li>
                        <li><a href="#"><i class="fa-brands fa-square-x-twitter"></i> Twitter</a></li>
                        <li><a href="#"><i class="fa-brands fa-square-instagram"></i> Instagram</a></li>
                        <li><a href="#"><i class="fa-brands fa-linkedin"></i> LinkedIn</a></li>
                        <li><a href="#"><i class="fa-brands fa-square-youtube"></i> YouTube</a></li>
                    </ul>

                </div>
            </div>
        </footer>
    )
}
export default Footer