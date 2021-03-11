// import React from 'react';
import "./LeadsAdmin.css";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Dropfile from "../../../utils/Dropfile";
import { Link, Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormPopover from "../../../components/Sidebar/FormPopover";
import {
  faEye,
  faPencilAlt,
  faTrash,
  faPlusSquare,
  faPlay,
  faPause,
  faCross,
  faRedo,
  faLessThanEqual,
} from "@fortawesome/free-solid-svg-icons";

import sample from "./../../../assests/sample.mp3";
import sample2 from "./../../../assests/sample2.mp3";
import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { LeadsData } from "./../../../assests/constants/Leadsadmindata";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import {
  KeyboardDatePickerExample,
  KeyboardTimePickerExample,
} from "../../../utils/KeyboardTimePickerExample";
import { Divider } from "antd";
import { publicURL } from "./../../../utils/Config";
import { GET, POST } from "../../../utils/Functions";
import ApiUrls from "../../../utils/ApiUrls";
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
} from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";

import { validateEmail, validateMobile } from "../../../utils/Validation";
import CTAButton from "../../../components/CTAButton";
import ReactTicker from "../../../components/Ticker/ReactTicker";
import Ticker from "react-ticker";
import LeadsMobileViewSidebar from "../../../components/Sidebar/LeadsMobileViewSidebar";
import SwipeableTemporaryDrawer from "../../../components/Sidebar/LAAMobileViewSidebar";
import SuccessNotification from "../../../components/SuccessNotification";
import ErrorNotification from "../../../components/ErrorNotification";
import { Alert } from "@material-ui/lab";
import PreLoading from "../../../components/PreLoading";
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

export default function LeadsAdmin(props) {
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
  const [showEdit, setShowEdit] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const [showView, setShowView] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [setPlay, setShowPlay] = useState(false);
  const [showReset, setshowReset] = useState(false);
  var today = new Date();
  const [recordings, setRecordings] = useState([]);

  var timee = today.toString().match(/(\d{2}\:\d{2}\:\d{2})/g)[0];

  const classes = useStyles();
  console.log("props",props);
  useEffect(() => {
    // setIsLoading(true);
    getAllLeadsData();
    FetchInterestData();
  }, [refresh]);
  useEffect(() => {
  
  if(props.searchData.search==true) {setFilterdata();}
  // else setshowReset(false)
  }, [props.searchData.search]);

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
    setIsLoading(true);
    let resp = await GET(ApiUrls.GET_ALL_LEADS);

    if (resp.data != null) {
      setAllLeads(resp.data.leads);
    }
console.log("**********************************leads-----------------------------",resp)
    setIsLoading(false);

    //  ;
    //  ;
  };
const setFilterdata = async () => {
 
  setshowReset(true);
  setIsLoading(true);
  let res = await GET(props.searchData.url);
  console.log("response ---------------", res);
  if (res.error === false) {
    setAllLeads(res.data.leads);
    setMessage("Lead find Successfully");
    setShowSuccessAlert(true);
  } else {

    setMessage("Lead Not found");
    setShowErrorAlert(true);
    setshowReset(false);
  }

  setIsLoading(false);
};

  const currencyFormat = (num) => {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "PKR";
  };
  //  console.log(currencyFormat(2665));
  const ModalAdd = ({}) => {
    const [allProjects, setAllProjects] = useState([]);
    const [project, setProject] = useState();
    const [allSource, setAllSource] = useState([
      "Newspaper",
      "Digital Marketing",
      "Other",
      "TV",
      "Personal Personal",
      "SMS",
      "Outdoor",
    ]);

    const [selectedSource, setSelectedSource] = useState("");

    const [client, setClient] = useState("");
    const [contact, setContact] = useState("");
    const [budget, setBudget] = useState("");

    const [country, setCountry] = useState("");
    const [interestID, setInterestID] = useState();

    const [emailError, setEmailError] = useState(false);

    const [email, setEmail] = useState("");
    const [innerLoading, setInnerLoading] = useState(false);

    const formatDate = (date) => {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    };

    var datee = formatDate(today);
    const [time, setTime] = useState(timee);

    const HandleTimeValue = (value) => {
      const str = value.toString();
      var res = str.match(/(\d{2}\:\d{2}\:\d{2})/g)[0];

      setTime(res);
    };
    useEffect(() => {
      setInnerLoading(true);
      getProjectDetails();
    }, []);

    // useEffect(() => {
    //   getInventroyDataAgaintsProject(project);
    // }, [project]);

    const getProjectDetails = async () => {
      let resp = await GET(ApiUrls.GET_ALL_PROJECTS);

      if (resp.data != null) {
        setAllProjects(resp.data.projects.data);
      }
      setInnerLoading(false);
    };

    // const getInventroyDataAgaintsProject = async (id) => {
    //   let resp = await GET("admin/inventory/all/" + id);

    //   if (resp.data != null) {
    //     let { inventories } = resp.data;
    //     setInterest(inventories);
    //   }
    // };

    const SendRecordToServer = async (event) => {
      event.preventDefault();

      // send data to server
      let formData = {
        client_name: client,
        contact: contact,
        source: selectedSource,
        time_to_call: time,
        phone: contact,
        email: email,
        // inventory_id: inventory,
        interest_id: interestID,
        project_id: project,
        budget: budget,
        country_city: country,
      };
      console.log(formData);
      let resp = await POST(ApiUrls.CREATE_LEAD, formData);
      if (resp.error.hasOwnProperty("interest_id")) {
        setMessage("Lead Not Submitted. Interest field is Required.");
        setShowErrorAlert(true);
      }
      setMessage("Lead added Successfully");
      setShowSuccessAlert(true);

      console.trace(resp);

      setRefresh(!refresh);
      //  ;
      //  ;

      setShowAdd(false);
    };

    return (
      <Modal
        show={showAdd}
        onHide={() => {
          setShowAdd(false);
        }}
      >
        {innerLoading == true ? (
          <>
            <Backdrop className={classes.backdrop} open={true}>
              <CircularProgress disableShrink />
            </Backdrop>
          </>
        ) : null}

        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#818181" }}>Add Lead</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            SendRecordToServer(e);
          }}
        >
          <div>
            <Modal.Body>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Col>
                  <div className="pb-3">
                    <h6>Client</h6>
                    <Input
                      required="true"
                      className="form-control input-width w-100 "
                      placeholder="Enter  Name"
                      type="text"
                      value={client}
                      onChange={(e) => {
                        setClient(e.target.value);
                      }}
                    />
                  </div>
                  <div className="pb-3">
                    <h6>Contact</h6>
                    <Input
                      required="true"
                      className="form-control input-width w-100 "
                      placeholder="Enter Contact"
                      type="tel"
                      minLength="11"
                      maxLength="11"
                      value={contact}
                      onChange={(e) => {
                        if (e.target.value.match(/(^[0-9]*$)/g))
                          setContact(e.target.value);
                      }}
                    />
                  </div>
                  <div className="pb-3">
                    <h6>Email</h6>
                    <Input
                      required="true"
                      error={emailError ? true : false}
                      className="form-control input-width w-100"
                      placeholder="Enter email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        if (validateEmail(e.target.value)) {
                          // DO Somtin
                          // console.log("a");
                          setEmailError(false);
                        } else {
                          // do some
                          // console.log("b");

                          setEmailError(true);
                        }
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className="pb-3">
                    <h6>Country_City</h6>
                    <Input
                      required="true"
                      className="form-control input-width w-100"
                      placeholder="Enter Country"
                      type="text"
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                    />
                  </div>
                  <div className="pb-3">
                    <h6>Time of Call</h6>
                    <div className="form-control w-100">
                      <KeyboardTimePickerExample
                        value={today}
                        showTime={HandleTimeValue}
                        // onChange={(e) => {
                        //   setTime(formatDate(e.target.value));
                        //    ;
                        // }}
                      />
                    </div>
                  </div>
                </Col>
                <Col className="ml-3">
                  <div className="pb-3">
                    <h6>Project</h6>
                    <Select
                      className="form-control form-control-sm w-100"
                      value={project}
                      onChange={(e) => {
                        console.log(
                          "select project ID is -----",
                          e.target.value
                        );
                        setProject(e.target.value);
                      }}
                    >
                      {allProjects.length > 0
                        ? allProjects.map((pro) => (
                            <MenuItem key={pro.id} value={pro.id}>
                              {pro.name}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  </div>
                  <div className="pb-3">
                    <h6 style={{ marginTop: 7 }}>Interest</h6>
                    <Select
                      className="form-control form-control-sm w-100"
                      // value={interest}
                      onChange={(e) => {
                        console.log(
                          "selected Inventriry is ---- ",
                          e.target.value
                        );
                        setInterestID(e.target.value);
                      }}
                    >
                      {interestList.length > 0
                        ? interestList.map((int, index) => (
                            <MenuItem key={int.id} value={int.id}>
                              {int.interest}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  </div>

                  <div className="pb-3">
                    <h6>Budget</h6>
                    <Input
                      required="true"
                      className="form-control input-width w-100"
                      placeholder="Enter Budget"
                      type="text"
                      value={budget}
                      onChange={(e) => {
                        setBudget(e.target.value);
                      }}
                    />
                  </div>

                  <div className="pb-3">
                    <h6>Source</h6>
                    <Select
                      value={selectedSource}
                      onChange={(e) => {
                        setSelectedSource(e.target.value);
                      }}
                      className="form-control form-control-sm w-100"
                    >
                      {allSource.length > 0
                        ? allSource.map((src) => (
                            <MenuItem key={src} value={src}>
                              {src}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  </div>
                </Col>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                style={{ backgroundColor: "#2258BF" }}
                onClick={() => {
                  setShowAdd(false);
                }}
              >
                Close
              </Button>
              <Button
                style={{ backgroundColor: "#2258BF" }}
                type="submit"
                value="Submit"
              >
                Submit
              </Button>
            </Modal.Footer>
          </div>
        </form>
      </Modal>
    );
  };
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
      getProjectDetails();
    }, []);

    useEffect(() => {
      getInventroyDataAgaintsProject(project);
    }, [project]);

    const getProjectDetails = async () => {
      let resp = await GET(ApiUrls.GET_ALL_PROJECTS);

      if (resp.data != null) {
        setAllProjects(resp.data.projects.data);
      }
      setInnerLoading(false);

      // console.log(
      //   "response in Leads ------",
      //   JSON.stringify(resp.data.users.data)
      // );
    };

    const getInventroyDataAgaintsProject = async (id) => {
      let resp = await GET("admin/inventory/all/" + id);

      if (resp.data != null) {
        let { inventories } = resp.data;
        setInterest(inventories);
      }
      //  ;
    };

    const SendRecordToServer = async (event) => {
      event.preventDefault();

      // send data to server
      let formData = {
        id: item.id,
        client_name: client,
        contact: contact,
        source: selectedSource,
        phone: contact,
        email: email,
        interest_id: interestID,
        project_id: project,
        budget: budget,
        country_city: country,
        time_to_call: time,
      };

      let resp = await POST(ApiUrls.EDIT_LEAD, formData);
      console.log(resp);

      if (resp.error === false) {
        setMessage("Lead Edited Successfully");
        setShowSuccessAlert(true);
      } else {
        setMessage("Lead Not Edited");
        setShowErrorAlert(true);
      }

      setRefresh(!refresh);

      setShowEdit(false);
    };

    return (
      <Modal
        show={showEdit}
        onHide={() => {
          setShowEdit(false);
        }}
      >
        {innerLoading == true ? (
          <>
            <Backdrop className={classes.backdrop} open={true}>
              <CircularProgress disableShrink />
            </Backdrop>
          </>
        ) : null}

        <Modal.Header
          closeButton
          // className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2"
        >
          <Modal.Title style={{ color: "#818181" }}>Edit Lead</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            SendRecordToServer(e);
          }}
        >
          <div>
            <Modal.Body>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Col>
                  <div className="pb-3">
                    <h6>Client</h6>
                    <Input
                      required="true"
                      className="form-control input-width w-100 "
                      placeholder="Enter  Name"
                      type="text"
                      value={client}
                      onChange={(e) => {
                        setClient(e.target.value);
                      }}
                    />
                  </div>
                  <div className="pb-3">
                    <h6>Contact</h6>
                    <Input
                      required="true"
                      className="form-control input-width w-100 "
                      placeholder="Enter Contact"
                      type="tel"
                      minLength="11"
                      maxLength="11"
                      value={contact}
                      onChange={(e) => {
                        setContact(e.target.value);
                      }}
                    />
                  </div>
                  <div className="pb-3">
                    <h6>Email</h6>
                    <Input
                      required="true"
                      error={emailError ? true : false}
                      className="form-control input-width w-100"
                      placeholder="Enter email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        if (validateEmail(e.target.value)) {
                          // DO Somtin
                          setEmailError(false);
                        } else {
                          // do some
                          setEmailError(true);
                        }
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className="pb-3">
                    <h6>Country_City</h6>
                    <Input
                      required="true"
                      className="form-control input-width w-100"
                      placeholder="Enter Country"
                      type="text"
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                    />
                  </div>
                  <div className="pb-3">
                    <h6>Time of Call</h6>
                    <KeyboardTimePickerExample
                      value={today}
                      showTime={HandleTimeValue}
                      // onChange={(e) => {
                      //   setTime(formatDate(e.target.value));
                      //    ;
                      // }}
                    />
                  </div>
                </Col>
                <Col className="ml-3">
                  <div className="pb-3">
                    <h6>Project</h6>
                    {/* <TextField defaultValue={item.project.name} /> */}
                    <Select
                      className="form-control form-control-sm w-100"
                      defaultValue={item.project.id}
                      onChange={(e) => {
                        console.log(
                          "select project ID is -----",
                          e.target.value
                        );
                        setProject(e.target.value);
                      }}
                    >
                      {allProjects.length > 0
                        ? allProjects.map((pro) => (
                            <MenuItem key={pro.id} value={pro.id}>
                              {pro.name}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  </div>
                  <div className="pb-3">
                    <h6 style={{ marginTop: 7 }}>Interest</h6>

                    <Select
                      className="form-control form-control-sm w-100"
                      defaultValue={
                        item.interest !== null ? item.interest.id : null
                      }
                   
                      onChange={(e) => {
                        console.log(
                          "selected Inventriry is ---- ",
                          e.target.value
                        );
                        setInterestID(e.target.value);
                      }}
                    >
                      {interestList.length > 0 ? (
                        interestList.map((int, index) => (
                          <MenuItem key={int.id} value={int.id}>
                            {int.interest}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="">
                          <em>No Inventory Against this Project.</em>
                        </MenuItem>
                      )}
                    </Select>
                  </div>

                  {/* <div className="pb-3">
                  <h6>Task</h6>
                  <Select
                    value={task}
                    onChange={(e) => {
                      setTask(e.target.value);
                    }}
                    className="form-control form-control-sm w-100"
                  >
                    <MenuItem value={"Sale"}>Sale</MenuItem>
                    <MenuItem value={"rent"}>Rent</MenuItem>
                    <MenuItem value={"other"}>other</MenuItem>
                  </Select>
                </div> */}

                  <div className="pb-3">
                    <h6>Budget</h6>
                    <Input
                      required="true"
                      className="form-control input-width w-100"
                      placeholder="Enter Budget"
                      type="text"
                      value={budget}
                      onChange={(e) => {
                        setBudget(e.target.value);
                      }}
                    />
                  </div>

                  <div className="pb-3">
                    <h6>Source</h6>
                    <Select
                      defaultValue={item.source}
                      // value={selectedSource}
                      onChange={(e) => {
                        setSelectedSource(e.target.value);
                      }}
                      className="form-control form-control-sm w-100"
                    >
                      {allSource.length > 0
                        ? allSource.map((src) => (
                            <MenuItem key={src} value={src}>
                              {src}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  </div>
                </Col>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                style={{ backgroundColor: "#2258BF" }}
                onClick={() => {
                  setShowEdit(false);
                }}
              >
                Close
              </Button>
              <Button
                style={{ backgroundColor: "#2258BF" }}
                type="submit"
                value="Submit"
              >
                Submit
              </Button>
            </Modal.Footer>
          </div>
        </form>
      </Modal>
    );
  };
  console.log(recordings,"Recording")
  const HandleAudioModule = ({
    recording,
    setActiveAudio,
    activeAudio,
    index,
    item,
  }) => {
    // console.log(recording,"Recording Audio")
    const [audioTune, setAudioTune] = useState((recording));
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
          <div style={{ display: "flex", flexDirection: "row" }}>
            <p class="marquee">
              <span
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                {" "}
                <span>
                  <b>Created Date :</b> {item.created_at}
                </span>{" "}
                <span style={{ marginLeft: "50px" }}>
                  <b>File Name: </b>
                  {item.recording_file}
                </span>{" "}
              </span>

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
  useEffect(()=>{
    setRecordings(state=>state.map((item)=>{
        item.audio.pause();
      return item;
    }))
  },[setPlay])
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
                  recording={recording.audio}
                  activeAudio={activeAudio}
                  index={index}
                  setActiveAudio={setActiveAudio}
                  item={recording.item}
                />
              );
            })}
            {/* <Card
              className="shadow  bg-white rounded "
              style={{
                width: "80%",
                height: "40px",
                marginTop: "20px",
                marginLeft: "35px",
              }}
            >
              <Card.Body>
                <span className="spn1">31/12/2020</span>
                <span className="spn2">Recording 2</span>
                {playAudio2 ? (
                  <button
                    type="button"
                    className="bg-transparent  button-focus mr-2 button-bg"
                    onClick={pauseSound2}
                  >
                    <FontAwesomeIcon
                      style={{ fontSize: 15 }}
                      icon={faPause}
                    />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="bg-transparent  button-focus mr-2 button-bg"
                    onClick={playSound2}
                  >
                    <FontAwesomeIcon style={{ fontSize: 15 }} icon={faPlay} />
                  </button>
                )}
              </Card.Body>
            </Card>
        */}
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

  const ModalView = ({ item }) => {
    // console.log(
    //   "____________________________________________________________________",
    //   item
    // );

    const [client, setClient] = useState(item.client_name);
    const [contact, setContact] = useState(item.contact);
    const [budget, setBudget] = useState(item.budget);

    const [country, setCountry] = useState(item.country_city);
    // const [status, setStatus] = useState("New");

    const [emailError, setEmailError] = useState(false);

    const [email, setEmail] = useState(item.email);

    return (
      <Modal
        show={showView}
        onHide={() => {
          setShowView(false);
        }}
      >
        <Modal.Header
          closeButton
          // className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2"
        >
          <Modal.Title style={{ color: "#818181" }}>Lead Record</Modal.Title>
        </Modal.Header>
        <div>
          <Modal.Body>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Col>
                <div className="pb-3">
                  <h6>Client</h6>
                  <Input
                    required="true"
                    disableUnderline
                    readOnly
                    className="form-control input-width w-100 "
                    placeholder="Enter  Name"
                    type="text"
                    value={client}
                  />
                </div>
                <div className="pb-3">
                  <h6>Contact</h6>
                  <Input
                    required="true"
                    disableUnderline
                    readOnly
                    className="form-control input-width w-100 "
                    placeholder="Enter Contact"
                    type="tel"
                    minLength="11"
                    maxLength="11"
                    value={contact}
                  />
                </div>
                <div className="pb-3">
                  <h6>Email</h6>
                  <Input
                    required="true"
                    disableUnderline
                    readOnly
                    error={emailError ? true : false}
                    className="form-control input-width w-100"
                    placeholder="Enter email"
                    type="email"
                    value={email}
                  />
                </div>
                <div className="pb-3">
                  <h6>Country_City</h6>
                  <Input
                    required="true"
                    disableUnderline
                    readOnly
                    className="form-control input-width w-100"
                    placeholder="Enter Country"
                    type="text"
                    value={country}
                  />
                </div>
                <div className="pb-3">
                  <h6>Time of call</h6>
                  <Input
                    required="true"
                    disableUnderline
                    readOnly
                    className="form-control input-width w-100"
                    placeholder="Enter Country"
                    type="text"
                    value={item.time_to_call}
                  />
                </div>
                <div className="pb-3">
                  <h6>Allocated to</h6>
                  <Input
                    disableUnderline
                    readOnly
                    className="form-control input-width w-100"
                    placeholder="Enter Country"
                    type="text"
                    value={
                      item.allocation.length > 0
                        ? item.allocation[0].allocated_to.first_name
                        : "-------"
                    }
                  />
                </div>
              </Col>
              <Col className="ml-3">
                <div className="pb-2">
                  <h6>Project</h6>
                  <Input
                    required="true"
                    disableUnderline
                    readOnly
                    className="form-control input-width w-100"
                    placeholder="Enter Country"
                    type="text"
                    defaultValue={item.project.name}
                  />
                </div>
                <div className="pb-3">
                  <h6 style={{ marginTop: 7 }}>Interest</h6>
                  <Input
                    required="true"
                    disableUnderline
                    readOnly
                    className="form-control input-width w-100"
                    // placeholder=""
                    type="text"
                    defaultValue={
                      item.interest !== null
                        ? item.interest.interest
                        : "NO INTEREST"
                    }
                  />
                </div>

                <div className="pb-3">
                  <h6>Budget</h6>
                  <Input
                    required="true"
                    disableUnderline
                    readOnly
                    className="form-control input-width w-100"
                    placeholder="Enter Budget"
                    type="text"
                    value={budget}
                  />
                </div>

                <div className="pb-3">
                  <h6>Source</h6>
                  <Input
                    required="true"
                    disableUnderline
                    readOnly
                    className="form-control input-width w-100"
                    placeholder="Enter Country"
                    type="text"
                    defaultValue={item.source}
                  />
                </div>
                <div className="pb-3">
                  <h6>Deadline</h6>
                  <Input
                    required="true"
                    disableUnderline
                    readOnly
                    className="form-control input-width w-100"
                    type="text"
                    defaultValue={
                      item.dead_line != null ? item.dead_line : "-------"
                    }
                  />
                </div>
                <div className="">
                  <h6>Status</h6>
                  <Input
                    required="true"
                    disableUnderline
                    readOnly
                    className="form-control input-width w-100"
                    placeholder="Enter Country"
                    type="text"
                    defaultValue={item.status}
                  />
                </div>
              </Col>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    );
  };

  const ModalDelete = ({ item }) => {
    console.log(item);
    const DeleteRecordFromData = async () => {
      let res = await GET(ApiUrls.DELETE_LEAD + item.id);
      if (res.error === false) {
        setMessage("Lead Deleted Successfully");
        setShowSuccessAlert(true);
      } else {
        setMessage("Lead Not Deleted");
        setShowErrorAlert(true);
      }
      console.log(res);
      setRefresh(!refresh);
    };
    return (
      <Modal
        show={showDelete}
        onHide={() => {
          setShowDelete(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#818181" }}>Delete Record</Modal.Title>
        </Modal.Header>
        <div>
          <Modal.Body>Do you really want to delete this Record!</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowDelete(false);
              }}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                DeleteRecordFromData();
                setShowDelete(false);
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    );
  };
  const LeadTable = ({ item, index }) => {
    // console.log(item);
    let country_city = "country/city";
    return (
      <tr>
        <td id="sn" >{index + 1}</td>
        <td >{item.client_name}</td>
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
          {item.status != "" ? (
            <Chip
              classes={{
                label: classes.chipLabelColor,
                root:
                  item.status === "Overdue"
                    ? classes.chipOverdue
                    : item.status === "Grace Period"
                    ? classes.chipGracePeriod
                    : item.status === "Complete"
                    ? classes.chipComplete
                    : item.status === "Follow up"
                    ? classes.chipFollowUp
                    : item.status === "Allocated"
                    ? classes.chipAllocated
                    : null,
              }}
              label={item.status}
            />
          ) : (
            "-------"
          )}
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

        {/* <td>{item.Allocate}</td>
        <td>{item.Email}</td>
        <td>{item.Task}</td>
        <td>{item.Deadline}</td> */}
        <td>
          <Link to={{ pathname: "/admin/emp-action", query: { item } }}>
          <button
              data-tip
              data-for="abc"
              type="button "
              className="bg-transparent  button-focus mr-2"
              // onClick={() => {
              //   setShowEdit(true);
              //   setSelectedID(index);
              // }}
            >
              <FontAwesomeIcon style={{ fontSize: 15 }} icon={faEye} />
            </button>
            </Link>
            <ReactTooltip id="abc" place="top" effect="float">
              View Employee Action
            </ReactTooltip>
            
        </td>

        <td>
          {item.recordings.length > 0 ? (
            <>
              <button
                data-tip
                data-for="play"
                type="button"
                className="bg-transparent  button-focus mr-2"
                onClick={() => {
                  // isLoading(true);
                  // let arr=[sample,sample,sample];
                  setRecordings(item.recordings.map((item)=>{return {audio:(new Audio(publicURL + item.recording_file)),item:item}}));
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
            "-----"
          )}
        </td>

        <td>
          {item.allocation.length > 0 ? (
            <CTAButton
              // leadId={item.allocation[0].lead_id}
              empId={item.allocation[0].allocated_to.id}
              lead_id={item.id}
              // status={item.status}
            />
          ) : (
            "-------"
          )}
        </td>

        <td>
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
              className="bg-transparent  button-focus mr-2"
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
        </td>
      </tr>
    );
  };
  return (
    <Container fluid>
      <Row className="shadow p-3 mb-3 bg-white rounded mt-4 ">
        <Col lg={10} sm={10} xs={10} xl={11}>
          <h3 style={{ color: "#818181" }}>
            Leads<sub>(Admin)</sub>
          </h3>

        </Col>  
        {/* {setReset==true?(
        <button
            type="button"
            className="btn btn-primary leadbtn" 
            onClick={() => {
              getAllLeadsData();
            }}
            style={{
              backgroundColor: "#2258BF",
            }}
          >
            <FontAwesomeIcon icon={faRedo} /> reverse filter
          </button>
        ):null} */}
        <Col lg={2} sm={2} xs={2} xl={1} id="floatSidebar">
          <div className="float-right ">
            <SwipeableTemporaryDrawer  update={props.update} />
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

      <Row className="shadow p-3 mb-3 bg-white rounded mt-4">
        <Row className=" pl-2 md-5 col-md-12" >
          <div classname="searchbtn" style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
<div style={{display:'flex'}}>

          <div className=" pl-2 ">
           
            <Dropfile setRefresh={setRefresh}/>
          </div>
          <div>
            <Link to="/admin/add-interest">
              <button
                type="button"
                className="btn btn-primary"
                style={{
                  backgroundColor: "#2258BF",
                }}
              >
                <FontAwesomeIcon icon={faPlusSquare} /> Add Interest
              </button>
            </Link>
          </div>
          <div>

          <button
            type="button"
            className="btn btn-primary leadbtn" 
            onClick={() => {
              setShowAdd(true);
            }}
            style={{
              backgroundColor: "#2258BF",
            }}
          >
            <FontAwesomeIcon icon={faPlusSquare} /> Add Lead
          </button>
          </div>
</div>
        <div style={{display:'flex'}}>

         
          <div>
          {showReset==true?(

         

            <button
              type="button"
              className="btn btn-primary leadbtn ml-3" 
              onClick={() => {
               
                getAllLeadsData();
               
                setshowReset(false);
              }}
              style={{
                backgroundColor: "#2258BF",
              }}
            >
              <FontAwesomeIcon icon={faRedo} /> reverse filter
            </button>
            ):null}
          </div>
          <div className="pt-0">
          <FormPopover name="Search Leads" update={props.update}/>
          </div>
        </div>
          </div>
        </Row>
        <div className="table-responsive">
          <table className="table table-hover" style={{ minHeight: "200px" }}>
            <thead>
              <tr>
                <th scope="col">
                  <span id="sn" style={{ color: "#818181"}}>
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
                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    {" "}
                    Allocated_To
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
                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Show_Employee_action
                  </span>
                </th>

                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Recording
                  </span>
                </th>

                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Call_To_Action
                  </span>
                </th>

                <th scope="col">
                  <span id="sn" style={{ color: "#818181" }}>
                    Action
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {allLeads.length > 0 ? (
                allLeads.map((lead, index) => (
                  <LeadTable item={lead} index={index} />
                ))
              ) : (
                <Snackbar
                  open={true}
                  autoHideDuration={6000}
                  // anchorOrigin={{ vertical: "top", horizontal: "left" }}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                  <Alert variant="filled" severity="info">
                    No Lead to Show
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
        {allLeads.length > 0 && selectedID !== null ? (
          <>
            <ModalPlay item={allLeads[selectedID]} />
            <ModalDelete item={allLeads[selectedID]} />
            <ModalView item={allLeads[selectedID]} />
            <ModalEdit item={allLeads[selectedID]} />
          </>
        ) : null}
        <ModalAdd />
      </Row>
    </Container>
  );
}
