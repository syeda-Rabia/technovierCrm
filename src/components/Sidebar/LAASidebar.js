import React from "react";
import {
  ListGroup,
  OverlayTrigger,
  Form,
  Popover,
  Row,
  Col,
} from "react-bootstrap";
import buttonImg from "./../../assests/resource.svg";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { Link } from "react-router-dom";
import SearchLeads from "./SearchLeads";
import "./LAASidebar.css";
import FormPopover from "./FormPopover";
import { Button } from "@material-ui/core";
export default function LAASidebar(props) {
  const [toggle, setToggle] = React.useState(false);
  const displayList = () => {
    setToggle(!toggle);
    // ;
  };

  const List = (props) => {
    return (
      <React.Fragment>
        {/* <SearchLeads name="Search Leads" alignText="left" leftPadding="22px" /> */}
        <FormPopover name="Search Leads" alignText="left" leftPadding="22px" update={props.update}/>
        <ul className="list-group">
          <li id="list-item" className="list-group-item">
            <Link
              className="navLink"
              id="list-item"
              to={{
                pathname: "/admin/leads",
              }}
            >
              Add News Leads
            </Link>
          </li>
          <li id="list-item" className="list-group-item">
            <Link
              className="navLink"
              id="list-item"
              to={{
                pathname: "/admin/todolist",
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
                pathname: "/admin/closedleads",
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
        height: "86vh",
        // border: '2px solid blue',
      }}
    >
      <button className="toggle-button" onClick={displayList}>
        <img src={buttonImg} />
        <span>
          Leads Allocation and Addition <ExpandMoreIcon />
        </span>
      </button>
      {/* <Button
        // aria-describedby={id}
        variant="contained"
        // color="primary"
        // className="mb-2"
        style={{ backgroundColor: "#e5eeff" }}
        id="searchLeads"
        // onClick={handleClick}
      >
        <img src={buttonImg} />
        Leads Allocation and Addition <ExpandMoreIcon />
      </Button> */}
      {toggle === true ? <List update={props.update}/> : null}
    </div>
  );
}
