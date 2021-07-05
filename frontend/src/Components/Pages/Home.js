import React from 'react';
import "./Home.css";
import { Link } from "react-router-dom"
import AdjustIcon from '@material-ui/icons/Adjust';
import { Button } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PatientFacilityImg from "../../Images/patient.png"
import HospitalFacilityImg from "../../Images/hospital.png"
const ListItem = ({text}) => {
  return (
    <>
      <AdjustIcon style={{ fontSize: "15px", marginRight: "10px", color: "#003D84" }} />
      <li className="FacilityItem">{text}</li>
      <br />
    </>
  )
}
const Card = ({icon,title,subtitle,path,linktext}) => {
  return (
    <>
      <div className="homeCards">
        {icon}
        <h5 className="card-subtitlte">{subtitle}</h5>
        <h2 className="card-title">{title}</h2>
        <button className="cardbtn"><Link to={path}> {linktext} </Link></button>
      </div>
    </>
  )
}
const cardArr = [
  {icon : <i class="far fa-hospital card-icon"></i>,title: "Book A Appointment" , subtitle:"Appointment",path:"/dashboard/patient/newappointment",linktext:"Book Now"},
  {icon : <i class="fas fa-user-md card-icon"></i>,title: "Manage all Staff" , subtitle:"Hospital",path:"/dashboard/hospital/addemployee",linktext:"Add Staff"},
  {icon : <i class="far fa-calendar-check card-icon"></i>,title: "Handle Patient's Appointment" , subtitle:"Appointment",path:"/dashboard/hospital/allappointment",linktext: "See Appointment"},
]

const Footer = () => {
  return (
    <footer class="footer">
        <div class="footer-container">
            <div class="row">
                <div class="footer-col">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="#">about us</a></li>
                        <li><a href="#">our services</a></li>
                        <li><a href="#">privacy policy</a></li>
                        <li><a href="#">affiliate program</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Get help</h4>
                    <ul>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">shipping</a></li>
                        <li><a href="#">returns</a></li>
                        <li><a href="#">paymant options</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Hospital</h4>
                    <ul>
                        <li><a href="#">Appointments</a></li>
                        <li><a href="#">Staff Detail</a></li>
                        <li><a href="#">Hospital detail</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Follow us</h4>
                    <div class="social-links">
                        <a href="#" className="facebook"><i class="fab fa-facebook-f footericon"></i></a>
                        <a href="#" className="twitter"><i class="fab fa-twitter footericon"></i></a>
                        <a href="#" className="instagram"><i class="fab fa-instagram footericon"></i></a>
                        <a href="#" className="linkedin"><i class="fab fa-linkedin footericon"></i></a>
                    </div>
                </div>
            </div>
            <p className="copyright">All rights reserved @Copyright {new Date().getFullYear()} </p>
        </div>
    </footer>
  )
}
const Home = () => {
  return (
    <>
      <div className="container">
        <section className="main-section">
          <div className="text">
            <h1 className="homeTitle">your health is our priority</h1>
            <h5 className="homeText">Bring Health To life for the whole family...</h5>
            <button className="btn"><Link to="/dashboard/patient/newappointment"> Book Appointment </Link></button>
          </div>
        </section>
        <div className="homePage">
          <h1 className="exploreMore-title">Explore More Features</h1>

          <section className="patientFacility-section">
            <div className="patientFacility-img">
              <img src={PatientFacilityImg} alt="" />
            </div>
            <div className="patientFacility-text">
              <h1 className="subtitle">Best Caring Facilities For Every Patient</h1>
              <ul className="patientFacilitylist">
                {
                  ["Maintain your growth", "Information of medical status", "Book your appointment in one click","Information for any disease"].map((text,index) => (
                    <ListItem key={index} text={text} />
                  ))
                }
              </ul>
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon style={{ color: "#fefefe" }} />}
                style={{ background: "#003d84", margin: "10px 0px" }}
              >
                <Link to="/signup/patient"> Sign up Now </Link>
              </Button>
            </div>
          </section>

          <section className="hospitalFacility-section">
            <div className="hospitalFacility-text">
              <h1 className="subtitle hospitalTitle">Easy To Manage Hospital</h1>
                {
                  ["Maintain All appointment", "Information of all patient", "Easy to handle appointment","Manage all employee"].map((text,index) => (
                    <ListItem key={index} text={text} />
                  ))
                }
                <Button
                variant="contained"
                endIcon={<ArrowForwardIcon style={{ color: "#fefefe" }} />}
                style={{ background: "#003d84", margin: "10px 0px" }}
              >
                <Link to="/signup/hospital"> Sign up Now </Link>
              </Button>
            </div>
            <div className="hospitalFacility-img">
              <img src={HospitalFacilityImg} alt="hospital svg" />
            </div>
          </section>
          
          <section className="cards-container">
            {
              cardArr.map((ele,index) => {
                return <Card key={index}  icon={ele.icon} title={ele.title} subtitle={ele.subtitle} path={ele.path} linktext={ele.linktext}/>
              })
            }
          </section>
        </div>
          <Footer />
      </div>
    </>
  )
}

export default Home
