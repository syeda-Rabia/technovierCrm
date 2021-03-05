import React, { Component } from "react";
import ReactDom from "react-dom";
import "./SignInFooter.css";
import { Container } from "react-bootstrap";
import img from "./../../assests/fb-logo.svg";
import img2 from "./../../assests/tiwtr-logo.svg";
import img3 from "./../../assests/tum-logo.svg";
import img4 from "./../../assests/g-logo.svg";
class Footer extends Component {
  render() {
    return (
      <div>
        <div className="row ">
          <div
            className=" col-lg-6 col-sm-12   footer-link text-primary  "
            style={{ fontSize: "16px" }}
          >
            <div className="ml-5  footr clr" style={{ color: "#2258BF" }}>
              <a className="clr" href="#">
                Privacy Policy
              </a>
              <a className="clr" href="#">
                Terms and Conditions
              </a>
              <a className="clr" href="#">
                Help
              </a>
              <a className="clr" href="#">
                PakGroup Licenses
              </a>
              <a className="clr" href="#">
                Partners
              </a>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12 flx footer-link item w-100">
            <div className=" footer-icon item w-100">
              <div className="item">
                <ul className="list-unstyled list-inline item flx1">
                  <li className="list-inline-item">
                    <a className="btn-floating btn-sm rgba-white-slight mx-1">
                      <img src={img} />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="btn-floating btn-sm rgba-white-slight mx-1">
                      <img src={img2} />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="btn-floating btn-sm rgba-white-slight mx-1">
                      +
                      <img src={img3} />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="btn-floating btn-sm rgba-white-slight mx-1">
                      <img src={img4} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-lg-6 mt-0">
            <p
              className=" text1"
              style={{
                color: "#2258BF",
                wordSpacing: "-2px",
              }}
            >
              PakGroup © 2020 Copyright by
              <a
                style={{
                  color: "#2258BF",
                }}
                href="#"
              >
                <strong> PakGroup.</strong>
              </a>{" "}
              All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default Footer;
