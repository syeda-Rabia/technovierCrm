import "./../../Admin/Leads/LeadsAdmin.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt,faEye } from "@fortawesome/free-solid-svg-icons";

import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { AddCategory } from "./../../../assests/constants/addcategory";
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
} from "@material-ui/core";
import {  useHistory, Redirect, Route } from "react-router-dom";
import { makeStyles, Backdrop, CircularProgress } from "@material-ui/core";
import SuccessNotification from "../../../components/SuccessNotification";
import ErrorNotification from "../../../components/ErrorNotification";
import PreLoading from "../../../components/PreLoading";
import TextEditor from "../../../components/editor/TextEditor";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    "& .MuiCircularProgress-colorPrimary": {
      color: "#fff",
    },
  },
}));
export default function AddPolicies() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

 
  const [showView, setShowView]= useState(false);
  const [data, setData] = useState([]);
  // const [data, setData] = useState([]);
  const [selectedID, setSelectedID] = useState(0);
  const [message, setMessage] = React.useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleFetchData = async () => {
    setIsLoading(true);
    let res = await GET(ApiUrls.GET_EMPLOYEE_POLICY_LIST);
    console.log("ress0", res);
    if (res.success != false) {
      setData(res.data.policies);
    }
    setIsLoading(false);
  };
  // React.useEffect(() => {
  //   handleFetchData();
  // }, []);
  useEffect(() => {
    handleFetchData();
  }, [refresh]);
  const history = useHistory();

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
            View policy
          </Modal.Title>
        </Modal.Header>
        <div className="col-lg-12 shadow   bg-white rounded ">
          <form>
            <Modal.Body>
              <div style={{ alignContent: "center" }}>
                <div className="pb-3">
                  <h6>Policy Title </h6>
                  <input className="form-control  w-100" value={item.title} />
                </div>
                <h6>Policy Description</h6>
                <div className="pb-3 border border-black" >
                 
                  <div  className="p-3" dangerouslySetInnerHTML={{__html: item.body}} />
                  {/* <TextArea
                  dangerouslySetInnerHTML={{__html:item.Description}}
                    className="form-control w-100 "
                    // value={item.Description}
                  /> */}
                  {/* <CKEditor data={item.Description} 
               /> */}
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

 
  
  const Table = ({ item, index }) => {
    //  ;
    return (
      <tr>
        
        <td >{index+1}</td>
        <td >{item.title}</td>
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
          <h3 style={{ color: "#818181" }}>Policies</h3>
        </Col>
        </Row>
     
      
        <Row className=" shadow p-3  bg-white rounded ml-2 mr-1">
         
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col" style={{ color: "#818181" }}>
                    ID
                  </th>

                  <th scope="col" style={{ color: "#818181" }}>
                Title
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
                 
                  <ModalView  item={data[selectedID]} />
                </>
              ) : null}
            </table>
           
          </div>
        
      </Row>
    </Container>
  );
}
