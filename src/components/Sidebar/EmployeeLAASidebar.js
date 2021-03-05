import React from "react";
import {
  ListGroup,
  OverlayTrigger,
  Button,
  Form,
  Popover,
  Row,
  Col,
} from "react-bootstrap";
import buttonImg from "./../../assests/resource.svg";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { Link } from "react-router-dom";
import SearchLeads from "./SearchLeads";
import "./EmployeeLAASidebar.css";
export default function LAASidebar() {
  const [toggle, setToggle] = React.useState(false);
  const displayList = () => {
    setToggle(!toggle);
    // ;
  };

  const List = (props) => {
    return (
      <React.Fragment>
        <SearchLeads name="Search Leads" alignText="left" leftPadding="22px" />
        <ul className="list-group">
          <li id="list-item" className="list-group-item">
            Add News Leads
          </li>
          <li id="list-item" className="list-group-item">
            <Link
              className="navLink"
              id="list-item"
              to={{
                pathname: "/employee/todolist",
              }}
            >
              To Do List
            </Link>
          </li>
          <li id="list-item" className="list-group-item">
            <Link
              className="navLink"
              id="list-item"
              to={{
                pathname: "",
              }}
            >
              Closed Leads
            </Link>
          </li>
        </ul>
      </React.Fragment>
    );
  };

  return (
    <div
      style={{
        height: "100vh",
        // border: '2px solid blue',
      }}
    >
      <button className="toggle-button" onClick={displayList}>
        <img src={buttonImg} />
        <span>
          Leads Allocaton and Addition <ExpandMoreIcon />
        </span>
      </button>
      {toggle === true ? <List /> : null}
    </div>
  );
}
