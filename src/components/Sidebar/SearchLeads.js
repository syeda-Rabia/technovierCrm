import React, { useState, useRef } from "react";
import {
  Container,
  Dropdown,
  Form,
  Popover,
  Button,
  Overlay,
  OverlayTrigger,
  Tooltip,
  Row,
  Col,
} from "react-bootstrap";
import "./SearchLeads.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
export default function SearchLeads(props) {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Project</Form.Label>
                <Form.Control
                  controlId="projectName"
                  as="select"
                  defaultValue="Project Name"
                >
                  <option>Project 1</option>
                  <option>Project 2</option>
                </Form.Control>
                <Form.Label>Date wise</Form.Label>
                <Form.Control
                  controlId="date"
                  as="select"
                  defaultValue="Date Wise"
                >
                  <option>Date 1</option>
                  <option>Date 2</option>
                </Form.Control>
                <Form.Label>Year Wise</Form.Label>
                <Form.Control
                  controlId="year"
                  as="select"
                  defaultValue="Year Wise"
                >
                  <option>Year wise 1</option>
                  <option>Year Wise 2</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Sale Person</Form.Label>
                <Form.Control
                  controlId="Sale Person"
                  as="select"
                  defaultValue="Sale Person"
                >
                  <option>Person 1</option>
                  <option>Person 2</option>
                </Form.Control>
                <Form.Label>Month Wise</Form.Label>
                <Form.Control
                  controlId="month"
                  as="select"
                  defaultValue="Month Wise"
                >
                  <option>Month 1</option>
                  <option>Month 2</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          {/* <Button variant="primary" type="submit">
            Submit
          </Button> */}
        </Form>
      </Popover.Content>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
      <Button
        id="searchLeads"
        style={{ textAlign: props.alignText, paddingLeft: props.leftPadding }}
        // onClick={() =>  }
      >
        {props.name} <ExpandMoreIcon />
      </Button>
    </OverlayTrigger>
  );
}
