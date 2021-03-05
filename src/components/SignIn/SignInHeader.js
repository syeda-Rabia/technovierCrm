import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './SignInHeader.css';
import pkgrp_header_logo from './../../assests/pkgrp_header_logo.png';
class Header_login extends Component {
  render() {
    return (
      <div>
        <div
          className="row"
          style={{
            height: '10vh',
            alignItems: 'center',
            borderBottom: '1px solid  rgb(210, 215, 200) ',
          }}
        >
          <div className="header-logo">
            <img fluid src={pkgrp_header_logo} />
          </div>

          <div
            className="login-button"
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              paddingRight: '20px',
            }}
          >
            <div style={{ justifyContent: 'space-between' }}>
              {/* <button className="btn-2" type="button">
                Log in
              </button> */}
              <button style={{
                backgroundColor: "#2258BF"}}className="btn-3" type="button">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );

    // </div>
  }
}
export default Header_login;
