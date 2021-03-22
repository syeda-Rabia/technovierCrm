import React, { useState } from "react";
import "./ViewableTo.css";
import { Container, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { server_url, token } from "../../../utils/Config";
import { GET, POST } from "./../../../utils/Functions";
import ApiUrls from "./../../../utils/ApiUrls";
import { Chip, Box } from "@material-ui/core";
import { makeStyles, Backdrop, CircularProgress,Tooltip,
  IconButton,  } from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";
import PreLoading from "../../../components/PreLoading";
import SuccessNotification from "../../../components/SuccessNotification";
import ErrorNotification from "../../../components/ErrorNotification";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SwipeableTemporaryDrawer from "../../../components/Sidebar/LAAMobileViewSidebar";

import {useHistory } from "react-router-dom";
export default function ViewableTo() {
  const [select, setSelect] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [viewable, setViewable] = React.useState([]);
  const [name, setName] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = React.useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const history = useHistory();
  let i = 0;
  const [Employees, setEmployees] = React.useState([
    { label: "Sana", value: "Sana" },
    { label: "Atif", value: "Atif" },
    { label: "Ali", value: "Ali" },
    { label: "Imtesal", value: "Imtesal" },
    { label: "Rabia", value: "Rabia" },
    { label: "Qasim", value: "Qasim" },
  ]);
  const HandleName = (id) => {
    if (!select.includes(id)) setSelect((state) => [...state, id]);
    else setSelect((state) => state.filter((item) => item != id));
  };
  //  ;
  //  ;
  const handleInventoryData = async () => {
    setIsLoading(true);
    let res = await GET(ApiUrls.GET_ALL_VIEWABLE_INVENTORIES);
    if (res.success != false) {
      //
      setData(res.data.projects);
    }
    setIsLoading(false);
  };
  const handleEmployeeName = async () => {
    let res = await GET(ApiUrls.GET_ALL_EMPLOYEES);
    if (res.success != false) {
      // setViewable(res.data.users.data);
      let arr = [];
      res.data.users.map((item) => {
        arr.push({ label: item.first_name, value: item.id });
      });
      setEmployees(arr);
    }
  };
  React.useEffect(() => {
    handleInventoryData();
    handleEmployeeName();
  }, []);
  React.useEffect(() => {
    handleInventoryData();
    handleEmployeeName();
  }, [refresh]);

  const Table = ({ item, inventories, index, ids, viewableInventories }) => {
    let viewableInventoriesArray = viewableInventories.map((item) => {
      return { label: item.user.first_name };
    });
    let viewableData = select.includes(ids) == true ? viewable : [];
    return (
      <tr>
        <td>
          <input
            type="checkBox"
            checked={select.includes(ids)}
            onChange={(e) => {
              HandleName(ids);
            }}
          />
        </td>
        <td>{index}</td>
        <td>{item.name}</td>
        <td>{item.category.name}</td>
        <td>{inventories.inventory_name}</td>
        <td>{inventories.block_name}</td>
        <td>{inventories.inventory_category}</td>
        <td>{inventories.property_status}</td>
        <td>
          <Box display="flex">
            {
              [...viewableInventoriesArray, ...viewable] != null
                ? [...viewableInventoriesArray, ...viewableData].map(
                    (task, index) => {
                      return (
                        <Chip
                          icon={<FaceIcon />}
                          variant="outlined"
                          label={task.label}
                          style={{ marginRight: "5px" }}
                        />
                      );

                      // return `${task.label}${
                      //   index !=
                      //   [...viewableInventoriesArray, ...viewableData].length - 1
                      //     ? ","
                      //     : ""
                      // } `;
                    }
                  )
                : null
              // : null
            }
          </Box>
        </td>
      </tr>
    );
  };
  const SelectData = async (event) => {
    event.preventDefault();
    let postData = {
      inventory_ids: select,
      user_ids: viewable.map((item) => item.value),
    };
    let res = await POST(
      ApiUrls.POST_ALL_SELECTED_EMPLOYEES_AND_INVENTORY,
      postData
    );
    if (res.error === false) {
      setMessage("Record Submitted Successfully");
      setShowSuccessAlert(true);
    } else {
      setMessage("Operation Failed");
      setShowErrorAlert(true);
    }

    setRefresh(!refresh);
    setSelect([]);
    setViewable([]);
    let arr = data;
  };
  return (
    <Container fluid>
      <div className=" shadow p-3 mb-3 bg-white rounded mt-4">
        <Row>
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
        <h3 style={{ color: "#818181" }}>ViewAble To </h3>
        </Col>
        <Col lg={2} sm={2} xs={2} xl={1} id="floatSidebar">
          <div className="float-right ">
            <SwipeableTemporaryDrawer />
          </div>
        </Col>
        </Row>
      </div>

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
      <div className="Laa shadow p-3 mb-3 bg-white rounded mt-2">
        <Row>
          <Col
            lg="12"
            style={{ backgroundColor: "white", borderRadius: "5px" }}
          >
            <Row>
              <div className="col-lg-11">
                {select.length > 0 ? (
                  <Select
                    // disabled={!select.every((v) => v === true)}
                    options={Employees}
                    isMulti
                    onChange={(opt) => {
                      if (opt != null) setViewable(opt);
                      else setViewable([]);
                    }}
                    onClick={(e) => {
                      HandleName(0);
                    }}
                  />
                ) : null}
              </div>
              <div>
                {viewable != null ? (
                  viewable.length > 0 ? (
                    <button
                      className="col-lg-12 btn btn-primary"
                      type="submit"
                      style={{ backgroundColor: "#2258BF" }}
                      // disabled={!select.every((v) => v === true)}

                      onClick={SelectData}
                    >
                      save
                    </button>
                  ) : null
                ) : null}
              </div>
            </Row>

            <div className="table-responsive">
              <table className="table table-hover " style={{}}>
                <thead>
                  <tr>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Select
                      </span>
                    </th>
                    <th scope="col" class="text-nowrap">
                      <span id="sn" style={{ color: "#818181" }}>
                        Serial No
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Project
                      </span>
                    </th>
                    <th scope="col" class="text-nowrap">
                      <span id="sn" style={{ color: "#818181" }}>
                        Project Category
                      </span>
                    </th>
                    <th scope="col" class="text-nowrap">
                      <span id="sn" style={{ color: "#818181" }}>
                        Inventory Name
                      </span>
                    </th>
                    <th scope="col" class="text-nowrap">
                      <span id="sn" style={{ color: "#818181" }}>
                        Block Name
                      </span>
                    </th>
                    <th scope="col" class="text-nowrap">
                      <span id="sn" style={{ color: "#818181" }}>
                        Inventory Category
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Status
                      </span>
                    </th>
                    <th scope="col" class="text-nowrap">
                      <span id="sn" style={{ color: "#818181" }}>
                        ViewAble To
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => {
                    if (item.inventories != null)
                      return item.inventories.map((inventories, id) => {
                        i++;
                        return (
                          <Table
                            item={item}
                            inventories={inventories}
                            ids={inventories.id}
                            viewableInventories={
                              inventories.viewable_inventories
                            }
                            index={i}
                          />
                        );
                      });
                  })}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
