import "./../../SuperAdmin/DashBoard/SuperAdminDashboard.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt,faEye } from "@fortawesome/free-solid-svg-icons";
import { faTrash,faObjectGroup ,faUsers} from "@fortawesome/free-solid-svg-icons";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { packageManagement  } from "../../../assests/constants/packagemanagement";
import SwipeableTemporaryDrawer from "../../../components/Sidebar/SuperAdminMobileViewSidebar";
import "react-phone-number-input/style.css";
import ReactTooltip from "react-tooltip";
import { Alert, AlertTitle, Skeleton } from "@material-ui/lab";
// import { dummyData } from "../../../assests/constants/todoList";
import { server_url, token } from "../../../utils/Config";
import { GET, POST } from "./../../../utils/Functions";
import ApiUrls from "./../../../utils/ApiUrls";
import Pagination from "../../../components/Pagination/Pagination";
import {
  Tooltip,
  IconButton,
  Chip,
} from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";
import {  useHistory, Redirect, Route } from "react-router-dom";
import { makeStyles, Backdrop, CircularProgress } from "@material-ui/core";
import SuccessNotification from "../../../components/SuccessNotification";
import ErrorNotification from "../../../components/ErrorNotification";
import PreLoading from "../../../components/PreLoading";
import GroupIcon from '@material-ui/icons/Group';
import TextArea from "antd/lib/input/TextArea";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    "& .MuiCircularProgress-colorPrimary": {
      color: "#fff",
    },
  },
}));
export default function Management() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView]= useState(false);
  const [showClient, setShowClient]= useState(false);
  const [data, setData] = useState(packageManagement );
  // const [data, setData] = useState([]);
  const [selectedID, setSelectedID] = useState(0);
  const [message, setMessage] = React.useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleFetchData = async () => {
    // setIsLoading(true);
    // let res = await GET(ApiUrls.GET_ALL_INTEREST);
    // console.log("ress0", res);
    // if (res.success != false) {
    //   setData(res.data.Interest);
    // }
    // setIsLoading(false);
  };
  // React.useEffect(() => {
  //   handleFetchData();
  // }, []);
  useEffect(() => {
    handleFetchData();
  }, [refresh]);
  const history = useHistory();
  const ModalAdd = ({ item }) => {
    // const [interest, SetInterest] = useState("");
    const [package_name, SetPackageName]=useState("");
    const [duration, SetDuration]=useState("");
    const [description, SetDescription]=useState("");
    const [amount, SetAmount]=useState("");

    const addData = async (event) => {
      event.preventDefault();
      let postData = {
        id: "1",
       name: package_name,
        duration: duration, 
        description:description,
        amount:amount,
      
      };

      let arr = data;
      arr.push(postData);
      setData(arr);
      setShowAdd(false);
    };

      //api
      //*--------------------------------------
      // let postData = {
      //   interest: interest,
      // };
      // let res = await POST(ApiUrls.ADD_INTEREST, postData);
      // console.log("post request", res);
      // setRefresh(!refresh);

      // setShowAdd(false);
    // };
    // };
//*-------------------------------------------------------
    return (
      <Modal
        show={showAdd}
        onHide={() => {
          setShowAdd(false);
        }}
      >
        <Modal.Header
          closeButton
          className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2"
        >
          <Modal.Title style={{ color: "#818181" }}>Add Package</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            // SendRecordToServer(e);
          }}
        >
          <div className="col-lg-12 shadow bg-white rounded ">
            <Modal.Body>
              <div className="pb-3">
                <h6>Package Name</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter package"
                  type="text"
                  minLength="3"
                  maxLength="30"
                  value={package_name}
                  onChange={(e) => {
                    SetPackageName(e.target.value);
                  }}
                />
              </div>
             
              <div>
              <h6>Package Duration</h6>
              <input
                  className="form-control  w-100 "
                  placeholder="Enter Duration"
                  type="text"
                  minLength="3"
                  maxLength="30"
                  value={duration}
                  onChange={(e) => {
                    SetDuration(e.target.value);
                  }}
                />
              </div>
              <div className="pb-3">
                <h6>Amount</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter package amount"
                  type="number"
                  minLength="3"
                  maxLength="30"
                  value={amount}
                  onChange={(e) => {
                    SetAmount(e.target.value);
                  }}
                />
              </div>
              <div className="pb-3">
                <h6>Description</h6>
                <TextArea
                  className="form-control  w-100 "
                  placeholder="Enter Description"
                  type="number"
                  minLength="3"
                  maxLength="200"
                  value={description}
                  onChange={(e) => {
                    SetDescription(e.target.value);
                  }}
                />
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
                onClick={addData}
              >
                Add
              </Button>
            </Modal.Footer>
          </div>
        </form>
      </Modal>
    );
  };
  const ModalEdit = ({ item }) => {
    //  ;
    // const [interest, SetInterest] = useState(item.interest);
    const [package_name, SetPackageName]=useState(item.name);
    const [duration, SetDuration]=useState(item.duration);
    const [description, SetDescription]=useState(item.description);
    const [amount, SetAmount]=useState(item.amount);
    const EditRecordToServer = async (event) => {
      event.preventDefault();

      // add validations
      // push

      let packagedata = {
        id: item.id,
        name: package_name,
        duration: duration,
        description:description,
        amount:amount,
      };
      // let res = await POST(ApiUrls.EDIT_INTEREST, user);
      // if (res.error === false) {
      //   setMessage("Interest Edited Successfully");
      //   setShowSuccessAlert(true);
      // } else {
      //   setMessage("Interest Not Edited");
      //   setShowErrorAlert(true);
      // }
      // console.log(res);
      let arr = data.map((val) => {
        if (val.id == packagedata.id) val =packagedata;
        return val;
      });
      // arr.push(packagedata);
      setData(arr);
      // setShowAdd(false);
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
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#818181" }}>Edit Package</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            EditRecordToServer(e);
          }}
        >
          <div>
            <Modal.Body>
              {/*             
            <h6>ID</h6>
            <input className="form-control w-100"    placeholder="Enter id" /> */}
              <form>
                <div className="pb-3">
                  <h6>Package Name </h6>
                  <input
                    className="form-control w-100 "
                    placeholder="Enter Package name"
                    type="text"
                    value={package_name}
                    onChange={(e) => {
                      SetPackageName(e.target.value);
                    }}
                  />
                </div>
                <div>
                    <h6>Package Duration</h6>
                    <input
                    className="form-control w-100 "
                    placeholder="Enter Duration"
                    type="text"
                    value={duration}
                    onChange={(e) => {
                      SetDuration(e.target.value);
                    }}
                  />
                </div>
                <div className="pb-3">
                <h6>Amount</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter package amount"
                  type="number"
                  minLength="3"
                  maxLength="30"
                  value={amount}
                  onChange={(e) => {
                    SetAmount(e.target.value);
                  }}
                />
              </div>
              <div className="pb-3">
                <h6>Description</h6>
                <TextArea
                  className="form-control  w-100 "
                  placeholder="Enter Description"
                  type="number"
                  minLength="3"
                  maxLength="200"
                  value={description}
                  onChange={(e) => {
                    SetDescription(e.target.value);
                  }}
                />
              </div>
              </form>
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
                type="submit"
                value="Submit"
                style={{ backgroundColor: "#2258BF" }}
                onClick={(e) => {
                  setShowAdd(false);
                  // EditRecordToServer(e);
                }}
              >
                Edit
              </Button>
            </Modal.Footer>
          </div>
        </form>
      </Modal>
    );
  };
  const ModalView = ({ item }) => {
    return (
      <Modal
        show={showView}
        onHide={() => {
          setShowView(false);
        }}
      >
        <Modal.Header
          closeButton
          className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2"
        >
          <Modal.Title style={{ color: "#818181" }}>
            View Package Detail
          </Modal.Title>
        </Modal.Header>
        <div className="col-lg-12 shadow   bg-white rounded ">
          <form>
            <Modal.Body>
              <div style={{ alignContent: "center" }}>
                <div className="pb-3">
                  <h6>Package name </h6>
                  <input className="form-control  w-100" value={item.name} />
                </div>
                
                <div className="pb-3">
                <h6>Package Duration</h6>
                  <input className="form-control  w-100" value={item.duration} />
                </div>
                <div className="pb-3">
                <h6>Package Amount</h6>
                  <input className="form-control  w-100" value={item.amount} />
                </div>
                <div className="pb-3">
                <h6>Package Amount</h6>
                  <TextArea className="form-control  w-100" value={item.description} />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                style={{ backgroundColor: "#2258BF" }}
                onClick={() => {
                  setShowView(false);
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </form>
        </div>
      </Modal>
    );
  };

  const ModalClient = ({ item }) => {
    return (
      <Modal
        show={showClient}
        onHide={() => {
          setShowClient(false);
        }}
      >
        <Modal.Header
          closeButton
          className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2"
        >
          <Modal.Title style={{ color: "#818181" }}>
            View clients
          </Modal.Title>
        </Modal.Header>
        <div className="col-lg-12 shadow   bg-white rounded ">
          <form>
            <Modal.Body>
              <div style={{ alignContent: "center" }}>
                <div className="pb-3">
                  <h6>Clients </h6>
                  {item.client?.length > 0 
                        ? item.client.map((item) => (
                           
            <Chip
              icon={<FaceIcon />}
              variant="outlined"
              label={item}
              style={{ marginRight: "5px" }}
            />
          )) : (
            "-------"
          )}
                </div>
                
                {/* <div className="pb-3">
                <h6>Package Duration</h6>
                  <input className="form-control  w-100" value={item.duration} />
                </div> */}
                
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                style={{ backgroundColor: "#2258BF" }}
                onClick={() => {
                  setShowClient(false);
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </form>
        </div>
      </Modal>
    );
  };
  const ModalDelete = ({ item }) => {
    const DeleteRecordFromData = async (item) => {
      console.log("item is ", item);

      let { id } = item;
      console.log("ID is ", id);

      let arr = data;

      arr = arr.filter((user) => user.id != id.toString());

      console.log("arr length ", arr.length, arr, selectedID);
      setSelectedID((state) => {
        if (state == arr.length) return state - 1;
        return state;
      });
      setData(arr);
      setShowDelete(false);
      // let res = await GET(ApiUrls.DELETE_INTEREST + item.id);
      // setShowDelete(false);

      // if (res.error === false) {
      //   setMessage("Interest Deleted Successfully");
      //   setShowSuccessAlert(true);
      //   // setRefresh(!refresh);
      //   setSelectedID(0);
      // } else {
      //   setMessage("Interest Not Deleted");
      //   setShowErrorAlert(true);
      // }
      // console.log(res);
      // setRefresh(!refresh);
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
          <Modal.Body>Do you really want to delete this Record</Modal.Body>
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
                DeleteRecordFromData(item);
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    );
  };
  const Table = ({ item, index }) => {
    //  ;
    return (
      <tr>
        
        <td key={item.id}>{item.id}</td>
        <td key={item.id}>{item.name}</td>
      
        <td key={item.id}>{item.duration}</td>
        <td key={item.id}>{item.amount}</td>
        <td key={item.id}>{item.description}</td>
        <td>  <div
            className="d-flex d-inline "
            style={{
              justifyContent: "center",
            }}
          >
                <button
              data-tip
              data-for="Viewclient"
              type="button"
              className="bg-transparent  button-focus mr-2"
              onClick={() => {
                setShowClient(true);
                setSelectedID(index);
              }}
            >
              <FontAwesomeIcon style={{ fontSize: 15 }} icon={faUsers} />
            </button> 
            <ReactTooltip id="Viewclient" place="top" effect="solid">
              View Clients
            </ReactTooltip>
            
          </div>
        </td>
        <td>
          <div
            className="d-flex d-inline "
            style={{
              justifyContent: "center",
            }}
          >
                <button
              data-tip
              data-for="ViewTip"
              type="button"
              className="bg-transparent  button-focus mr-2"
              onClick={() => {
                setShowView(true);
                setSelectedID(index);
              }}
            >
              <FontAwesomeIcon style={{ fontSize: 15 }} icon={faEye} />
            </button> 
            <ReactTooltip id="ViewTip" place="top" effect="solid">
              View Details
            </ReactTooltip>
            <button
              data-tip
              data-for="EditTip"
              type="button "
              className="bg-transparent  button-focus mr-2"
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
    <Container fluid className="Laa">
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
      
        <Row className=" shadow p-3 mb-3 bg-white rounded mt-4 ml-1 mr-1">
        {/* <IconButton
          onClick={() => {
            history.push("/admin/leads");
          }}
          aria-label="delete"
          color="primary"
        >
          <Tooltip title="Go Back" placement="right" arrow>
            <ArrowBackIcon />
          </Tooltip>
        </IconButton> */}
        <Col lg={10} sm={10} xs={10} xl={11}>
          <h3 style={{ color: "#818181" }}>Package Management</h3>
        </Col>
        <Col lg={2} sm={2} xs={2} xl={1} id="floatSidebar">
              <div className="float-right drawer-div">
                <SwipeableTemporaryDrawer />
              </div>
            </Col>
        </Row>
     
      
        <Row className=" shadow p-3  bg-white rounded ml-2 mr-1">
          <button
            data-tip
            data-for="AddTip"
            type="button"
            className="btn btn-primary "
            style={{
              backgroundColor: "#2258BF",
            }}
            onClick={() => {
              setShowAdd(true);
            }}
          >
            <FontAwesomeIcon icon={faPlusSquare} />{""} Add Package
          </button>
          <ReactTooltip id="AddTip" place="top" effect="solid">
            Add new Package
          </ReactTooltip>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col" style={{ color: "#818181" }}>
                    ID
                  </th>


                  <th scope="col" class="text-nowrap" style={{ color: "#818181" }}>
                Package Name
                  </th>
                 
                  <th scope="col" style={{ color: "#818181" }}>
                    Duration
                  </th>
                  <th scope="col" style={{ color: "#818181" }}>
                    Amount
                  </th>
                  <th scope="col" class="text-nowrap" style={{ color: "#818181" }}>
                 Description
                  </th>
                  <th scope="col" class="text-nowrap" style={{ color: "#818181" }}>
                 Package Clients
                  </th>
                  <th scope="col" style={{ color: "#818181" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                
                {/* {data
                 
                  .map((item, index) => {
                    return <Table item={item} index={index} />;
                  })} */}
                  {data.map((item, index) => {
                  return <Table index={index} item={item} />;
                })}
              </tbody>
              {data.length > 0 ? (
                <>
                  <ModalDelete item={data[selectedID]} />
                  <ModalEdit item={data[selectedID]} />
                  <ModalView  item={data[selectedID]} />
                  <ModalClient item={data[selectedID]}/>    
                </>
              ) : null}
            </table>
            <ModalAdd />
          </div>
        
      </Row>
    </Container>
  );
}
