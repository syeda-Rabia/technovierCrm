import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import "./CTAButton.css";
import {
  Col,
  Dropdown,
  DropdownButton,
  Modal,
  Row,
  ListGroup,
} from "react-bootstrap";
import {
  KeyboardDatePickerExample,
  KeyboardTimePickerExample,
} from "./../utils/KeyboardTimePickerExample";
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Input,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import { GET, POST, formatDate } from "./../utils/Functions";
import ApiUrls from "./../utils/ApiUrls";
import SuccessNotification from "./SuccessNotification";
import ErrorNotification from "./ErrorNotification";

export default function CTAButton({ empId, lead_id }) {
  const [value, setValue] = useState("");
  const [showModalCTA, setShowModalCTA] = React.useState(false);
  const [employees, setEmployees] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [currentLeadStatus, setCurrentLeadStatus] = React.useState("");
  const [selectedEmployee, setSelectedEmployee] = React.useState(null);
  const [alertmessage, setAlertMessage] = React.useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  var today = new Date();
  var timee = today.toString().match(/(\d{2}\:\d{2}\:\d{2})/g)[0];

  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  // let currentTime =
  //   today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  // today = mm + "-" + dd + "-" + yyyy;
  today = yyyy + "-" + mm + "-" + dd;

  const useStyles = makeStyles((theme) => ({
    dialogColor: {
      "& .MuiTypography-root": {
        color: "#818181",
      },
    },
  }));
  // console.log(status);

  const classes = useStyles();
  const EmployeeList = () => {
    // console.log(selectedEmployee);

    return (
      <>
        <Dialog
          open={open}
          onClose={handleClose}
          scroll="paper"
          maxWidth="xs"
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle
            classes={{ root: classes.dialogColor }}
            id="scroll-dialog-title"
          >
            Shift And Warn
          </DialogTitle>
          <DialogContent dividers={true}>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              {loading ? (
                [1, 1, 1, 1, 1, 1, 1, 1].map(() => (
                  <div className="d-flex flex-row m-2 p-2">
                    <Skeleton className="mr-3" variant="text" width="50%" />
                    <Skeleton variant="text" width="100%" />
                  </div>
                ))
              ) : (
                <List>
                  {employees === undefined || employees.length > 0 ? (
                    employees.map((e) => (
                      <ListItem
                        button
                        onClick={(event) => {
                          // console.log(event.currentTarget.innerText);
                          // console.log(e.id);
                          // console.log(e.first_name + " " + e.last_name);
                          setSelectedEmployee({
                            new_lead_holder_emp: e.id,
                            name: e.first_name + " " + e.last_name,
                          });
                          setValue("shift-and-Warn");
                          handleClose();
                        }}
                      >
                        <ListItemText
                          primary={e.first_name + " " + e.last_name}
                        />
                      </ListItem>
                    ))
                  ) : (
                    <ListItem button>
                      <ListItemText primary={"NO Employees to Show"} />
                    </ListItem>
                  )}
                </List>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Shift And Warn
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleFetchRequest = async () => {
    setOpen(true);

    setLoading(true);
    let res = await GET(ApiUrls.GET_ALL_DASHBOARD_USER);
    // ;
    console.log(res);
    if (res.success !== false) {
      console.log(res.data.users);
      setEmployees(res.data.users.data);
    }

    setLoading(false);
  };
  const ModalCTA = () => {
    const [message, setMessage] = useState("");
    const [time, setTime] = useState(timee);
    const [date, setDate] = useState(today);
    const [checked, setChecked] = React.useState({ index: 0, state: true });
    
    let timeVal = new Date();

    const SendInstructToServer = async (e) => {
      e.preventDefault();

      const formData = {
        action_type: "instruct",
        lead_id: lead_id,
        instruct_text: message,
      };
      setShowModalCTA(false);

      let resp = await POST(ApiUrls.CALL_TO_ACTION, formData);
      console.log(resp);
      if (resp.error === false) {
        setAlertMessage("Instruction Send Successfully");
        setShowSuccessAlert(true);
      } else {
        setAlertMessage("Instruction Not Send!");
        setShowErrorAlert(true);
      }

      console.log(resp);
    };
    const SendCallExplanationToServer = async () => {
      const formData = {
        action_type: "call_explination",
        lead_id: lead_id,
        date: date,
        time: time,
      };
      console.log(formData);
      let resp = await POST(ApiUrls.CALL_TO_ACTION, formData);

      if (resp.error === false) {
        setAlertMessage("Call Explanation Done Successfully");
        setShowSuccessAlert(true);
      } else {
        setAlertMessage("Call Explanation Failed");
        setShowErrorAlert(true);
      }
      console.log(resp);
    };
    const SendShitLeadToServer = async () => {
      let resp = await POST(ApiUrls.CALL_TO_ACTION, {
        action_type: "shiftLead",
        lead_id: lead_id,
        prev_lead_holder_emp: empId,
        new_lead_holder_emp: selectedEmployee.new_lead_holder_emp,
      });
      if (resp.error === false) {
        setAlertMessage("Lead shifted Successfully");
        setShowSuccessAlert(true);
      } else {
        setAlertMessage("Shift and Warn  Failed");
        setShowErrorAlert(true);
      }
      console.log("-------resp----",resp);
    };
    const showText = ["Show current Employee previous actions", "Don't show current Employee previous actions"];
    const handleChange = (value) => {
      setMessage(value);
    };
    const handleDateValue = (value) => {
      setDate(formatDate(value, "-"));
      console.log(formatDate(value, "-"));
    };
    const handleTimeValue = (value) => {
      const timeStr = value.toString();
      var time = timeStr.match(/(\d{2}\:\d{2}\:\d{2})/g)[0];
      setTime(time);
      console.log(time);
    };
    const handleChecked = (event, id) => {
      setChecked({ index: id, state: event.target.checked });
    };
    // if (options.title === optionsArray[0].title)
    //
    if (value === "instruct") {
      return (
        <Modal
          show={showModalCTA}
          onHide={() => {
            setShowModalCTA(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Enter your Instruction</Modal.Title>
          </Modal.Header>
          <form onSubmit={SendInstructToServer}>
            <Modal.Body>
              <TextField
                // variant="outlined"
                autoFocus
                margin="dense"
                multiline
                fullWidth
                required={true}
                label="Instruction"
                value={message}
                onChange={(e) => {
                  handleChange(e.target.value);
                }}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                // style={{ backgroundColor: "#2258BF" }}
                onClick={() => {
                  setShowModalCTA(false);
                }}
              >
                Close
              </Button>
              <Button
                type="submit"
                value="Submit"
                // style={{ backgroundColor: "#2258BF" }}
                // onClick={(e) => {
                //   SendInstructToServer(e);
                // }}
              >
                Send
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      );
    }
    // if (options.title === optionsArray[1].title)
    else if (value === "call-Explanation") {
      return (
        <Modal
          show={showModalCTA}
          onHide={() => {
            setShowModalCTA(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Select date and time</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={SendCallExplanationToServer}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box>
                  <KeyboardDatePickerExample
                    value={today}
                    showDate={handleDateValue}
                  />
                </Box>
                <br />
                <Box>
                  <KeyboardTimePickerExample
                    value={timeVal}
                    showTime={handleTimeValue}
                  />
                </Box>
              </Box>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              // style={{ backgroundColor: "#2258BF" }}
              onClick={() => {
                setShowModalCTA(false);
              }}
            >
              Close
            </Button>
            <Button
              type="submit"
              // style={{ backgroundColor: "#2258BF" }}
              onClick={(e) => {
                SendCallExplanationToServer(e);
                setShowModalCTA(false);
              }}
            >
              Set
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }

    // if (options.title === optionsArray[2].title)
    else if (value === "shift-and-Warn") {
      return (
        <Modal
          show={showModalCTA}
          onHide={() => {
            setShowModalCTA(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Shift and Warn</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={SendShitLeadToServer}>
              <p>
                Do you really want to shift this lead to
                <b> {selectedEmployee.name}</b>.
              </p>
              {showText.map((item, index) => {
        return (
          <div key={index}>
            <Checkbox
              checked={checked.index === index ? checked.state : false}
              color="primary"
              onChange={(e) => {
                handleChecked(e, index);
              }}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
            {item}
          </div>
        );
      })}
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              // style={{ backgroundColor: "#2258BF" }}
              onClick={() => {
                setShowModalCTA(false);
              }}
            >
              Close
            </Button>
            <Button
              // style={{ backgroundColor: "#2258BF" }}
              onClick={(e) => {
                SendShitLeadToServer(e);
                setShowModalCTA(false);
              }}
            >
              Send
            </Button>
          </Modal.Footer>
        </Modal>
      );
    } else {
      return null;
    }
  };
  //  ;
  return (
    <>
      <SuccessNotification
        showSuccess={showSuccessAlert}
        message={alertmessage}
        closeSuccess={setShowSuccessAlert}
      />
      <ErrorNotification
        showError={showErrorAlert}
        message={alertmessage}
        closeError={setShowErrorAlert}
      />
      <DropdownButton
        id="CTA-button"
        // id="dropdown-variants-primary"
        key={"primary"}
        variant={"primary"}
        // style={{ backgroundColor: "red" }}
        title="CTA"
        onSelect={(e) => {
          // setCurrentLeadStatus(status);
          // console.log(status, id);
          // ;
          setValue(e);
          setShowModalCTA(true);
        }}
      >
        <Dropdown.Item
          as="button"
          eventKey="instruct"
          style={{ color: "black", outline: "none" }}
        >
          Instruct
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          eventKey="call-Explanation"
          style={{ color: "black", outline: "none" }}
        >
          Call Explanation
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          onClick={() => {
            handleFetchRequest();
          }}
          style={{ color: "black", outline: "none" }}
        >
          Shift and Warn
        </Dropdown.Item>
        {/* <DropdownButton
          id="shiftAndWarnButton"
          title="Shift and Warn"
          drop="left"
        >
          {employees.map((e) => (
            <Dropdown.Item
              as="button"
              style={{ color: "black", outline: "none" }}
            >
              <span>{e.first_name}</span>
            </Dropdown.Item>
          ))}
        </DropdownButton> */}
      </DropdownButton>
      {open ? <EmployeeList /> : null}
      {showModalCTA ? <ModalCTA /> : null}
    </>
  );
}
