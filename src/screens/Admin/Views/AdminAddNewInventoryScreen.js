import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import InventorySidebar from "../../../components/Sidebar/InventorySidebar";
import AddNewInventory from "../Inventory/AddNewInventory";
export default function AdminAddInventoryScreen(props) {
  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col
            id="sidebar-component"
            lg={2}
            md={0}
            sm={0}
            xs={0}
            style={{ backgroundColor: "white" }}
          >
            <InventorySidebar />
          </Col>
          <Col
            lg={10}
            md={12}
            sm={12}
            xs={12}
            style={{ backgroundColor: "#FAFAFA" }}
          >
            <AddNewInventory listData={props.location.query}/>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
