import React, { Component } from "react";
import ReactDom from "react-dom";
import "./Footer.css";
import pkgrp_header_logo from "./../../assests/pkgrp_header_logo.png";
class Footer extends Component {
  render() {
    return (
      <div>
        {/* <div class="row"> */}
        <div
          className="row"
        >
          <div className="footer-text">
            © 2020 PAK GROUP | All Rights Reserved
          </div>
          <div className="footer-logo">
            <img fluid src={pkgrp_header_logo} />
          </div>
        </div>
      </div>
    );

    // </div>
  }
}
export default Footer;


