import "./App.css";
import React, { useState } from "react";
import HeaderNavBar from "./components/Header/HeaderNavBar";
import EmployeHeader from "./components/EmployeHeader/EmployeHeader";
import { Container, Row, Col } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  Redirect,
} from "react-router-dom";
import SignIn from "./screens/Admin/SignIn/SignIn";
import AddEmployee from "./screens/Admin/AddUser/AddEmployee";
import AdminAddInventoryScreen from "./screens/Admin/Views/AdminAddInventoryScreen";
import AdminProjectListScreen from "./screens/Admin/Views/AdminProjectListScreen";
import AdminDashboardScreen from "./screens/Admin/Views/AdminDashboardScreen";
import AdminLAAScreen from "./screens/Admin/Views/AdminLA&AScreen";
import AdminLeadsScreen from "./screens/Admin/Views/AdminLeadsScreen";
import AdminTodoListScreen from "./screens/Admin/Views/AdminTodoListScreen";
import AdminCategoriesDetailScreen from "./screens/Admin/Views/AdminCategoriesDetailScreen";
import AdminAddNewInventoryScreen from "./screens/Admin/Views/AdminAddNewInventoryScreen";
import ViewableTo from "./screens/Admin/ViewableTo/ViewableTo";
import EmployeeDashboardScreen from "./screens/Employe/Views/EmployeeDashboardScreen";
import EmployeeLeadsScreen from "./screens/Employe/Views/EmployeeLeadsScreen";
import EmployeeInventory from "./screens/Employe/EmployeeInventory/EmployeeInventory";
import EmployeeToDo from "./screens/Employe/EmployeeToDo/EmployeeToDo";
import EmployeePolicies from "./screens/Employe/Policies/EmployeePolicies";
import AdminPolicies from "./screens/Admin/Policies/AdminPolicies";
import AdminAction from "./screens/Employe/Leads/AdminAction";
import InventorySidebar from "./components/Sidebar/InventorySidebar";
import ProjectList from "./screens/Admin/Inventory/ProjectList";
import AddInterest from "./screens/Admin/Leads/AddInterest";
import ExcelPage from "./utils/ExcelPage";
import EmployeeAction from "./screens/Admin/Leads/EmployeeAction";
import AddNewInventory from "./screens/Admin/Inventory/AddNewInventory";
import AdminProjectDetailsScreen from "./screens/Admin/Views/AdminProjectDetailsScreen";
import { connect } from "react-redux";
import ClosedLeads from "./screens/ClosedLeads";
import EmployeeInventoryDetails from "./screens/Employe/EmployeeInventory/EmployeeInventoryDetails";
// import { token } from "../src/utils/Config";
import EmployeeRequestTable from "./components/EmployeeRequestTable";
import Test from "./screens/Test";

const NewApp = (props) => {
  const [userType, setUserType] = React.useState("admin");
  const [TOKEN, setTOKEN] = useState(props.user.token);
  // ;
  const AdminRoute = () => {
    // ;
    return (
      <React.Fragment>
        <Route path="/admin/add-project">
          <HeaderNavBar />
          <AdminAddInventoryScreen />
        </Route>
        <Route path="/admin/newinventory" 
          render={(props) => (
            <>
              <HeaderNavBar />
            
              <AddNewInventory {...props} />
            </>
          )}>
       
        </Route>
        <Route path="/admin/employee-request">
          <HeaderNavBar />
          <EmployeeRequestTable />
        </Route>

        <Route
          exact
          path="/admin/projects"
          render={(props) => (
            <>
              <HeaderNavBar />
              <AdminProjectDetailsScreen {...props} />
            </>
          )}
        />

        <Route path="/admin/add-category">
          <HeaderNavBar />
          <AdminCategoriesDetailScreen />
        </Route>
        <Route path="/admin/add-interest">
          <HeaderNavBar />
          <AddInterest />
        </Route>
        <Route path="/admin/emp-action"  
        render={(props) => (
            <>
              <HeaderNavBar />
              <EmployeeAction {...props} />
            </>
          )}>
        
        </Route>
        <Route
          exact
          path="/admin/inventory"
          render={(props) => (
            <>
              <HeaderNavBar />
               <AdminProjectListScreen {...props}/>
            </>
          )}
        />
        {/* <Route path="/admin/inventory">
          <HeaderNavBar />
          <AdminProjectListScreen />
        </Route> */}
        {/* <Route path="/admin/dashboard"> */}

        <Route path="/" exact>
          <HeaderNavBar />
          <AdminDashboardScreen />
        </Route>
        <Route
          exact
          path="/admin/leadsallocation"
          render={(props) => (
            <>
              <HeaderNavBar />
              <AdminLAAScreen {...props} />
            </>
          )}
        />
        {/* <Route path="/admin/leadsallocation">
          <HeaderNavBar />
          <AdminLAAScreen />
        </Route> */}
        <Route
          exact
          path="/admin/leads"
          render={(props) => (
            <>
              <HeaderNavBar />
              <AdminLeadsScreen {...props} />
            </>
          )}
        />
        {/* <Route path="/admin/leads">
          <HeaderNavBar />
          <AdminLeadsScreen />
        </Route> */}
        <Route path="/admin/todolist">
          <HeaderNavBar />
          <AdminTodoListScreen />
        </Route>
        <Route path="/admin/user">
          <HeaderNavBar />
          <AddEmployee />
        </Route>
        <Route path="/admin/policies">
          <HeaderNavBar />
          <AdminPolicies />
        </Route>
        <Route exact path="/admin/viewable">
          <HeaderNavBar />
          <ViewableTo />
        </Route>
        <Route exact path="/admin/closedleads">
          <HeaderNavBar />
          <ClosedLeads />
        </Route>
        <Route path="/admin/upload-file">
          <HeaderNavBar />
          <br />
          {/* <ProjectList /> */}
          <ExcelPage />
        </Route>
        <Route path="/test">
          <Test />
        </Route>
      </React.Fragment>
    );
  };

  const EmployeeRoute = () => {
    return (
      <React.Fragment>
        <Route exact path="/">
          {/* <Route path="/employee/dashboard"> */}

          <EmployeHeader />
          <EmployeeDashboardScreen />
        </Route>
        <Route
          exact
          path="/employee/inventory-details"
          render={(props) => (
            <>
              <EmployeHeader />
          <EmployeeInventoryDetails {...props} />
            </>
          )}
        />
        {/* <Route path="/employee/inventory-details">
          <EmployeHeader />
          <EmployeeInventoryDetails/>
        </Route> */}
        <Route
          exact
          path="/employee/leads"
          render={(props) => (
            <>
              <EmployeHeader />
          <EmployeeLeadsScreen {...props} />
            </>
          )}
        />
        <Route
          exact
          path="/employee/inventory"
          render={(props) => (
            <>
              <EmployeHeader />
          <EmployeeInventory {...props} />
            </>
          )}
        />
        {/* <Route path="/employee/inventory">
          <EmployeHeader />
          <EmployeeInventory />
        </Route> */}
        <Route path="/employee/policies">
          <EmployeHeader />
          <EmployeePolicies />
        </Route>
        <Route path="/employee/todolist">
          <EmployeHeader />
          <EmployeeToDo />
        </Route>
        <Route path="/employee/admin-action"  
        render={(props) => (
            <>
              <EmployeHeader />
              <AdminAction {...props} />
            </>
          )}>
        
        </Route>
      </React.Fragment>
    );
  };

  return (
    <Router>
      <Switch>
        {props.user.logged != false && props.user.token != null ? (
          parseInt(props.user.user_info.user_type) === 1 ? (
            <AdminRoute />
          ) : (
            <EmployeeRoute />
          )
        ) : (
          <Route exact path="/">
            <SignIn setUser={setUserType} />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

const mapDispatchToProps = (dispatch) => {};

const mapStateToProps = (state) => {
  // let userType = state.auth.user_info.user_type;
  //  ;

  // userType = parseInt(state.auth.user_info.user_type);

  //  ;

  // console.log("auths is --------", state.auth);

  return {
    user: state.auth,
  };
};

// export default Login;
export default connect(mapStateToProps, mapDispatchToProps)(NewApp);
