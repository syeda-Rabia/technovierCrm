import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import InventorySidebar from "../../../components/Sidebar/InventorySidebar";
import ClosedLeads from "../../ClosedLeads";
import AdminSidebar from "../../../components/Sidebar/AdminASidebar";
export default function AdminProjectDetailsScreen(props) {
  return (
    <React.Fragment>
      <Container fluid style={{ height: "100vh" }}>
      <Row>
        <Col
            id="sidebar-component"
            lg={2}
            md={0}
            sm={0}
            xs={0}
            style={{ backgroundColor: "white" }}
          >
            <AdminSidebar />
          </Col>

          <Col
            lg={10}
            md={12}
            sm={12}
            xs={12}
            style={{ backgroundColor: "#FAFAFA" }}
          >
            <ClosedLeads listData={props.location.query} />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
