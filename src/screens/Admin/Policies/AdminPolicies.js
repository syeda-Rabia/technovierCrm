import "./../Leads/LeadsAdmin.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faEye } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
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
import { Tooltip, IconButton } from "@material-ui/core";
import { useHistory, Redirect, Route } from "react-router-dom";
import { makeStyles, Backdrop, CircularProgress } from "@material-ui/core";
import SuccessNotification from "../../../components/SuccessNotification";
import ErrorNotification from "../../../components/ErrorNotification";
import PreLoading from "../../../components/PreLoading";

import TextEditor from "../../../components/editor/TextEditor";


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
export default function AddPolicies() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView] = useState(false);
  const [data, setData] = useState([]);
  // const [data, setData] = useState([]);
  const [selectedID, setSelectedID] = useState(0);
  const [message, setMessage] = React.useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleFetchData = async () => {
    setIsLoading(true);
    let res = await GET(ApiUrls.GET_POLICY_LIST);
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
  const ModalAdd = ({ item }) => {
    // const [interest, SetInterest] = useState("");
    const [title, SetTitle] = useState("");
    const [description, SetDescription] = useState("");

    const addData = async (event) => {
      event.preventDefault();
      //   let postData = {
      //     id: "1",
      //     title: title,
      //     body: description,

      //   };

      //   let arr = data;
      //   arr.push(postData);
      //   setData(arr);
      //   setShowAdd(false);
      // };

      //api
      //*--------------------------------------
      let postData = {
        title: title,
        body: description,
      };
      let res = await POST(ApiUrls.ADD_POLICY_DETAILS, postData);
      console.log("post request", res);
      if (res.error === false) {
        setMessage("Policy Added Successfully");
        setShowSuccessAlert(true);
      } else {
        setMessage("Policy Not Added");
        setShowErrorAlert(true);
      }
      setRefresh(!refresh);

      setShowAdd(false);
    };

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
          <Modal.Title style={{ color: "#818181" }}>Add Policies</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            // SendRecordToServer(e);
          }}
        >
          <div className="col-lg-12 shadow bg-white rounded ">
            <Modal.Body>
              <div className="pb-3">
                <h6>Policies Title</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter title"
                  type="text"
                  minLength="3"
                  maxLength="30"
                  value={title}
                  onChange={(e) => {
                    SetTitle(e.target.value);
                  }}
                />
              </div>
              <div>
                <h6>Policy Description</h6>
             
                <TextEditor SetDescription={SetDescription} />
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
    const [title, SetTitle] = useState(item.title);
    const [description, SetDescription] = useState(item.body);
    const EditRecordToServer = async (event) => {
      event.preventDefault();

      // add validations
      // push

      let policy = {
        id: item.id,
        title: title,
        body: description,
      };
      let res = await POST(ApiUrls.EDIT_POLICY_DETAILS, policy);
      if (res.error === false) {
        setMessage("Policy Edited Successfully");
        setShowSuccessAlert(true);
      } else {
        setMessage("Policy Not Edited");
        setShowErrorAlert(true);
      }
      console.log(res);
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
          <Modal.Title style={{ color: "#818181" }}>Edit Policies</Modal.Title>
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
                  <h6>Policies Title </h6>
                  <input
                    className="form-control w-100 "
                    placeholder="Enter interest"
                    type="text"
                    value={title}
                    onChange={(e) => {
                      SetTitle(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <h6>policy Description</h6>
                  {/* <CKEditor
                    data={description}
                    onChange={(e) => {
                      console.log(e.editor.getData());
                      SetDescription(e.editor.getData());
                    }}
                  /> */}
                   <TextEditor 
                   value={description}
                   SetDescription={SetDescription} />
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
                  setShowEdit(false);
                  EditRecordToServer(e);
                  setData((state) =>
                    state.map((val) => {
                      if (val.id == item.id) {
                        val.Description = description;
                      }
                      return val;
                    })
                  );
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
          <Modal.Title style={{ color: "#818181" }}>View policy</Modal.Title>
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
                <div
                  className="pb-3 border border-black"
                  // style={{ backgroundColor: "#F2F4F5" }}
                >
                  <div
                    className="p-3"
                    dangerouslySetInnerHTML={{ __html: item.body }}
                  />
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

  const ModalDelete = ({ item }) => {
    const DeleteRecordFromData = async (item) => {
      let res = await GET(ApiUrls.DELETE_POLICY_DETAILS + item.id);
      setShowDelete(false);

      if (res.error === false) {
        setMessage("Policy Deleted Successfully");
        setShowSuccessAlert(true);
        // setRefresh(!refresh);
        setSelectedID(0);
      } else {
        setMessage("Policy Not Deleted");
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
        <td>{index + 1}</td>
        <td>{item.title}</td>
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
          <h3 style={{ color: "#818181" }}>Policies</h3>
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
          <FontAwesomeIcon icon={faPlusSquare} />
          Add Policies
        </button>
        <ReactTooltip id="AddTip" place="top" effect="solid">
          Add new interest
        </ReactTooltip>

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
                <ModalDelete item={data[selectedID]} />
                <ModalEdit item={data[selectedID]} />
                <ModalView item={data[selectedID]} />
              </>
            ) : null}
          </table>
          <ModalAdd />
        </div>
      </Row>
    </Container>
  );
}
