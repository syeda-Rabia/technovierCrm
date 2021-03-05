import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Form, Button, Col, Container, Row, Overlay } from "react-bootstrap";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Alert, AlertTitle } from "@material-ui/lab";

import { GET, POST } from "../../../utils/Functions";
import ApiUrls from "../../../utils/ApiUrls";

import {
  Tooltip,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  LinearProgress,
  Grow,
  FormGroup,
  Backdrop,
  makeStyles,
} from "@material-ui/core";
import { Link, useHistory, Redirect, Route } from "react-router-dom";
import InventoryMobileViewSidebar from "../../../components/Sidebar/InventoryMobileViewSidebar";
import PreLoading from "../../../components/PreLoading";

export default function AddInventory(props) {
  const [allProjectCategories, setAllProjectCategories] = React.useState([]);

  const [form, setForm] = React.useState(true); //
  const [dummy, setDummy] = React.useState([]);
  const [projectDetails, setProjectDetails] = React.useState({});
  const [nameParent, setNameParent] = React.useState("");
  const [unitsParent, setUnitsParent] = React.useState(1);
  const [categoryParent, setCategoryParent] = React.useState(null);
  const [showAlert, setShowAlert] = React.useState(false);
  const [redirectPage, setRedirectPage] = React.useState(false);

  const [showProgress, setShowProgress] = React.useState(false);
console.log("props",props);
  //  ;
  const query=props.location.query;
  useEffect(() => {
    console.log("query-------------",query)
    // getAllProjectCategories();
    if(query.units !=undefined)
    setUnitsParent(query.units)
    setAllProjectCategories(query.item.category.name)
    setCategoryParent(query.item.category.name)
    setNameParent(query.item.name)

    let arr = [];

    for (let i = 0; i < query.units; i++) {
        arr.push({
          id: i + 1,
          serial_no: "",
          name: "",
          block_name: "",

          // category: category === "Both" ? "" : category,
          category: query.item.category.name,

          status: "",
        });
      }
      setDummy(arr); //[]
      setProjectDetails({
        name: query.item.name,
        category: query.item.category.name,
        units: query.units,
        status: "open",
        inventory: [],
      });
      setForm(false);

  }, []);

  const getAllProjectCategories = async () => {
    // ;
    let resp = await GET(ApiUrls.GET_ALL_PROJECT_CATEGORIES);

    if (resp.data != null) {
      setAllProjectCategories(resp.data.ProjectCategory);
    }
    // ;
  };

  const submit = (e) => {
    e.preventDefault();
    // ;
  };
  const handleClose = () => {
    setShowAlert(false);
    setRedirectPage(true);
  };

  //  ;
  const Inventory = () => {
    const [name, setName] = React.useState(nameParent);
    const [units, setUnits] = React.useState(unitsParent);
    const [category, setCategory] = React.useState(categoryParent);
    const [categoryError, setCategoryError] = React.useState(null);
    const [showProgressInside, setShowProgressInside] = React.useState(false);

    const handleForm = async () => {
      setNameParent(name);
      setUnitsParent(units);
      setCategoryParent(category);
      let arr = [];
      for (let i = 0; i < units; i++) {
        arr.push({
          id: i + 1,
          serial_no: "",
          name: "",
          block_name: "",

          // category: category === "Both" ? "" : category,
          category: category,

          status: "",
        });
      }
      setDummy(arr); //[]
      setProjectDetails({
        name: name,
        category: category,
        units: units,
        status: "open",
        inventory: [],
      });
      setForm(false);
    };
    React.useEffect(() => {
      return () => {
        setShowProgressInside(false);
      };
    });

    return (
      <React.Fragment>
        <PreLoading startLoading={showProgressInside} />

        <Container fluid>
          <Row className="shadow p-3 mb-3 bg-white rounded mt-4 ">
            <Col lg={10} sm={10} xs={10} xl={11}>
              <h3 style={{ color: "#818181" }}>Add Project</h3>
            </Col>
            <Col lg={2} sm={2} xs={2} xl={1} id="floatSidebar">
              <div className="float-right ">
                <InventoryMobileViewSidebar />
              </div>
            </Col>
          </Row>
          <Row>
            <div className="col-lg-12 shadow p-3  bg-white rounded ">
              <Form onSubmit={submit}>
                <Form.Group controlId="inventoryName">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    value={name}
                    disabled
                    onChange={(e) => {
                      //  ;
                      setName(e.target.value);
                      // ;
                    }}
                    required={true}
                    className="w-100"
                    type="text"
                  />
                </Form.Group>

                <Form.Group controlId="projectCategory">
                  <Form.Label>Project Category</Form.Label>

                  <Select
                    value={category}
                    disableUnderline
                    error
                    // variant="filled"
                    onChange={(e) => {
                      if (categoryError) {
                        setCategoryError(false);
                      }
                      // console.log(
                      //   "select category ID is -----",
                      //   e.target.value
                      // );
                      setCategory(e.target.value);
                    }}
                    className="form-control form-control-sm w-100"
                  >
                    {/* {allProjectCategories.length > 0
                      ? allProjectCategories.map((proCat, index) => ( */}
                          <MenuItem value={allProjectCategories}>
                            {allProjectCategories}
                          </MenuItem>
                        {/* ))
                      : null} */}
                  </Select>

                  {categoryError ? (
                    <p style={{ color: "red" }}>
                      Please Enter Project Category.
                    </p>
                  ) : null}
                </Form.Group>

                <Form.Group controlId="units">
                  <Form.Label>Units</Form.Label>
                  <Form.Control
                    min="1"
                    max="250"
                    value={units}
                    disabled
                    onChange={(e) => {
                      if (e.target.value > 250) {
                        alert("You can add max 250 properties at one time");
                      } else {
                        setUnits(e.target.value);
                      }
                    }}
                    className="w-100"
                    type="number"
                    placeholder="Number of Properties"
                  />
                </Form.Group>
                {name != "" ? (
                  <Button
                    className="w-100"
                    variant="primary"
                    type="submit"
                    // disabled={category === null ? true : false}
                    // onClick={handleForm}
                    onClick={() => {
                      if (category === null) {
                        setCategoryError(true);
                      } else {
                        const promiseA = new Promise(
                          (resolutionFunc, rejectionFunc) => {
                            resolutionFunc(() => setShowProgressInside(true));
                          }
                        );
                        // At this point, "promiseA" is already settled.
                        promiseA.then(() => {
                          // ;
                          handleForm();
                        });
                      }
                    }}
                  >
                    Add Inventory
                  </Button>
                ) : null}
              </Form>
            </div>
          </Row>
        </Container>
      </React.Fragment>
    );
  };
  const InventoryDetails = () => {
    const [InventoryData, setInventoryData] = React.useState(dummy);
    console.log("inventory",InventoryData);
    const history = useHistory();

    const viewData = (data, id, index) => {
      let key = Object.keys(data)[0];

      setInventoryData((state) => {
        const temp = [...state];
        const objectChange = temp[index];
        objectChange[key] = data[key];
        temp[index] = { ...objectChange };
        // ;
        return temp;
      });
    };

    const handlePostRequest = async () => {
      setShowProgress(true);
      setProjectDetails((state) => {
        state.inventory = InventoryData;
        return state;
      });
      var postData = projectDetails;
      postData.inventory = InventoryData;

      //  ;
      //  ;
      //  ;

      //  ;
      //  ;

      let inventoriesArray = [];

      if (projectDetails.inventory.length > 0) {
        for (let index = 0; index < projectDetails.inventory.length; index++) {
          let obj = {
            serial_no: projectDetails.inventory[index].serial_no,
            inventory_name: projectDetails.inventory[index].name,
            block_name: projectDetails.inventory[index].block_name,
            // inventory_category: projectDetails.inventory[index].category,
            property_status: projectDetails.inventory[index].status,
          };
         
          inventoriesArray.push(obj);
        }
      }
      let formData = {
        project_id:query.item.id,
        // name: projectDetails.name,
        unit: projectDetails.units,
        category_id: projectDetails.category,
        inventories: inventoriesArray,
      };
      // ;
      // ;
      // ;
      let resp = await POST(ApiUrls.POST_CREATE_EXISTING_PROJECT_INVENTORIES, formData);
      // ;
      console.log("response",resp);
      if (resp.error === false) {
        history.push("/admin/inventory");
      } 

      setShowProgress(false);
    };

    React.useEffect(() => {
      if (InventoryData.length === 0) setForm((state) => !state);
    }, [InventoryData]);
    return (
      <div className="col-lg-12 shadow p-3  bg-white rounded mt-4">
        {/* <LinearProgress /> */}
        {showProgress == true ? (
          <PreLoading startLoading={showProgress} />
        ) : null}

        {showAlert == true ? (
          <Grow in={showAlert}>
            <Snackbar
              open={showAlert}
              autoHideDuration={1000}
              onClose={handleClose}
            >
              <Alert variant="filled" severity="success">
                <AlertTitle>Success</AlertTitle>
                <span className="mr-5" style={{ textAlign: "center" }}>
                  Project Added
                </span>
              </Alert>
            </Snackbar>
          </Grow>
        ) : null}
        <br />
        <Route
          render={() =>
            redirectPage ? (
              <Redirect
                to={{
                  pathname: "/admin/inventory",
                }}
              />
            ) : null
          }
        />

        {/* <Button onClick={() => setForm((state) => !state)}>Go Back</Button> */}
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
        <Container>
          <Form>
            {InventoryData.map((item, index) => {
              return (
                <Form.Row style={{ marginBottom: "8px" }}>
                  <Col>
                    <Form.Control
                      className="w-100"
                      placeholder="Serial No"
                      value={item.serial_no}
                      style={{ height: "calc(1.5em + 1.99rem + 2px)" }}
                      onChange={(e) => {
                        // setInventoryData()
                        viewData({ serial_no: e.target.value }, item.id, index);
                      }}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      className="w-100"
                      placeholder="Inventory name"
                      value={item.name}
                      style={{ height: "calc(1.5em + 1.99rem + 2px)" }}
                      onChange={(e) => {
                        // setInventoryData()
                        viewData({ name: e.target.value }, item.id, index);
                      }}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      placeholder="Block name"
                      className="w-100"
                      style={{ height: "calc(1.5em + 1.99rem + 2px)" }}
                      value={item.block_name}
                      onChange={(e) => {
                        // setInventoryData()
                        viewData(
                          { block_name: e.target.value },
                          item.id,
                          index
                        );
                      }}
                    />
                  </Col>

                  <Col>
                    {/* <Form.Control
                      style={{
                        height: "calc(1.5em + 0.75rem + -4px)",
                      }}
                      as="select"
                      className="w-100"
                      placeholder="Status"
                      value={item.status}
                      onChange={(e) => {
                        // setInventoryData()
                        viewData({ status: e.target.value }, item.id,index);
                      }}
                    >
                      <option value={"null"}>Select Status</option>
                      <option value={"Hold"}>Hold</option>
                      <option value={"Open"}>Open</option>
                      <option value={"Sold"}>Sold</option>
                    </Form.Control> */}
                    <FormGroup
                    // style={{ backgroundColor: "#F2F4F5" }}
                    >
                      <FormControl
                        variant="filled"
                        className="w-100"
                        style={{
                          height: "calc(1.5em + 0.75rem + -4px)",
                        }}
                      >
                        <InputLabel id="demo-simple-select-filled-label">
                          Select Status
                        </InputLabel>

                        <Select
                          variant="outlined"
                          value={item.status}
                          onChange={(e) => {
                            // setInventoryData()
                            viewData(
                              { status: e.target.value },
                              item.id,
                              index
                            );
                          }}
                        >
                          {/* <MenuItem value={"null"}>Select Category</MenuItem> */}
                          <MenuItem value={"Open"}>Open</MenuItem>
                          <MenuItem value={"Sold"}>Sold</MenuItem>
                          {/* <MenuItem value={"Rent"}>Rent</MenuItem> */}
                        </Select>
                      </FormControl>
                    </FormGroup>
                  </Col>
                  <Col>
                    <IconButton aria-label="delete" color="primary">
                      <Tooltip title="Delete" placement="right" arrow>
                        <RemoveOutlinedIcon
                          onClick={() => {
                            // ;
                            const tempData = InventoryData.filter(
                              (del) => del.id !== item.id
                            );
                            setInventoryData(tempData);
                          }}
                        />
                      </Tooltip>
                    </IconButton>
                  </Col>
                </Form.Row>
              );
            })}
            {/* <Link> */}
            <Button
              onClick={() => {
                handlePostRequest();
                // setProjectDetails((state) => {
                //   state.inventory = InventoryData;
                //   return state;
                // });
                // setTimeout(() => {}, 3000);
              }}
            >
              Save
            </Button>
            {/* </Link> */}
          </Form>
        </Container>
      </div>
    );
  };
  if (form) {
    return <Inventory />;
  } else {
    return <InventoryDetails />;
  }
}
