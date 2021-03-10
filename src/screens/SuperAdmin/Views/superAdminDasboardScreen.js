import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SuperAdminDasboard from "../DashBoard/SuperAdminDashBoard";
import LAASidebar from "../../../components/Sidebar/LAASidebar";
import SuperAdminSidebar from "../../../components/Sidebar/SuperAdminSidebar";
import SwipeableTemporaryDrawer from "../../../components/Sidebar/LAAMobileViewSidebar";
import "./SuperAdminScreenStyle.css";
export default function AdminDashboardScreen() {
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
            {/* <SwipeableTemporaryDrawer /> */}

            <SuperAdminDasboard/>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
