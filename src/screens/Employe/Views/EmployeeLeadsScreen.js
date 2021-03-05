import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import EmployeeLeads from "../Leads/EmployeeLeads";
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
            <EmployeeLeadsSidebar />
          </Col>
          <Col
            lg={10}
            md={12}
            sm={12}
            xs={12}
            style={{ backgroundColor: "#FAFAFA" }}
          >
            <EmployeeLeads listData={props.location.query}/>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
