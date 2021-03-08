import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import InventoryMobileViewSidebar from "../../../components/Sidebar/InventoryMobileViewSidebar";
import LAASidebar from "../../../components/Sidebar/LAASidebar";
import LeadsAllocatonAndAddition from "../LeadsAllocationAndAddition/LeadsAllocatonAndAddition";
import AdminSidebar from "../../../components/Sidebar/AdminASidebar";
export default function AdminLAAScreen(props) {
  const [search, setSearch] = React.useState(false);
  const [url, setUrl] = React.useState(false);

 const handleSearch = (url,search) => {
  setUrl(url);
  setSearch(search);
  console.log("url and search", url,search);
  };
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
            <AdminSidebar update={handleSearch}/>
            {/* <InventoryMobileViewSidebar /> */}
          </Col>
          <Col
            lg={10}
            md={12}
            sm={12}
            xs={12}
            style={{ backgroundColor: "#FAFAFA" }}
          >
            <LeadsAllocatonAndAddition searchData={{url:url,search:search}}  update={handleSearch}/>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
