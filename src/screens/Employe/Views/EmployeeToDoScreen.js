import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import EmployeeToDo from "../EmployeeToDo/EmployeeToDo";
import EmployeeSidebar from "../../../components/Sidebar/EmployeeSidebar";
import EmployeeLeadsSidebar from "../../../components/Sidebar/EmployeeLeadsSidebar";
export default function EmployeeLeadsScreen(props) {
  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col
            id="sidebar-component"
            className="shadow"
            lg={2}
            md={0}
            sm={0}
            xs={0}
            style={{ backgroundColor: "white" }}
          >
            <EmployeeSidebar/>
          </Col>
          <Col
            lg={10}
            md={12}
            sm={12}
            xs={12}
            style={{ backgroundColor: "#FAFAFA" }}
          >
            <EmployeeToDo />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
