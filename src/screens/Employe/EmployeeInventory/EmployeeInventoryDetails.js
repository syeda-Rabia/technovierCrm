import React, { useState, useEffect } from "react";
import "./EmployeeInventory.css";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { ProjectListData } from "./../../../assests/constants/ProjectListDemoData";
import { GET, POST } from "../../../utils/Functions";
import { Link, useHistory, Redirect } from "react-router-dom";
import ApiUrls from "../../../utils/ApiUrls";
import {
  makeStyles,
  Backdrop,
  CircularProgress,
  Snackbar,
  Button as MaterialButton,
} from "@material-ui/core";

import InventoryMobileViewSidebar from "../../../components/Sidebar/InventoryMobileViewSidebar";
import ReactTooltip from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Alert } from "@material-ui/lab";
import PreLoading from "../../../components/PreLoading";
import SuccessNotification from "../../../components/SuccessNotification";
import ErrorNotification from "../../../components/ErrorNotification";
import {
  Tooltip,
  IconButton,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// import {useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    "& .MuiCircularProgress-colorPrimary": {
      color: "#fff",
    },
  },
  myButton: {
    color: "#fff",
  },
}));
// const history = useHistory();
export default function InventoryAdmin(props) {
  const [data, setData] = useState(ProjectListData);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const [selectedID, setSelectedID] = useState(0);
  const [value, setValue] = useState();
  const [allInventories, setAllInventories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [gobackState, setGobackState] = useState(false);
  const [message, setMessage] = React.useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const classes = useStyles();
  const history = useHistory(); 

  useEffect(() => {
    setIsLoading(true);
    console.log("here----------");
    if (props.location.query != undefined) getALlInv();
    console.log("here it is----------",props.location.query);
  }, []);

  useEffect(() => {
    getALlInv();
  }, [refresh]);

  const getALlInv = async () => {
    if (props.location.query !== undefined) {
      let project_id = props.location.query.item.id;
      let resp = await GET(
        ApiUrls.GET_SINGLE_PROECT_INVENTORIES + "/" + project_id
      );
      console.log(resp, "-----------------------------------project");
      if (resp.data != null) {
        setAllInventories(resp.data.inventories);

        if (resp.data.inventories.length == 0) {
          setGobackState(true);
        }
      }
    }
    setIsLoading(false);
  };

  // let listData = [];
  const ModalEdit = ({ item }) => {
    //  ;
    const [serialno, setSerialNo] = useState(item.serial_no);

    const [inventory_name, setInventoryName] = useState(item.inventory_name);
    const [inventory_category, setInventoryCategory] = useState(
      item.inventory_category
    );
    const [block_name, setBlockName] = useState(item.block_name);
    const [status, setStatus] = useState(item.property_status);

    const SendRecordToServer = (event) => {
      event.preventDefault();

      // add validations
      // push

      let inventory = {
        id: "1",
        serial_no: serialno,
        block_name: block_name,
        inventory_name: inventory_name,
        property_status: status,
      };

      //   let arr = data;
      //   arr.push(inventory);
      //   setData(arr);
      //   setShowAdd(false);
    };
    const EditRecordToServer = async (event) => {
      event.preventDefault();

      // add validations
      // push

      let inventory = {
        id: item.id,
        serial_no: serialno,
        block_name: block_name,
        inventory_name: inventory_name,
        inventory_category: inventory_category,
        property_status: status,
      };
      let res = await POST(ApiUrls.POST_All_EDITED_INVENTORIES, inventory);
      console.log("---------------",res)
      if (res.error === false) {
        setMessage("inventory updated Successfully");
        setShowSuccessAlert(true);
      } else {
        setMessage("Operation Failed");
        setShowErrorAlert(true);
      }
      let arr = allInventories.map((val) => {
        if (val.id == inventory.id) val = inventory;
        return val;
      });
      
      // arr.push(inventory);
      setAllInventories(arr);
      setShowEdit(false);
    };

    return (
      <Modal
        show={showEdit}
        onHide={() => {
          setShowEdit(false);
        }}
      >
        <Modal.Header
          closeButton
          className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2"
        >
          <Modal.Title style={{ color: "#818181" }}>Edit Inventory</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            EditRecordToServer(e);
          }}
        >
          <div className="col-lg-12 shadow  bg-white rounded ">
            <Modal.Body>
              {/*             
            <h6>ID</h6>
            <input className="form-control w-100"    placeholder="Enter id" /> */}
              <form>
                <div className="pb-3">
                  <h6>Serial Number</h6>
                  <input
                    className="form-control w-100 "
                    placeholder="Enter serial no"
                    type="text"
                    value={serialno}
                    onChange={(e) => {
                      setSerialNo(e.target.value);
                    }}
                  />
                </div>
                <div className="pb-3">
                  <h6>Inventory Name</h6>
                  <input
                    className="form-control w-100 "
                    placeholder="Enter name"
                    type="text"
                    value={inventory_name}
                    onChange={(e) => {
                      setInventoryName(e.target.value);
                    }}
                  />
                </div>

                <div className="pb-3">
                  <h6>Block Name</h6>
                  <input
                    className="form-control w-100 "
                    placeholder="Enter category"
                    type="text"
                    value={block_name}
                    onChange={(e) => {
                      setBlockName(e.target.value);
                    }}
                  />
                </div>
                <div className="pb-3">
                  <h6>Status</h6>
                  <select
                    className="form-control w-100 "
                    placeholder="Enter status"
                    type="text"
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                    className="form-control form-control-sm w-100"
                  >
                    <option value={"Open"}>Open</option>
                    <option value={"Sold"}>Sold</option>
                  </select>
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
  const ModalDelete = ({ item }) => {
    const DeleteRecordFromData = async (item) => {
      setIsLoading(true);

      let res = await GET(ApiUrls.GET_DELETED_INVENTORIES + item.id);
      if (res.error === false) {
        setMessage("Inventory Deleted Successfully");
        setShowSuccessAlert(true);
      } else {
        setMessage("Operation Failed");
        setShowErrorAlert(true);
      }
      setIsLoading(false);
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
                DeleteRecordFromData(item);
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

  const TableRow = ({ item, index }) => {
    return (
      <tr>
        <td>{index + 1} </td>
        <td>{item.serial_no}</td>
        <td>{props.listData.item.name}</td>
        <td>{item.inventory_category}</td>
        <td>{item.inventory_name}</td>
        <td>{item.block_name}</td>
        <td>{item.property_status}</td>
        <td>
          <div
            className="d-flex d-inline "
            style={{
              justifyContent: "center",
            }}
          >
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
//   if (props.listData === undefined) {
//     return (
//       <>
//         <Redirect to="/admin/inventory" />
//       </>
//     );
//   } else 
    return (
      <Container fluid className="Laa">
       
          <Row className="shadow p-3 mb-2 bg-white rounded mt-4 ">
          <IconButton
          onClick={() => {
            history.push("/employee/inventory");
          }}
          aria-label="delete"
          color="primary"
        >
          <Tooltip title="Go Back" placement="right" arrow>
            <ArrowBackIcon />
          </Tooltip>
        </IconButton>
          <Col lg={10} sm={10} xs={10} xl={11}>
          
          <h2
            style={{
              color: "#818181",
              textAlign: "left",
            }}
          >
            Inventory Details
          </h2>
        </Col>
            {/* <h3 style={{ color: "#818181" }}>
              Inventory Details 
            </h3> */}
            <Col lg={2} sm={2} xs={2} xl={1} id="floatSidebar">
          {/* <div className="float-right ">
            <InventoryMobileViewSidebar />
          </div> */}
        </Col>
          </Row>
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


        <PreLoading startLoading={isLoading} />

        <Row>
          <div className="col-lg-12 shadow p-3  bg-white rounded mt-3 ">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        ID
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Serial_No
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        ProjectName
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Category
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        InventoryName
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        BlockName
                      </span>
                    </th>

                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Status
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
                  {/* {data[0].map((item, index) => { */}

                  {allInventories.length > 0 ? (
                    allInventories.map((item, index) => (
                      <TableRow item={item} key={index} index={index} />
                    ))
                  ) : (
                    <Snackbar
                      open={gobackState}
                      // autoHideDuration={2000}
                      // onClose={handleClose}
                      anchorOrigin={{ vertical: "buttom", horizontal: "left" }}
                    >
                      <Alert variant="filled" severity="error">
                        Project Inventory is Empty.
                        <MaterialButton
                          variant="text"
                          onClick={() => {
                            history.push("/admin/inventory");
                          }}
                          classes={{ label: classes.myButton }}
                        >
                          Click to GO Back
                        </MaterialButton>
                      </Alert>
                    </Snackbar>
                  )}
                  {/* <TableRow
                  Name={listData.item.Name}
                  inventories={listData.item.inventory}
                /> */}
                  {/* })} */}
                </tbody>

                {allInventories.length > 0 ? (
                  <>
                    <ModalDelete item={allInventories[selectedID]} />
                    <ModalEdit item={allInventories[selectedID]} />
                  </>
                ) : null}
              </table>
            </div>
          </div>
        </Row>
      </Container>
    );
}
