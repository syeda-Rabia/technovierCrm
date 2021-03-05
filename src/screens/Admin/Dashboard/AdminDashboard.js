import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LeadReport_chart from "../../../components/Charts/LeadReport_chart";
import QuarterlyLead_chart from "../../../components/Charts/QuarterlyLead_chart";
import RecordTable from "./RecordTable";
import SwipeableTemporaryDrawer from "../../../components/Sidebar/LAAMobileViewSidebar";
import EnhancedTable from "./MaterialUITable";
import "./AdminDashboard.css";
import DataTable from "./DataTable";
function AdminDashboard() {
  return (
    <Container fluid>
      {/* Ist Row */}
      <Container fluid>
        <Row className="shadow mb-3 bg-white rounded mt-4 ">
          <Col lg={10} sm={10} xs={10} xl={11}>
            <h4 style={{ color: "#818181" }}>Admin Dashboard</h4>
          </Col>
          <Col lg={2} sm={2} xs={2} xl={1} id="floatSidebar">
            {/* <div className="float-right drawer-div">
              <SwipeableTemporaryDrawer />
            </div> */}
          </Col>
        </Row>
      </Container>
      {/* 2nd Row */}
      <Container fluid>
        <Row className="mb-2 mt-2 ">
          <Col
            xl={6}
            lg={5}
            sm={12}
            xs={12}
            className="mt-2 pt-3 "
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              marginRight: "5.5rem",
            }}
          >
            <Row
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Col style={{ color: "#818181" }}>
                <h6 style={{ color: "#818181" }}>Target Assigend</h6>
                <h3 style={{ color: "#818181" }}>Lead Report</h3>
              </Col>
              <Col
                style={{
                  float: "right",
                  height: 30,
                  color: "#818181",
                }}
              >
                <select
                  name
                  className="language border-0"
                  id="language"
                  style={{ color: "#818181" }}
                >
                  <option value="Hindi">Yearly(2020)</option>
                  <option value="English">Monthly(2020)</option>
                  <option value="Urdu">Weekly(2020)</option>
                  <option value="Parsian">Daily(2020)</option>
                </select>
              </Col>
            </Row>
            <QuarterlyLead_chart />
          </Col>
          <Col
            xl={5}
            lg={5}
            sm={12}
            xs={12}
            className="mt-2 pt-3 "
            style={{ backgroundColor: "white", borderRadius: "10px" }}
          >

            <h6 style={{ color: "#818181" }}>Pending Tasks Weekly (2020)</h6>
            <QuarterlyLead_chart />
          </Col>
        </Row>
      </Container>
      {/* 3rd Row */}
      <Container fluid>
        <Row
          className="my-3 "
          // style={{ marginLeft: "0px", marginRight: "0px" }}
        >
          <Col
            xl={12}
            lg={12}
            sm={12}
            xs={12}
            style={{ backgroundColor: "white", borderRadius: "10px" }}
          >
            <Row className="pt-3">
              <Col style={{ color: "#818181" }}>
                <h2 style={{ color: "#818181" }}>Quarterly Lead Tasks</h2>
                <p style={{ color: "#818181" }}>
                  Lorem ipsum dolor sit amet, consectetur
                </p>
              </Col>
              <Col
                style={{
                  color: "#818181",
                }}
              >
                <select
                  name
                  className="language border-0 float-right"
                  id="language"
                  style={{ color: "#818181" }}
                >
                  <option value="Hindi">Yearly(2020)</option>
                  <option value="English">Monthly(2020)</option>
                  <option value="Urdu">Weekly(2020)</option>
                  <option value="Parsian">Daily(2020)</option>
                </select>
              </Col>
            </Row>
            <QuarterlyLead_chart />
          </Col>
        </Row>
      </Container>
      {/* 4th Row */}
      {/* <Container fluid>
          <div className="row">
            <div
              className="col-lg-4 col-md-4 mt-2 mb-2 mr-5 ml-2 p-3"
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                color: "#818181",
              }}
            >
              <h3 style={{ color: "#818181" }}>Target Asigned</h3>
              <LeadReport_chart />
            </div>
            <div
              className="col-lg-7 col-md-7 mt-2 mb-2  ml-4 p-3"
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                color: "#818181",
              }}
            >
              <h6 style={{ color: "#818181" }}>Target Assigend</h6>
              <h3 style={{ color: "#818181" }}>Lead Report</h3>
              <p style={{ color: "#818181" }}>
                Lorem ipsum dolor sit amet, consectetur
              </p>
              <QuarterlyLead_chart />
            </div>
          </div>
        </Container> */}
      {/* New 4th row */}
      <Container fluid>
        <Row className="mb-2 mt-2">
          <Col
            xl={6}
            lg={5}
            sm={12}
            xs={12}
            className="mt-2 pt-3 "
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              marginRight: "5.5rem",
            }}
          >
            <Row
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Col style={{ color: "#818181" }}>
                <h6 style={{ color: "#818181" }}>Target Assigend</h6>
                <h3 style={{ color: "#818181" }}>Lead Report</h3>
              </Col>
            </Row>
            <QuarterlyLead_chart />
          </Col>
          <Col
            xl={5}
            lg={5}
            sm={12}
            xs={12}
            className="mt-2 pt-3"
            style={{ backgroundColor: "white", borderRadius: "10px" }}
          >
            <h6 style={{ color: "#818181" }}>Pending Tasks Weekly (2020)</h6>
            <QuarterlyLead_chart />
          </Col>
        </Row>
      </Container>
      {/*  */}
      {/* <DataTable /> */}
      <RecordTable />
      <Container fluid>
        <Row>
          <Col
            xl={4}
            lg={12}
            sm={12}
            xs={12}
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              marginTop: "30px",
              marginRight: "5.5rem",
              marginBottom: "30px",
              padding: "30px",
            }}
          >
            <h3 style={{ color: "#818181" }}>Target Asigned</h3>
            <LeadReport_chart />
          </Col>
          <Col
            xl={7}
            lg={12}
            sm={12}
            xs={12}
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              marginTop: "30px",
              marginBottom: "30px",
              padding: "30px",
            }}
          >
            <EnhancedTable />
            {/* <RecordTable /> */}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default AdminDashboard;
