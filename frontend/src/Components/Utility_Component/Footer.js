import React from 'react'
import "./Footer.css"
const Footer = () => {
    return (
      <footer className="footer">
          <div className="footer-container">
              <div className="row">
                  <div className="footer-col">
                      <h4>Company</h4>
                      <ul>
                          <li><a href="#">about us</a></li>
                          <li><a href="#">our services</a></li>
                          <li><a href="#">privacy policy</a></li>
                          <li><a href="#">affiliate program</a></li>
                      </ul>
                  </div>
                  <div className="footer-col">
                      <h4>Get help</h4>
                      <ul>
                          <li><a href="#">FAQ</a></li>
                          <li><a href="#">shipping</a></li>
                          <li><a href="#">returns</a></li>
                          <li><a href="#">paymant options</a></li>
                      </ul>
                  </div>
                  <div className="footer-col">
                      <h4>Hospital</h4>
                      <ul>
                          <li><a href="#">Appointments</a></li>
                          <li><a href="#">Staff Detail</a></li>
                          <li><a href="#">Hospital detail</a></li>
                      </ul>
                  </div>
                  <div className="footer-col">
                      <h4>Follow us</h4>
                      <div className="social-links">
                          <a href="#" className="facebook"><i className="fab fa-facebook-f footericon"></i></a>
                          <a href="#" className="twitter"><i className="fab fa-twitter footericon"></i></a>
                          <a href="#" className="instagram"><i className="fab fa-instagram footericon"></i></a>
                          <a href="#" className="linkedin"><i className="fab fa-linkedin footericon"></i></a>
                      </div>
                  </div>
              </div>
              <p className="copyright">All rights reserved @Copyright {new Date().getFullYear()} </p>
          </div>
      </footer>
    )
  }
  export default Footer;