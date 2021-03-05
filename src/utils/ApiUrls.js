// ROUTE NAME FOR SERVER APIS

const ApiUrls = {
  // AUTHENTICATION
  LOGIN: "/login",
  LOGOUT: "",

  // USERS
  CREATE_USER: "admin/employee/add",
  EDIT_USER: "admin/employee/edit",
  DELETE_USER: "admin/employee/delete/",
  BLOCK_USER: "admin/employee/blocked/  ",
  GET_ALL_USER: "admin/employee/all",
  GET_ALL_DASHBOARD_USER: "admin/dashboard/employee/all",
  GET_ALL_DASHBOARD_USER_LEADS: "admin/dashboard/allocatedLeads/",

  USER_DATA_PAGINATION: "admin/employee/all?page=",

  // PROJECT CATEGORIES
  CREATE_PROJECT_CATEGORY: "admin/projectCategory/add",
  GET_ALL_PROJECT_CATEGORIES: "admin/projectCategory/all",
  GET_DELETED_PROJECT_CATEGORIES: "admin/projectCategory/delete/",
  POST_All_EDITED_CATEGORIES: "admin/projectCategory/edit ",

  // INVENTORIES
  CREATE_PROJECT: "admin/project/add",
  POST_CREATE_EXISTING_PROJECT_INVENTORIES:"admin/project/addInventory",
  EDIT_PROJECT: "admin/project/edit",
  DELETE_PROJECT: "admin/project/delete/",
  INVENTORY_REQUEST: "admin/inventoryRequest/all",

  GET_ALL_PROJECTS: "admin/project/all",
  GET_SINGLE_PROECT_INVENTORIES: "admin/inventory/all",
  POST_All_EDITED_INVENTORIES: "admin/inventory/edit",
  GET_DELETED_INVENTORIES: "admin/inventory/delete/",

  //   VIEWABLE
  ASSIGN_VIEWABLE_INVETORIES: "",
  GET_USER_VIEWABLE_INVENTORIES: "employee/inventory/all/",
  GET_ALL_VIEWABLE_INVENTORIES: "admin/viewable/getProjects",
  GET_ALL_EMPLOYEES: "admin/viewable/getEmployees",
  POST_ALL_SELECTED_EMPLOYEES_AND_INVENTORY: "admin/viewable/add ",

  // LEADS
  CREATE_LEAD: "admin/lead/add",
  EDIT_LEAD: "admin/lead/edit",
  CALL_TO_ACTION: "admin/lead/cta",
  DELETE_LEAD: "admin/lead/delete/",
  GET_ALL_LEADS: "admin/lead/all",
  GET_USER_LEADS: "employee/lead/all/",
  EMPLOYEE_ACTION: "employee/lead/edit",
  GET_EMPLOYEE_LEAD_ACTION:"admin/empAction/lead",
  GET_ALL_CLOSED_LEADS:"admin/lead/close",
  //excel sheet read api
  POST_ADD_LEAD_USING_EXCEL_SHEET:"admin/lead/addLeads",
// filter 
GET_FILTER_DATA:"admin/lead/getleads",
GET_LEAD_ALLOCATION_FILTER_DATA:"admin/leadAllocation/filterLeads",

  // LEAD ALLOCATION
  GET_ALL_ALLOCATE_OR_RE_ALLOCATE_LEADS: "admin/leadAllocation/all",
  ASSIGN_LEAD_TO_USER: "leadAllocation/assign",
  UPDATE_LEAD_TO_USER: "admin/leadAllocation/assign",
  POST_ADD_MULTIPLE_LEAD_ALLOCATION: "admin/leadAllocation/leads",
  //policy
  GET_POLICY_LIST: "admin/policy/list",
  EDIT_POLICY_DETAILS:"admin/policy/edit/",
  DELETE_POLICY_DETAILS:"admin/policy/delete/",
  ADD_POLICY_DETAILS:"admin/policy/add",
  GET_EMPLOYEE_POLICY_LIST:"employee/policy/list",

  //   DASHBOARD

  // Interest
  GET_ALL_INTEREST: "admin/interest/all",
  EDIT_INTEREST: "admin/interest/edit",
  DELETE_INTEREST: "admin/interest/delete/",
  ADD_INTEREST: "admin/interest/add",

  // Recording Employee
  ADD_RECORDING: "employee/recording/add",

  // Employee inventory request
  EMPLOYEE_INVENTORY_REQUEST: "employee/inventory/request",
  // employee action on lead
  POST_EMPLOYEE_ACTION_ON_LEAD: "employee/empAction/add",
  // admin action on lead
  GET_ADMIN_ACTION_ON_LEAD:"employee/adminAction/lead",
};

export default ApiUrls;
