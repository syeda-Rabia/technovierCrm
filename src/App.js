import "./App.css";
import React from "react";
import HeaderNavBar from "./components/Header/HeaderNavBar";
import { Container, Row, Col } from "react-bootstrap";
import LeadsAllocatonAndAddition from "./screens/Admin/LeadsAllocationAndAddition/LeadsAllocatonAndAddition";
import AdminDashboard from "./screens/Admin/Dashboard/AdminDashboard";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import SignIn from "./screens/Admin/SignIn/SignIn";
import ClosedLeads from "./screens/ClosedLeads";
import LeadsAdmin from "./screens/Admin/Leads/LeadsAdmin";
import InventoryAdmin from "./screens/Admin/Inventory/InventoryAdmin";
// import Demo from "./screens/Demo";gjhgj
import ToDoListAdmin from "./screens/Admin/TodoList/ToDoListAdmin";
import EmployeHeader from "./components/EmployeHeader/EmployeHeader";
import AddEmployee from "./screens/Admin/AddUser/AddEmployee";
import LeadsSidebar from "./components/Sidebar/LeadsSidebar";
import LAASidebar from "./components/Sidebar/LAASidebar";
import ViewableTo from "./screens/Admin/ViewableTo/ViewableTo";
import InventorySidebar from "./components/Sidebar/InventorySidebar";
import AddInventory from "./screens/Admin/Inventory/AddInventory";
import { KeyboardDatePickerExample } from "./utils/KeyboardTimePickerExample";

function App() {
  var location = useLocation();
  const [condition, setCondition] = React.useState("");

  const usePageViews = () => {
    React.useEffect(() => {
      setCondition(location.pathname);
      // ;
      // ;
    }, [location]);
  };
  const [userType, setUSerType] = React.useState("admin");

  // const Condition = () => {
  //   if (
  //     condition === '/admin/dashboard' ||
  //     '/admin/leadsallocation' ||
  //     '/admin/closedleads'
  //   ) {
  //     return <LAASidebar />;
  //   } else {
  //     return <LeadsSidebar />;
  //   }
  // };
  const AdminRoute = () => {
    return (
      <React.Fragment>
        <HeaderNavBar />
        <Container fluid style={{ height: "100vh" }}>
          <Row>
            <Col
              lg={2}
              md={2}
              sm={5}
              xs={5}
              style={{ backgroundColor: "white" }}
            >
              {/* <Condition /> */}
              {/* <LAASidebar /> */}
              <InventorySidebar />
            </Col>
            <Col
              lg={10}
              md={10}
              sm={7}
              xs={7}
              style={{ backgroundColor: "#FAFAFA" }}
            >
              <Route exact path="/admin/dashboard">
                <AdminDashboard />
              </Route>

              <Route exact path="/admin/leadsallocation">
                <LeadsAllocatonAndAddition />
              </Route>
              <Route exact path="/admin/user">
                <AddEmployee />
              </Route>
              <Route exact path="/admin/closedleads">
                <ClosedLeads />
              </Route>
              <Route exact path="/admin/leads">
                <LeadsAdmin />
              </Route>
              <Route exact path="/viewable">
                <ViewableTo />
              </Route>

              <Route exact path="/admin/inventory">
                <InventoryAdmin />
                {/* <ProjectList /> */}
              </Route>
              <Route exact path="/admin/inventory/add">
                <AddInventory />
              </Route>

              <Route exact path="/admin/todolist">
                <ToDoListAdmin />
              </Route>
              <Route exact path="/filter">
                <ToDoListAdmin />
              </Route>

              <Route exact path="/test">
                <KeyboardDatePickerExample />
              </Route>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  };

  const EmployeRoute = () => {
    return (
      <React.Fragment>
        <EmployeHeader />
        <Container fluid style={{ height: "100vh" }}>
          <Row>
            <Col
              lg={2}
              md={2}
              sm={5}
              xs={5}
              style={{ backgroundColor: "white" }}
            >
              <LeadsSidebar />
            </Col>
            <Col
              lg={10}
              md={10}
              sm={7}
              xs={7}
              style={{ backgroundColor: "#FAFAFA" }}
            >
              <Route exact path="/employe/dashboard">
                <AdminDashboard />
              </Route>

              <Route exact path="/employe/leads">
                <LeadsAdmin />
              </Route>

              <Route exact path="/employe/inventory">
                <InventoryAdmin />
              </Route>

              <Route exact path="/employe/todolist">
                <ToDoListAdmin />
              </Route>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SignIn setUser={setUSerType} />
        </Route>
        {userType === "admin" ? <AdminRoute /> : <EmployeRoute />}
      </Switch>
    </Router>
  );
}

export default App;
