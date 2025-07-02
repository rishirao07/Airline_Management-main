import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerContainer container">
        <div className="footerSections grid">
          <div className="footerSection">
            <h4>About Us</h4>
            <p>Learn more about our airline and our story.</p>
          </div>
          <div className="footerSection">
            <h4>Contact Us</h4>
            <p>Email: @airline.com</p>
            <p>Phone: +91 6300826132</p>
          </div>
          <div className="footerSection">
            <h4>Follow Us</h4>
            <div className="socialIcons">
              <a href="" className="socialIcon facebook" ><FaFacebook /></a>
              <a href="" className="socialIcon instagram"><FaInstagram /></a>
              <a href="" className="socialIcon youtube"><FaYoutube /></a>
              <a href="" className="socialIcon twitter"><RiTwitterXFill /></a>
              <a href="" className="socialIcon linkdIn"><FaLinkedin /></a>
            </div>
          </div>
        </div>
        <div className="footerBottom">
          <p>&copy; 2024 Airline. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
