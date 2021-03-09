import "./App.css";
import React, { useState } from "react";
import AdminHeader from "./components/Header/AdminHeader";
import HeaderNavBar from "./components/Header/HeaderNavBar";
import EmployeHeader from "./components/EmployeHeader/EmployeHeader";
import EmployeeHeader from "./components/Header/EmployeeHeader";
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
import AdminAddIntersetScreen from "./screens/Admin/Views/AdminAddInterestScreen";
import AdminInventoryViewableScreen from "./screens/Admin/Views/AdminInventoryViewableScreen";
import AdminPoliciesScreen from "./screens/Admin/Views/AdminPoliciesScreen";
import AdminActionOnLeadScreen from "./screens/Admin/Views/AdminActionOnLeadScreen";
import AdminClosedLeadsScreen from "./screens/Admin/Views/AdminClosedLeadsScreen";
import ViewableTo from "./screens/Admin/ViewableTo/ViewableTo";
import AdminAddUserScreen from "./screens/Admin/Views/AdminAddUserScreen";
import EmployeeDashboardScreen from "./screens/Employe/Views/EmployeeDashboardScreen";
import EmployeeLeadsScreen from "./screens/Employe/Views/EmployeeLeadsScreen";
import EmployeeInventory from "./screens/Employe/EmployeeInventory/EmployeeInventory";
import EmployeeToDo from "./screens/Employe/EmployeeToDo/EmployeeToDo";
import EmployeeToDoScreen from "./screens/Employe/Views/EmployeeToDoScreen";
import EmployeePolicies from "./screens/Employe/Policies/EmployeePolicies";
import EmployeeInventoryScreen from "./screens/Employe/Views/EmployeeInventoryScreen";
import EmployeePoliciesScreen from "./screens/Employe/Views/EmployeePoliciesScreen";
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
import EmployeeInventoryRequestscreen from "./screens/Admin/Views/EmployeeInventoryRequestscreen";
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
          <AdminHeader />
          <AdminAddInventoryScreen />
        </Route>
        <Route path="/admin/newinventory" 
          render={(props) => (
            <>
              <AdminHeader />
            
              <AdminAddNewInventoryScreen {...props} />
            </>
          )}>
       
        </Route>
        <Route path="/admin/employee-request">
          <AdminHeader />
          <EmployeeInventoryRequestscreen />
        </Route>

        <Route
          exact
          path="/admin/projects"
          render={(props) => (
            <>
              <AdminHeader />
              <AdminProjectDetailsScreen {...props} />
            </>
          )}
        />

        <Route path="/admin/add-category">
          <AdminHeader />
          <AdminCategoriesDetailScreen />
        </Route>
        <Route path="/admin/add-interest">
          <AdminHeader />
          <AdminAddIntersetScreen />
        </Route>
        <Route path="/admin/emp-action"  
        render={(props) => (
            <>
              <AdminHeader />
              <AdminActionOnLeadScreen {...props} />
            </>
          )}>
        
        </Route>
        <Route
          exact
          path="/admin/inventory"
          render={(props) => (
            <>
              <AdminHeader />
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
          <AdminHeader />
          <AdminDashboardScreen />
        </Route>
        <Route
          exact
          path="/admin/leadsallocation"
          render={(props) => (
            <>
              <AdminHeader />
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
              <AdminHeader />
              <AdminLeadsScreen {...props} />
            </>
          )}
        />
        {/* <Route path="/admin/leads">
          <HeaderNavBar />
          <AdminLeadsScreen />
        </Route> */}
        <Route path="/admin/todolist">
          <AdminHeader />
          <AdminTodoListScreen />
        </Route>
        <Route path="/admin/user">
          <AdminHeader />
          <AdminAddUserScreen/>
        </Route>
        <Route path="/admin/policies">
          <AdminHeader />
          <AdminPoliciesScreen/>
        </Route>
        <Route exact path="/admin/viewable">
          <AdminHeader />
          <AdminInventoryViewableScreen />
        </Route>
        <Route exact path="/admin/closedleads">
          <AdminHeader />
          <AdminClosedLeadsScreen />
        </Route>
        <Route path="/admin/upload-file">
          <AdminHeader />
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

          <EmployeeHeader />
          <EmployeeDashboardScreen />
        </Route>
        <Route
          exact
          path="/employee/inventory-details"
          render={(props) => (
            <>
              <EmployeeHeader />
          <EmployeeInventoryDetails {...props} />
            </>
          )}
        />
        {/* <Route path="/employee/inventory-details">
          <EmployeeHeader />
          <EmployeeInventoryDetails/>
        </Route> */}
        <Route
          exact
          path="/employee/leads"
          render={(props) => (
            <>
              <EmployeeHeader />
          <EmployeeLeadsScreen {...props} />
            </>
          )}
        />
        <Route
          exact
          path="/employee/inventory"
          render={(props) => (
            <>
              <EmployeeHeader />
          <EmployeeInventoryScreen {...props} />
            </>
          )}
        />
        {/* <Route path="/employee/inventory">
          <EmployeeHeader />
          <EmployeeInventory />
        </Route> */}
        <Route path="/employee/policies">
          <EmployeeHeader />
          <EmployeePoliciesScreen/>
        </Route>
        <Route path="/employee/todolist">
          <EmployeeHeader />
          <EmployeeToDoScreen />
        </Route>
        <Route path="/employee/admin-action"  
        render={(props) => (
            <>
              <EmployeeHeader />
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
