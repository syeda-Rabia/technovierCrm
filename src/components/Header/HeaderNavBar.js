import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "./HeaderNavbar.css";
import logo from "./../../assests/Pak-Group-logo-1.png";
import { Link, useHistory } from "react-router-dom";

import { connect } from "react-redux";
import { signOut } from "../../modules/Auth/actions";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { IconButton, Tooltip, Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  white: {
    color: "#818181",
    backgroundColor: "#fff",
    width: theme.spacing(6),
    height: theme.spacing(6),
    border: 0,
  },
  logout: {
    "&, .MuiIconButton-root": {
      outline: "none !important",
    },
  },
}));

const HeaderNavBar = (props) => {
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  // ;
  return (
    <
      // fluid
      // // style={{ backgroundColor: "#2258bf" }}
      // xl={12}
      // lg={12}
      // sm={12}
      // xs={12}
      // className=" mx-0 px-0 h-100"
    >
      <Navbar
        sticky="top"
        collapseOnSelect
        expand="lg"
        className="color-nav h-100 w-100"
      >
        <Navbar.Brand>
          <Link to="/">
            <img
              alt="PaK Group"
              src={logo}
              width="150px"
              height="50px"
              className="d-inline-block align-top"
            />{" "}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link
              id="R-navlink"
              to={{
                pathname: "/",
                state: { from: "AdminHeader" },
              }}
            >
              <Nav.Item>Dashboard</Nav.Item>
            </Link>
            <Link
              id="R-navlink"
              to={{
                pathname: "/admin/todolist",
                state: { from: "AdminHeader" },
              }}
            >
              <Nav.Item>To Do</Nav.Item>
            </Link>
            <Link
              id="R-navlink"
              to={{
                pathname: "/admin/leads",
                state: { from: "AdminHeader" },
              }}
            >
              <Nav.Item>Leads</Nav.Item>
            </Link>
            <Link
              id="R-navlink"
              to={{
                pathname: "/admin/leadsallocation",
                state: { from: "AdminHeader" },
              }}
            >
              <Nav.Item>Allocation</Nav.Item>
            </Link>
            <Link
              id="R-navlink"
              to={{
                pathname: "/admin/inventory",
                state: { from: "AdminHeader" },
              }}
            >
              <Nav.Item>Inventory</Nav.Item>
            </Link>
            <Link
              id="R-navlink"
              to={{
                pathname: "/admin/user",
                state: { from: "AdminHeader" },
              }}
            >
              <Nav.Item>User</Nav.Item>
            </Link>
            <Link
              id="R-navlink"
              to={{
                pathname: "/admin/policies",
                state: { from: "AdminHeader" },
              }}
            >
              <Nav.Item>Policies</Nav.Item>
            </Link>
            <Link id="R-navlink">
              <Nav.Item>HR</Nav.Item>
            </Link>

            {/* <Nav.Item href="#Accounts">Accounts</Nav.Item>
            <Nav.Item href="#Documentation">Documentation</Nav.Item> */}
            {/* <Nav.Item href="#Documentation" id="hr">
              HR
            </Nav.Item> */}
            <Link
              id="mobileLogout"
              to={{
                pathname: "/",
                state: { from: "AdminHeader" },
              }}
            >
              <Nav.Item
                onClick={() => {
                  setOpen(true);
                  // props.LOGOUT();
                }}
              >
                LOGOUT
              </Nav.Item>
            </Link>
          </Nav>
        </Navbar.Collapse>
        <Nav id="profile">
          {/* <Nav.Link
            href="#profile"
            style={{
              backgroundColor: "white",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              lineHeight: "20px",
            }}
          >
            <span style={{ color: "black" }}>HR</span>
          </Nav.Link> */}
          <Link
            id="R-navlink"
            onClick={() => {
              setOpen(true);
              // props.LOGOUT();
            }}
          >
            <Tooltip title="Logout" placement="left">
              <Avatar className={classes.white}>
                <IconButton className={classes.logout}>
                  <ExitToAppIcon />
                </IconButton>
              </Avatar>
            </Tooltip>
          </Link>
        </Nav>
      </Navbar>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to Logout?"}
        </DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to Logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            No
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              props.LOGOUT();
              history.push("/");
            }}
            color="primary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    LOGOUT: () => dispatch(signOut()),
  };
};

const mapStateToProps = (state) => {};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNavBar);
