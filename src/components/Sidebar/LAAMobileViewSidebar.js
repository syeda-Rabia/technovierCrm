import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, SwipeableDrawer } from "@material-ui/core";
import AdminSidebar from "./AdminASidebar";
import FormPopover from "./FormPopover";
import buttonImg from "./../../assests/resource.svg";
import Fab from "@material-ui/core/Fab";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function TemporaryDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Fab onClick={toggleDrawer(anchor, true)} aria-label="add">
            <img src={buttonImg} />
          </Fab>

          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <AdminSidebar/>
            {/* <FormPopover name="Search Leads" update={props.update} /> */}
            {/* <ul className="list-group"> */}
              {/* <li id="list-item" className="list-group-item">
                Add News Leads
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
            </ul> */}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
