import React from "react";
import "./EmployeeToDo.css";
import { employeedata } from "../../../assests/constants/todolistEmployee";
import { Container, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import Pagination from "../../../components/Pagination/Pagination";
import { paginate } from "../../../utils/paginate";
import {
  KeyboardTimePickerExample,
  KeyboardDatePickerExample,
} from "../../../utils/KeyboardTimePickerExample";
import SwipeableTemporaryDrawer from "../../../components/Sidebar/EmployeeMobileviewSidebar";
export default function LeadsAllocatonAndAddition() {
  const [data, setData] = React.useState(employeedata);
  const totalCount = data.length;
  const [pageSize, setPageSize] = React.useState(5);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(0);
  const lastIndex = currentPage * pageSize;
  const istIndex = lastIndex - pageSize;
  const currentData = data.slice(istIndex, lastIndex);
  const [value, setValue] = React.useState("");

  //  ;
  //  ;
  const handleShow = (pageCount) => {
    setPageCount(pageCount);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
    //  ;
  };
  const ActionButton = () => {
    return (
      <DropdownButton id="CTA-button" variant="info" title="Action">
        <DropdownButton
          className="mb-1"
          id="dropdown"
          title="Call Received"
          drop="left"
          style={{
            width: "100%",
            color: "black",
            outline: "none",
            backgroundColor: "white",
          }}
        >
          <DropdownButton
            className="mb-1"
            id="shiftAndWarnButton"
            title="Shift and Warn"
            drop="left"
            style={{
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            <Dropdown.Item
              as="button"
              style={{ color: "black", outline: "none" }}
            >
              <div>{/* <KeyboardDatePickerExample /> */}</div>
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              eventKey="call-Explanation"
              style={{ color: "black", outline: "none" }}
            >
              {/* <KeyboardTimePickerExample /> */}
            </Dropdown.Item>
          </DropdownButton>
        </DropdownButton>
        <DropdownButton
          className="mb-1"
          id="dropdown"
          title="Call declined"
          drop="left"
        >
          {/* <Dropdown.Item
      as="button"
      eventKey="instruct"
      style={{ color: "black", outline: "none" }}
    >
      Atif
    </Dropdown.Item>
    <Dropdown.Item
      as="button"
      eventKey="call-Explanation"
      style={{ color: "black", outline: "none" }}
    >
      Rabia
    </Dropdown.Item>
    <Dropdown.Item
      as="button"
      eventKey="shift-and-Warn"
      style={{ color: "black", outline: "none" }}
    >
      Qasim
    </Dropdown.Item> */}
        </DropdownButton>

        <DropdownButton
          className="mb-1"
          id="dropdown"
          title="Asked To Send Whatsapp"
          drop="left"
        >
          {/* <Dropdown.Item
      as="button"
      eventKey="instruct"
      style={{ color: "black", outline: "none" }}
    >
      Atif
    </Dropdown.Item>
    <Dropdown.Item
      as="button"
      eventKey="call-Explanation"
      style={{ color: "black", outline: "none" }}
    >
      Rabia
    </Dropdown.Item>
    <Dropdown.Item
      as="button"
      eventKey="shift-and-Warn"
      style={{ color: "black", outline: "none" }}
    >
      Qasim
    </Dropdown.Item> */}
        </DropdownButton>
        <DropdownButton
          className="mb-1"
          id="dropdown"
          title="Asked To send sms"
          drop="left"
        >
          <Dropdown.Item
            as="button"
            eventKey="instruct"
            style={{ color: "black", outline: "none" }}
          >
            Atif
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            eventKey="call-Explanation"
            style={{ color: "black", outline: "none" }}
          >
            Rabia
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            eventKey="shift-and-Warn"
            style={{ color: "black", outline: "none" }}
          >
            Qasim
          </Dropdown.Item>
        </DropdownButton>
        <DropdownButton
          className="mb-1"
          id="dropdown"
          title="Meeting Scheduled"
          drop="left"
          style={{ color: "black", outline: "none" }}
        >
          <Dropdown.Item
            as="button"
            eventKey="instruct"
            style={{ color: "black", outline: "none" }}
          >
            Atif
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            eventKey="call-Explanation"
            style={{ color: "black", outline: "none" }}
          >
            Rabia
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            eventKey="shift-and-Warn"
            style={{ color: "black", outline: "none" }}
          >
            Qasim
          </Dropdown.Item>
        </DropdownButton>
      </DropdownButton>
    );
  };
  const TableRow = ({ index, item }) => {
    //  ;
    const records = paginate(data, currentPage, pageSize);
    return (
      <tr>
        <td key={item.id}>{item.id}</td>
        <td key={item.id}>{item.Clients}</td>
        <td key={item.id}>{item.Contacts}</td>
        <td key={item.id}>{item.Project[0]}</td>
        <td key={item.id}>{item.Budget}</td>

        <td key={item.id}>
          <div
            style={{ marginLeft: "10px", marginRight: "60px", width: "100%" }}
          >
            04:30 AM
          </div>
        </td>
        <td key={item.id}>{item.Country}</td>

        <td key={item.id}>{item.Status[0]}</td>

        <td key={item.id}>{item.Interest[0]}</td>
        <td key={item.id}>{item.Email}</td>
        <td key={item.id}>{item.Task[0]}</td>
        <td key={item.id}>
          <div
            className=""
            style={{ marginLeft: "15px", marginRight: "70px", width: "100%" }}
          >
            04/01/2021
          </div>
        </td>
        <td> Recording 1</td>
        <td>comments</td>
        <td>
          <ActionButton />
        </td>
      </tr>
    );
  };
  return (
    <Container fluid className="Laa">
     <Row className="shadow p-3 mb-3 bg-white rounded mt-4 ">
            <Col lg={10} sm={10} xs={10} xl={11}>
              <h4 style={{ color: "#818181" }}>To Do List(Employee) </h4>
            </Col>
            <Col lg={2} sm={2} xs={2} xl={1} id="floatSidebar">
              <div className="float-right drawer-div">
                <SwipeableTemporaryDrawer />
              </div>
            </Col>
          </Row>

      <Row>
        <Col lg="12" style={{ backgroundColor: "white", borderRadius: "5px" }}>
          <div className="col-lg-12 shadow p-3 mb-5 bg-white rounded ">
            <div className="table-responsive">
              <table id="todolistTable" className="table table-hover">
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
                        Project
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        {" "}
                        Budget
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        TOC
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        {" "}
                        Country/City
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Status
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Interest
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Email
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
                        {"Recording"}
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Comments
                      </span>
                    </th>
                    <th scope="col">
                      <span id="sn" style={{ color: "#818181" }}>
                        Actions
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((item, index) => {
                    return <TableRow index={index} item={item} />;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="page-info">
            Showing {currentPage} from {pageCount}
          </p>
        </Col>
        <Col>
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            show={handleShow}
          />
        </Col>
      </Row>
    </Container>
  );
}
