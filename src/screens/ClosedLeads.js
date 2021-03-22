// import React from 'react';
import "../screens/Admin/Leads/LeadsAdmin";
import SwipeableTemporaryDrawer from "../components/Sidebar/LAAMobileViewSidebar";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Dropfile from "../utils/Dropfile";
import { Link, Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPencilAlt,
  faTrash,
  faPlusSquare,
  faPlay,
  faPause,
  faStop,
  faLessThanEqual,
} from "@fortawesome/free-solid-svg-icons";
import {
  Tooltip,
  IconButton,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {useHistory } from "react-router-dom";
import sample from "./../assests/sample.mp3";
import sample2 from "./../assests/sample2.mp3";
import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { LeadsData } from "./../assests/constants/Leadsadmindata";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import {
  KeyboardDatePickerExample,
  KeyboardTimePickerExample,
} from "../utils/KeyboardTimePickerExample";
import { Divider } from "antd";
import { publicURL } from "./../utils/Config";
import { GET, POST } from "../utils/Functions";
import ApiUrls from "../utils/ApiUrls";
import {
  makeStyles,
  Backdrop,
  CircularProgress,
  Input,
  Select,
  MenuItem,
  TextField,
  Snackbar,
  Slide,
  Chip,
  Button as MaterialButton,
} from "@material-ui/core";

import FaceIcon from "@material-ui/icons/Face";

import { validateEmail, validateMobile } from "../utils/Validation";
import CTAButton from "../components/CTAButton";
// import ReactTicker from "../../../components/Ticker/ReactTicker";
// import Ticker from "react-ticker";
import LeadsMobileViewSidebar from "../components/Sidebar/LeadsMobileViewSidebar";
import SuccessNotification from "../components/SuccessNotification";
import ErrorNotification from "../components/ErrorNotification";
import { Alert } from "@material-ui/lab";
import PreLoading from "../components/PreLoading";
const useStyles = makeStyles((theme) => ({
  chipGracePeriod: {
    color: "#fff",
    backgroundColor: "red !important",
  },
  chipComplete: {
    color: "#fff",
    backgroundColor: "green !important",
  },
  chipFollowUp: {
    color: "#fff",
    backgroundColor: "yellow !important",
  },
  chipOverdue: {
    color: "#fff",
    backgroundColor: "orange !important",
  },
  chipAllocated: {
    color: "#fff",
    backgroundColor: "#90caf9 !important",
  },
  chipLabelColor: {
    color: "black",
  },
}));

export default function LeadsAdmin() {
  const [allLeads, setAllLeads] = useState([]);

  const [showAdd, setShowAdd] = useState(false);

  const audioTune = new Audio(sample);
  const audioTune2 = new Audio(sample2);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [interestList, setInterestList] = useState([]);
  const [message, setMessage] = React.useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [gobackState, setGobackState] = useState(false);

  var today = new Date();
  const [recordings, setRecordings] = useState([]);

  var timee = today.toString().match(/(\d{2}\:\d{2}\:\d{2})/g)[0];
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    // setIsLoading(true);
    getAllLeadsData();
    FetchInterestData();
  }, [refresh]);

  const FetchInterestData = async () => {
    setIsLoading(true);
    let res = await GET(ApiUrls.GET_ALL_INTEREST);
    console.log("-----", res);
    if (res.success != false) {
      setInterestList(res.data.Interest);
    }
    setIsLoading(false);
  };

  const getAllLeadsData = async () => {
    //  ;

    let resp = await GET(ApiUrls.GET_ALL_CLOSED_LEADS);

    if (resp.data != null) {
      setAllLeads(resp.data.leads);
    }
    if (resp.data.leads.length == 0) {
      setGobackState(true);
    }
    setIsLoading(false);

    //  ;
    //  ;
  };
  const currencyFormat = (num) => {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "PKR";
  };
  //  console.log(currencyFormat(2665));
 

  const LeadTable = ({ item, index }) => {
    const [showEdit, setShowEdit] = useState(false);
    const [selectedID, setSelectedID] = useState(null);
    const [showView, setShowView] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [setPlay, setShowPlay] = useState(false);

    const ModalEdit = ({ item }) => {
      // console.log(
      //   "____________________________________________________________________",
      //   item
      // );

      const [time, setTime] = useState(timee);
      const [allProjects, setAllProjects] = useState([]);
      const [project, setProject] = useState(item.project.id);
      const [interestID, setInterestID] = useState();
      const [allSource, setAllSource] = useState([
        "Newspaper",
        "Digital Marketing",
        "Other",
        "TV",
        "Personal Personal",
        "SMS",
        "Outdoor",
      ]);

      const [selectedSource, setSelectedSource] = useState(item.source);

      const [client, setClient] = useState(item.client_name);
      const [contact, setContact] = useState(item.contact);
      const [budget, setBudget] = useState(item.budget);

      const [country, setCountry] = useState(item.country_city);
      // const [status, setStatus] = useState("New");
      const [interest, setInterest] = useState([]);

      const [emailError, setEmailError] = useState(false);

      const [email, setEmail] = useState(item.email);
      const [task, setTask] = useState("Sale");
      const [deadline, setDeadline] = useState("");
      const [source, setSource] = useState("newspaper");
      const [innerLoading, setInnerLoading] = useState(false);

      const HandleTimeValue = (value) => {
        const str = value.toString();
        var res = str.match(/(\d{2}\:\d{2}\:\d{2})/g)[0];

        setTime(res);
      };
      useEffect(() => {
        setInnerLoading(true);
        // getProjectDetails();
      }, []);

      useEffect(() => {
        // getInventroyDataAgaintsProject(project);
      }, [project]);

    
    };
    const HandleAudioModule = ({
      recording,
      setActiveAudio,
      activeAudio,
      index,
    }) => {
      // console.log(recording,"Recording Audio")
      const [audioTune, setAudioTune] = useState(new Audio(recording));
      // const [playAudio,setPlayAudio]=useState(false)
      if (index != activeAudio.index) audioTune.pause();
      useEffect(() => {
        //  setAudioTune( new Audio(recording));
        audioTune.load();
      }, []);

      const playSound = () => {
        audioTune.play();
        // setPlayAudio(true)
        setActiveAudio({ index: index, playState: true });

        // audioTune2.pause();

        // setPlayAudio2(false);
      };

      const pauseSound = () => {
        audioTune.pause();
        // setPlayAudio(false)
        setActiveAudio({ index: index, playState: false });
      };
      const isActive = () => {
        if (activeAudio.index == index) return activeAudio.playState;
        else return false;
      };
      return (
        <Card
          className="shadow  bg-white rounded "
          style={{ width: "80%", height: "40px", marginLeft: "35px" }}
        >
          <Card.Body>
            {/* <Ticker>
        {({ index }) => (
            <>
                 <span className="spn1">2011/10/09</span>
                 <span className="spn2">Recording {index}
            </>
        )}
    </Ticker> */}
            <div style={{display:'flex',flexDirection:'row'}}>
              <p class="marquee">
                  <span style={{display:'flex',flexDirection:'row',width:'100%'}}> <span><b>Created Date :</b> {item.recordings[0].created_at}</span> <span   style={{marginLeft:'50px'}}><b>File Name: </b>{item.recordings[0].recording_file}</span> </span>
                 
                {/* <span className="spn1">
                  2011/10/09 {item.recordings[0].recording_file} {"       "}  2011/10/09 {item.recordings[0].recording_file}
                </span> */}
                {/* <span className="spn1">
                  2011/10/09 {item.recordings[0].recording_file}
                </span> */}
              </p>

              {/* <p class="marquee"><span  className="spn2">{item.recordings[0].recording_file}</span></p> */}

              {/* <span className="spn1">2011/10/09</span> */}
              {/* <span className="spn2">{item.recordings[0].recording_file}</span> */}
              {/* <span className="spn2">Recording {index} */}
              {/* <ReactTicker
            index={item.recordings[0].recording_file}
            /> */}
              {/* </span> */}
              {isActive() ? (
                <button
                  type="button"
                  className="bg-transparent  button-focus mr-2 button-bg"
                  onClick={pauseSound}
                >
                  <FontAwesomeIcon style={{ fontSize: 15 }} icon={faPause} />
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-transparent  button-focus mr-2 button-bg"
                  onClick={playSound}
                >
                  <FontAwesomeIcon style={{ fontSize: 15 }} icon={faPlay} />
                </button>
              )}
            </div>
          </Card.Body>
        </Card>
      );
    };

    const ModalPlay = ({ item }) => {
      const [activeAudio, setActiveAudio] = useState({
        index: 0,
        playState: false,
      });

      return (
        <Modal
          show={setPlay}
          onHide={() => {
            setShowPlay(false);
          }}
        >
          <Modal.Header
            closeButton
            className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2"
          >
            <Modal.Title style={{ color: "#818181" }}>Recordings</Modal.Title>
          </Modal.Header>
          <div className="col-lg-12 shadow p-3  bg-white rounded ">
            <Modal.Body>
              {recordings.map((recording, index) => {
                // const audioTune = new Audio(recording);

                return (
                  <HandleAudioModule
                    recording={publicURL + recording.recording_file}
                    activeAudio={activeAudio}
                    index={index}
                    setActiveAudio={setActiveAudio}
                  />
                );
              })}
         
            </Modal.Body>
            <Modal.Footer>
              <Button
                style={{ backgroundColor: "#2258BF" }}
                onClick={() => {
                  setShowPlay(false);
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      );
    };

    let country_city = "country/city";
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{item.client_name}</td>
        <td>{item.contact}</td>
        
        <td>{item.email != null ? item.email : "-------"}</td>

        <td>{item.project.name}</td>
        <td>{item.budget}</td>

        {/* <td>{item.inventory.serial_no}</td> */}
        <td>{item.interest != null ? item.interest.interest : "-------"}</td>

        <td>{item.time_to_call != null ? item.time_to_call : "-------"}</td>
        <td>
          {item.hasOwnProperty("country_city") == true
            ? item.country_city
            : "-------"}
        </td>
        <td>{item.source}</td>

        <td>
          {item.status != "" ? item.status:
            "-------"
          }
        </td>

        <td>
        {item.allocation.length > 0 ? (
            <Chip
              icon={<FaceIcon />}
              variant="outlined"
              label={item.allocation[0].allocated_to.first_name}
              style={{ marginRight: "5px" }}
            />
          ) : (
            "-------"
          )}
        </td>
        <td>{item.task}</td>
        <td>{item.dead_line != null ? item.dead_line : "-------"}</td>

        {/* <td>{item.Allocate_to}</td>
        <td>{item.Email}</td>
        <td>{item.Task}</td>
        <td>{item.Deadline}</td> */}
        <td>
          {/* <Link to={{ pathname: "/admin/emp-action", query: { item } }}>
            <button
              data-tip
              data-for="action"
              type="button"
              className="bg-transparent  button-focus mr-2"
              // onClick={() => {
              //   // setShowView(true);
              //   // setSelectedID(index);
              // }}
            >
              <FontAwesomeIcon style={{ fontSize: 15 }} icon={faEye} />
            </button>
          </Link>
          <ReactTooltip id="action" place="top" effect="solid">
            View Employee Action
          </ReactTooltip> */}
        </td>

        <td>
        <div className="d-flex d-inline">
          {item.recordings.length > 0 ? (
            <>
              <button
                data-tip
                data-for="play"
                type="button"
                className="bg-transparent  button-focus 2"
                onClick={() => {
                  // isLoading(true);
                  // let arr=[sample,sample,sample];
                  setRecordings(item.recordings);
                  setShowPlay(true);
                  setSelectedID(index);
                }}
              >
                <FontAwesomeIcon style={{ fontSize: 15 }} icon={faPlay} />
              </button>
              <ReactTooltip id="play" place="top" effect="solid">
                play
              </ReactTooltip>
            </>
          ) : (
            ""
          )}
          </div>

{allLeads.length > 0 && selectedID !== null ? (
            <>
              <ModalPlay item={allLeads[selectedID]} />
              {/* <ModalDelete item={allLeads[selectedID]} />
              <ModalView item={allLeads[selectedID]} />
              <ModalEdit item={allLeads[selectedID]} /> */}
            </>
          ) : null}
        </td>

        <td>
          {/* {item.allocation.length > 0 ? (
            <CTAButton
              // leadId={item.allocation[0].lead_id}
              empId={item.allocation[0].allocated_to.id}
              lead_id={item.id}
              // status={item.status}
            />
          ) : (
            "-------"
          )} */}
        </td>

        {/* <td>
          <div className="d-flex d-inline">
            <button
              data-tip
              data-for="delete"
              type="button"
              className="bg-transparent  button-focus mr-2"
              onClick={() => {
                setShowView(true);
                setSelectedID(index);
              }}
            >
              <FontAwesomeIcon style={{ fontSize: 15 }} icon={faEye} />
            </button>
            <ReactTooltip id="delete" place="top" effect="solid">
              View Details
            </ReactTooltip>
            <button
              data-tip
              data-for="EditTip"
              type="button "
              className="bg-transparent  button-focus mr-2 ml-2"
              onClick={() => {
                setShowEdit(true);
                setSelectedID(index);
              }}
            >
              <FontAwesomeIcon style={{ fontSize: 15 }} icon={faPencilAlt} />
            </button>
            <ReactTooltip id="EditTip" place="top" effect="solid">
              Edit Details
            </ReactTooltip>
            <button
              data-tip
              data-for="DeleteTip"
              type="button"
              className="bg-transparent  button-focus ml-2"
              onClick={() => {
                setShowDelete(true);
                setSelectedID(index);
              }}
            >
              <FontAwesomeIcon style={{ fontSize: 15 }} icon={faTrash} />
            </button>
            <ReactTooltip id="DeleteTip" place="top" effect="solid">
              Delete Record
            </ReactTooltip>
          </div>
           {allLeads.length > 0 && selectedID !== null ? (
            <>
              <ModalPlay item={allLeads[selectedID]} />
              <ModalDelete item={allLeads[selectedID]} />
              <ModalView item={allLeads[selectedID]} />
              <ModalEdit item={allLeads[selectedID]} />
            </>
          ) : null}
        </td>
       */}
      </tr>
    );
  };
  return (
    <Container fluid>
      <Row className="shadow p-3 mb-3 bg-white rounded mt-4 ">
      <IconButton
          onClick={() => {
            history.push("/admin/leads");
          }}
          aria-label="delete"
          color="primary"
        >
          <Tooltip title="Go Back" placement="right" arrow>
            <ArrowBackIcon />
          </Tooltip>
        </IconButton>
        <Col lg={10} sm={10} xs={10} xl={11}>
          <h3 style={{ color: "#818181" }}>
            Closed Leads
          </h3>
        </Col>

        <Col lg={2} sm={2} xs={2} xl={1} id="floatSidebar">
          <div className="float-right ">
            <SwipeableTemporaryDrawer/>
          </div>
        </Col>
      </Row>

      <PreLoading startLoading={isLoading} />

      <SuccessNotification
        showSuccess={showSuccessAlert}
        message={message}
        closeSuccess={setShowSuccessAlert}
      />
      <ErrorNotification
        showError={showErrorAlert}
        message={message}
        closeError={setShowErrorAlert}
      />

      <Row className="shadow p-3 mb-3 bg-white rounded mt-4 ">
        
        <div className="table-responsive">
          <table className="table table-hover" >
            <thead>
              <tr>
                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    ID
                  </span>
                </th>
                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Clients
                  </span>
                </th>
                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Contacts
                  </span>
                </th>

                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Email
                  </span>
                </th>

                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Project
                  </span>
                </th>

                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Budget
                  </span>
                </th>
                {/* <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Serial_No
                  </span>
                </th> */}
                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Interest
                  </span>
                </th>

                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    TOC
                  </span>
                </th>

                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Country/City
                  </span>
                </th>
                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Source
                  </span>
                </th>

                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Status
                  </span>
                </th>

                {/* <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Interest
                      </span>
                    </th> */}
                <th scope="col" class="text-nowrap">
                  <span id="sn" style={{ color: "#818181" }}>
                    {" "}
                    Allocated To
                  </span>
                </th>

                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Task
                  </span>
                </th>
                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Deadline
                  </span>
                </th>
                {/* <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Show_Employee_action
                  </span>
                </th> */}

                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Recording
                  </span>
                </th>
{/* 
                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Call_To_Action
                  </span>
                </th>

                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Action
                  </span>
                </th> */}
              </tr>
            </thead>
            <tbody>
              {allLeads.length > 0 ? (
                allLeads.map((lead, index) => (
                  <LeadTable item={lead} index={index} />
                ))
              ) : ( 
                <Snackbar
                  open={gobackState}
                  autoHideDuration={6000}
                  // anchorOrigin={{ vertical: "top", horizontal: "left" }}
                  anchorOrigin={{ vertical: "center", horizontal: "center" }}
                >
                  <Alert variant="filled" severity="error">
                    No Lead to Show
                    <MaterialButton
                          variant="text"
                          onClick={() => {
                            history.push("/admin/leads");
                          }}
                          classes={{ label: classes.myButton }}
                        >
                          Click to GO Back
                        </MaterialButton>
                  </Alert>
                </Snackbar>
              )}

              {/* <h1>Other Leads</h1>
                  {data.map((item, index) => {
                    return <TableEmployee item={item} index={index} />;
                  })} */}
            </tbody>
          </table>
        </div>
        
      </Row>
    </Container>
  );
}
