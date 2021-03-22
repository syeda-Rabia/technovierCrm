import "./InventoryAdmin.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { DeleteOutlineIcon } from "@material-ui/icons/DeleteOutline";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import {
  Tooltip,
  IconButton,
} from "@material-ui/core";
import {useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { Alert, AlertTitle, Skeleton } from "@material-ui/lab";
import { GET, POST } from "./../../../utils/Functions";
import ApiUrls from "./../../../utils/ApiUrls";
import Pagination from "../../../components/Pagination/Pagination";
import InventoryMobileViewSidebar from "../../../components/Sidebar/InventoryMobileViewSidebar";
import SwipeableTemporaryDrawer from "../../../components/Sidebar/LAAMobileViewSidebar";
import PreLoading from "../../../components/PreLoading";
import SuccessNotification from "../../../components/SuccessNotification";
import ErrorNotification from "../../../components/ErrorNotification";
export default function AddCategories() {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const [data, setData] = useState([]);
  const [selectedID, setSelectedID] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = React.useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleFetchData = async () => {
    setIsLoading(true);
    let res = await GET(ApiUrls.GET_ALL_PROJECT_CATEGORIES);
    // ;
    console.log(res);
    if (res.success != false) {
      setData(res.data.ProjectCategory);
    }
    setIsLoading(false);
  };
  React.useEffect(() => {
    //  ;
    handleFetchData();
  }, [refresh]);
  const history = useHistory();
  const ModalAdd = ({ item }) => {
    const [category, setCategory] = useState("");

    let user = {
      id: data.length + 1,
      name: category,
    };

    const addData = async (event) => {
      event.preventDefault();
      setIsLoading(true);

      let postData = {
        name: category,
      };
      let res = await POST(ApiUrls.CREATE_PROJECT_CATEGORY, postData);
      console.log("res category", res);
      if (res.error === false) {
        setMessage("Category Added Successfully");
        setShowSuccessAlert(true);
      } else {
        setMessage("Operation Failed");
        setShowErrorAlert(true);
      }

      setRefresh(!refresh);
      setIsLoading(false);
      // ;
      let arr = data;

      // setData([user].concat(arr));
      setShowAdd(false);
    };
    // };

    return (
      <Modal
        show={showAdd}
        onHide={() => {
          setShowAdd(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#818181" }}>Add Category</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            // SendRecordToServer(e);
          }}
        >
          <div>
            <Modal.Body>
              <div className="pb-3">
                <h6>Category Name</h6>
                <input
                  className="form-control  w-100 "
                  placeholder="Enter Category"
                  type="text"
                  minLength="3"
                  maxLength="30"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
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
    const [category, setCategory] = useState(item.name);

    const EditRecordToServer = async (event) => {
      event.preventDefault();
      setIsLoading(true);

      let user = {
        id: item.id,
        name: category,
      };
      let res = await POST(ApiUrls.POST_All_EDITED_CATEGORIES, user);
      if (res.error === false) {
        setMessage("Category Edited Successfully");
        setShowSuccessAlert(true);
      } else {
        setMessage("Operation Failed");
        setShowErrorAlert(true);
      }
      setRefresh(!refresh);
      setIsLoading(false);
      // ;
      // ;
      // let arr = data.map((val) => {
      //   if (val.id == user.id) val = user;
      //   return val;
      // });

      // // arr.push(user);
      // setData(arr);
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
          <Modal.Title style={{ color: "#818181" }}>Edit Category</Modal.Title>
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
                  <h6>Category Name</h6>
                  <input
                    className="form-control w-100 "
                    placeholder="Enter category"
                    type="text"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
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

      let res = await GET(ApiUrls.GET_DELETED_PROJECT_CATEGORIES + item.id);
      if (res.error === false) {
        setMessage("Category Deleted Successfully");
        setShowSuccessAlert(true);
      } else {
        setMessage("Operation Failed");
        setShowErrorAlert(true);
      }
      setRefresh(!refresh);
      setIsLoading(false);

      // // ;
      // if (res.success != false) {
      //   // setData(res.data.ProjectCategory);
      // }
      // // ;
      // let { id } = item;
      // // ;
      // let arr = data;
      // arr = arr.filter((user) => user.id != id.toString());
      // // ;
      // setSelectedID((state) => {
      //   if (state == arr.length) return state - 1;
      //   return state;
      // });
      // setData(arr);
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
  const Table = ({ item, index }) => {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{item.name}</td>
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
  return (
    <Container
      fluid
      style={{
        margin: "auto",
        width: "100%",
        padding: "10px",
        marginTop: "10px",
      }}
    >
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
        
     
       
      <Col lg={10} sm={10} xs={10} xl={11}>
      <IconButton
          onClick={() => {
            history.push("/admin/inventory");
          }}
          aria-label="delete"
          color="primary"
        >
          <Tooltip title="Go Back" placement="right" arrow>
            <ArrowBackIcon />
          </Tooltip>
        </IconButton>
          <h2
            style={{
              color: "#818181",
              textAlign: "left",
            }}
          >
            Categories
          </h2>
        </Col>
            {/* <h3 style={{ color: "#818181" }}>
              Inventory Details 
            </h3> */}
            <Col lg={2} sm={2} xs={2} xl={1} id="floatSidebar">
          <div className="float-right mt-4">
            <SwipeableTemporaryDrawer/>
          </div>
        </Col>
      </Row>
      <Row>
        <div className="col-lg-12 shadow p-3  bg-white rounded ">
          <button
            data-tip
            data-for="AddTip"
            type="button"
            className="btn btn-primary my-4"
            style={{
              backgroundColor: "#2258BF",
            }}
            onClick={() => {
              setShowAdd(true);
            }}
          >
            <FontAwesomeIcon icon={faPlusSquare} /> Add Category
          </button>
          <ReactTooltip id="AddTip" place="top" effect="solid">
            Add new category
          </ReactTooltip>

          <Row>
            <Col
              lg
              md="12"
              style={{ backgroundColor: "white", borderRadius: "5px" }}
            >
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col" style={{ color: "#818181" }}>
                        ID
                      </th>

                      <th scope="col" class="text-nowrap" style={{ color: "#818181" }}>
                        Category Name
                      </th>
                      <th scope="col" style={{ color: "#818181" }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      // userRecord != ""
                      //   ? userRecord.map((user, index) => (
                      //       <>
                      //         <Table item={user} index={index} />
                      //       </>
                      //     ))
                      //   : // <h1>No Data</h1>
                      //     null
                      // <Skeleton variant="rect" width={"100%"} height={"100%"} />
                    }
                    {data.map((item, index) => {
                      return <Table item={item} index={index} />;
                    })}
                    {/* {data
                      .filter(
                        (item) =>
                          item.is_deleted == 0 || item.is_deleted == null
                      )
                      .map((item, index) => {
                        return <Table item={item} index={index} />;
                      })} */}
                  </tbody>
                  {data.length > 0 ? (
                    <>
                      <ModalDelete item={data[selectedID]} />
                      <ModalEdit item={data[selectedID]} />
                    </>
                  ) : null}
                </table>
                <ModalAdd />
              </div>
            </Col>
          </Row>
        </div>
      </Row>
    </Container>
  );
}
