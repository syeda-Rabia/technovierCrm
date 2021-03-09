import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AddInterest from "../Leads/AddInterest";

import AdminSidebar from "../../../components/Sidebar/AdminASidebar";
import SwipeableTemporaryDrawer from "../../../components/Sidebar/LAAMobileViewSidebar";
import "./AdminDashboardScreen.css";
export default function AdminAddInterestScreen() {
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
             <AdminSidebar /> 
          </Col>
          <Col
            lg={10}
            md={12}
            sm={12}
            xs={12}
            style={{ backgroundColor: "#FAFAFA" }}
          >
            {/* <SwipeableTemporaryDrawer /> */}

            <AddInterest />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
