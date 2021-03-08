import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import FormPopover from "../../../components/Sidebar/FormPopover";
import LeadsSidebar from "../../../components/Sidebar/LeadsSidebar";
import ToDoListAdmin from "../TodoList/ToDoListAdmin";
import AdminSidebar from "../../../components/Sidebar/AdminASidebar";
export default function AdminTodoListScreen() {
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
            <Container fluid>
              <FormPopover name="Search Leads" />
              {/* <FormPopover name="Add new Lead" /> */}
            </Container>

            {/* <AdminSidebar /> */}
          </Col>
          <Col
            lg={10}
            md={12}
            sm={12}
            xs={12}
            style={{ backgroundColor: "#FAFAFA" }}
          >
            <ToDoListAdmin />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
