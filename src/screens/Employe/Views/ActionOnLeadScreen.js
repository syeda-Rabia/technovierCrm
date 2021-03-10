import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import EmployeeLAASidebar from "../../../components/Sidebar/EmployeeLAASidebar";
import EmployeeSidebar from "../../../components/Sidebar/EmployeeSidebar";
import AdminAction from "../Leads/AdminAction";
export default function EmployeenActionScreen(props) {
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
            
             <EmployeeSidebar/>
          </Col> 
          <Col
            lg={10}
            md={12}
            sm={12}
            xs={12}
            style={{ backgroundColor: "#FAFAFA" }}
          >
            <AdminAction {...props}/>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
