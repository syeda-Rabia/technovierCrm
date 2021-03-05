import React from "react";
import { Container } from "react-bootstrap";
import EmployeeFormPopover from "./EmployeeFormPopover";
import SearchLeads from "./SearchLeads";

export default function EmployeeLeadsSidebar(props) {
  console.log(props,"SideBar Screen")
  return (
    <Container
      fluid
      style={{
        height: "86vh", 
      }}
    >
      <EmployeeFormPopover name="Search Leads" update={props.update} />
      {/* <FormPopover name="Search Visit" update={props.update}/> */}
      {/* <SearchLeads name="Search Leads" />
      <SearchLeads name="Search Visit" /> */}
    </Container>
  );
}
