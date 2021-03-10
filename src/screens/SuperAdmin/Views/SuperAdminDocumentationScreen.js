import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SuperAdminDocumentation from "../Documentation/SuperAdminDocumentation";
import SuperAdminSidebar from "../../../components/Sidebar/SuperAdminSidebar";
import "./SuperAdminScreenStyle.css";
export default function SuperAdminDocumentationScreen() {
  return (
    <React.Fragment>
      <Container fluid style={{ height: "100vh" }}>
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
             <SuperAdminSidebar/> 
          </Col>
          <Col
            lg={10}
            md={12}
            sm={12}
            xs={12}
            style={{ backgroundColor: "#FAFAFA" }}
          >
            

            <SuperAdminDocumentation/>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
