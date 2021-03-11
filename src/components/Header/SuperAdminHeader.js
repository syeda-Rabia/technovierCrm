import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "./HeaderNavbar.css";
// import logo from "./../../assests/Pak-Group-logo-1.png";
import logo from "./../../assests/pakgroup.png";
import { Link, useHistory } from "react-router-dom";

import { connect } from "react-redux";
import { signOut } from "../../modules/Auth/actions";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { IconButton, Tooltip, Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
  white: {
    color: "#818181",
    backgroundColor: "#fff",
    width: theme.spacing(0),
    height: theme.spacing(6),
    border: 0,
  },
  logout: {
    "&, .MuiIconButton-root": {
      outline: "none !important",
      color: "white",
    },
  },
  typography: {
    padding: theme.spacing(2),
  },
}));

const HeaderNavBar = (props) => {
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openpopover = Boolean(anchorEl);
  const id =  openpopover ? 'simple-popover' : undefined;

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
              alt="Technovier"
              src={logo}
              width="150px"
              height="50px"
              style={{marginLeft:"50px"}}
              className="d-inline-block align-top"
            />{" "}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
        
 <Link
              id="mobileLogout"
              to={{
                pathname: "/",
                state: { from: "AdminHeader" },
              }}
            >
              <Nav.Item
              onClick={handleClick}>
              NOTIFICATION</Nav.Item>
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
            id="profile"
            onClick={handleClick}
          >
            <Tooltip title="Notifications" placement="left">
              {/* <Avatar className={classes.white}> */}
                <IconButton className={classes.logout}>
                <Badge badgeContent={2} color="error">
                  <NotificationsIcon />
                  </Badge>
                </IconButton>
              {/* </Avatar> */}
            </Tooltip>
          </Link>
        </Nav>
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
              {/* <Avatar className={classes.white}> */}
                <IconButton className={classes.logout}>
                  <PowerSettingsNewIcon/>
                </IconButton>
              {/* </Avatar> */}
            </Tooltip>
            {/* <Tooltip title="Logout" placement="left">
              <Avatar className={classes.white}>
                <IconButton className={classes.logout}>
                  <ExitToAppIcon />
                </IconButton>
              </Avatar>
            </Tooltip> */}
          </Link>
        </Nav>
        
      </Navbar>
       <Popover
        id={id}
        open={openpopover}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}><div>Notification 1</div>
        <div>

        Notification 2
        </div>
        </Typography>
      </Popover>
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
