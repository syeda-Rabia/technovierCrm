import React, { useEffect, useState } from "react";
import "./ToDoListAdmin.css";
import { dummyData } from "../../../assests/constants/todoList";
import { Container, Row, Col, Button, Card, Modal } from "react-bootstrap";
import Pagination from "../../../components/Pagination/Pagination";
import { paginate } from "../../../utils/paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";
import sample from "./../../../assests/sample.mp3";
import sample2 from "./../../../assests/sample2.mp3";

import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";

import { 
  KeyboardTimePickerExample,
  KeyboardDatePickerExample,
} from "../../../utils/KeyboardTimePickerExample";
import TODOMobileViewSidebar from "../../../components/Sidebar/TODOMobileViewSidebar";

export default function ToDoListAdmin() {
  const [data, setData] = React.useState(dummyData);
  const totalCount = data.length;
  const [pageSize, setPageSize] = React.useState(5);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(0);
  const [setPlay, setShowPlay] = React.useState(false);
  const [value, setValue] = useState();

  const [selectedID, setSelectedID] = useState(0);
  const audioTune = new Audio(sample);
  const audioTune2 = new Audio(sample2);
  const lastIndex = currentPage * pageSize;
  const istIndex = lastIndex - pageSize;
  const currentData = data.slice(istIndex, lastIndex);
  var today = new Date();

  //  ;
  //  ;
  const handleShow = (pageCount) => {
    setPageCount(pageCount);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
    //  ;
  };
  const handleDateTime = (value) => {};
  const ModalPlay = ({ item }) => {
    const [playAudio, setPlayAudio] = useState(false);
    const [playAudio2, setPlayAudio2] = useState(false);

    useEffect(() => {
      audioTune.load();
    }, []);

    const playSound = () => {
      audioTune.play();
      setPlayAudio(true);
    };

    const pauseSound = () => {
      audioTune.pause();
      setPlayAudio(false);
    };

    useEffect(() => {
      audioTune2.load();
    }, []);

    const playSound2 = () => {
      audioTune2.play();
      setPlayAudio2(true);
    };

    const pauseSound2 = () => {
      audioTune2.pause();
      setPlayAudio2(false);
    };

    return (
      <Modal
        show={setPlay}
        onHide={() => {
          setShowPlay(false);
        }}
      >
        <Modal.Header
          closeButton
          className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2"
        >
          <Modal.Title style={{ color: "#818181" }}>Recordings</Modal.Title>
        </Modal.Header>
        <div className="col-lg-12 shadow p-3  bg-white rounded ">
          <Modal.Body>
            <Card
              className="shadow  bg-white rounded "
              style={{ width: "80%", height: "40px", marginLeft: "35px" }}
            >
              <Card.Body>
                <span className="spn1">01/12/2020</span>
                <span className="spn2">Recording 1</span>
                {playAudio ? (
                  <button
                    type="button"
                    className="bg-transparent  button-focus mr-2 button-bg"
                    onClick={pauseSound}
                  >
                    <FontAwesomeIcon style={{ fontSize: 15 }} icon={faPause} />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="bg-transparent  button-focus mr-2 button-bg"
                    onClick={playSound}
                  >
                    <FontAwesomeIcon style={{ fontSize: 15 }} icon={faPlay} />
                  </button>
                )}
              </Card.Body>
            </Card>
            <Card
              className="shadow  bg-white rounded "
              style={{
                width: "80%",
                height: "40px",
                marginTop: "20px",
                marginLeft: "35px",
              }}
            >
              <Card.Body>
                <span className="spn1">31/12/2020</span>
                <span className="spn2">Recording 2</span>
                {playAudio2 ? (
                  <button
                    type="button"
                    className="bg-transparent  button-focus mr-2 button-bg"
                    onClick={pauseSound2}
                  >
                    <FontAwesomeIcon style={{ fontSize: 15 }} icon={faPause} />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="bg-transparent  button-focus mr-2 button-bg"
                    onClick={playSound2}
                  >
                    <FontAwesomeIcon style={{ fontSize: 15 }} icon={faPlay} />
                  </button>
                )}
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{ backgroundColor: "#2258BF" }}
              onClick={() => {
                setShowPlay(false);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    );
  };

  const TableRow = ({ index, item }) => {
    //  ;
    const records = paginate(data, currentPage, pageSize);
    return (
      <tr>
        <td key={item.id}>{item.id}</td>
        <td>
          <input
            key={item.id}
            placeholder={item.Clients}
            className="form-control w-100"
          />
        </td>
        <td>
          <input
            key={item.id}
            placeholder={item.Contacts}
            className="form-control w-100"
          />
        </td>
        <td>
          <select key={item.id} className="form-control form-control-sm w-100">
            {item.Project.map((project) => (
              <option>{project}</option>
            ))}
          </select>
        </td>
        <td>
          <input
            key={item.id}
            placeholder={item.Budget}
            className="form-control w-100"
          />
        </td>

        <td key={item.id}>
          <div
            style={{ marginLeft: "10px", marginRight: "60px", width: "100%" }}
          >
            <KeyboardTimePickerExample
              value={today}
              showTime={handleDateTime}
            />
          </div>
        </td>
        <td key={item.id}>{item.Country}</td>

        <td>
          <select key={item.id} className="form-control form-control-sm w-100">
            {item.Status.map((status) => {
              return <option>{status}</option>;
            })}
          </select>
        </td>

        <td>
          <select key={item.id} className="form-control form-control-sm w-100">
            {item.Interest.map((interest) => {
              return <option>{interest}</option>;
            })}
          </select>
        </td>
        <td>
          <input
            key={item.id}
            placeholder={item.Email}
            className="form-control w-100"
          />
        </td>
        <td>
          <select key={item.id} className="form-control form-control-sm w-100">
            {item.Task.map((task) => {
              return <option>{task}</option>;
            })}
          </select>
        </td>
        <td key={item.id}>
          <div
            className=""
            style={{ marginLeft: "15px", marginRight: "70px", width: "100%" }}
          >
            <KeyboardDatePickerExample
              value={today}
              showDate={handleDateTime}
            />
          </div>
        </td>
        <td>Rabia</td>
        <td>
          <button
            data-tip
            data-for="ViewTip"
            type="button"
            className="bg-transparent  button-focus mr-2"
            onClick={() => {
              setShowPlay(true);
              setSelectedID(index);
            }}
          >
            <FontAwesomeIcon style={{ fontSize: 15 }} icon={faPlay} />
          </button>
          <ReactTooltip id="ViewTip" place="top" effect="solid">
            play
          </ReactTooltip>
        </td>
      </tr>
    );
  };
  return (
    <Container fluid className="Laa">
      <Row className="shadow p-3 mb-3 bg-white rounded mt-4 ">
        <Col lg={10} sm={10} xs={10} xl={11}>
          <h3 style={{ color: "#818181" }}>
            TODO List <sub>(Admin)</sub>
          </h3>
        </Col>

        <Col lg={2} sm={2} xs={2} xl={1} id="floatSidebar">
          <div className="float-right ">
            <TODOMobileViewSidebar />{" "}
          </div>
        </Col>
      </Row>

      <Row>
        <div className="col-lg-12 shadow p-3  bg-white rounded ">
          <div className="table-responsive">
            <table id="todolistTable" className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      ID
                    </span>
                  </th>
                  <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      Clients
                    </span>
                  </th>
                  <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      Contacts
                    </span>
                  </th>
                  <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      Project
                    </span>
                  </th>
                  <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      {" "}
                      Budget
                    </span>
                  </th>
                  <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      TOC
                    </span>
                  </th>
                  <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      {" "}
                      Country/City
                    </span>
                  </th>
                  <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      Status
                    </span>
                  </th>
                  <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      Interest
                    </span>
                  </th>
                  <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      Email
                    </span>
                  </th>
                  <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      Task
                    </span>
                  </th>
                  <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      Deadline
                    </span>
                  </th>
                  <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      {"Returned_From"}
                    </span>
                  </th>
                  <th scope="col">
                    <span id="sn" style={{ color: "#818181" }}>
                      Recording
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => {
                  return <TableRow index={index} item={item} />;
                })}
              </tbody>
              {data.length > 0 ? (
                <>
                  <ModalPlay item={data[selectedID]} />
                </>
              ) : null}
            </table>
          </div>
        </div>
      </Row>
      <Row>
        <Col>
          <p className="page-info">
            Showing {currentPage} from {pageCount}
          </p>
        </Col>
        <Col>
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            show={handleShow}
          />
        </Col>
      </Row>
    </Container>
  );
}
