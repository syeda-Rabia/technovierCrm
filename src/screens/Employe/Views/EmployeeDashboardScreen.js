import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import EmployeeLAASidebar from "../../../components/Sidebar/EmployeeLAASidebar";
import LAASidebar from "../../../components/Sidebar/LAASidebar";
import EmployeeDashboard from "../EmployeeDashboard/EmployeeDashboard";
export default function EmployeeDashboardScreen() {
  return (
    <React.Fragment>
      <Container fluid style={{ height: "100vh" }}>
        <Row>
          {/* <Col
            id="sidebar-component"
            className="shadow"
            lg={2}
            md={0}
            sm={0}
            xs={0}
            style={{ backgroundColor: "white" }}
          >
            {/* <EmployeeLAASidebar /> */}
            {/* <LAASidebar />
          </Col> */} 
          <Col
            lg={12}
            md={12}
            sm={12}
            xs={12}
            style={{ backgroundColor: "#FAFAFA" }}
          >
            <EmployeeDashboard />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
