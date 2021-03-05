import React from "react";
import "../../src/screens/Employe/EmployeeInventory/EmployeeInventory.css";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import {
  Backdrop,
  CircularProgress,
  makeStyles,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  Input,
  DialogActions,
  DialogContent,
  TextField,
  OutlinedInput,
} from "@material-ui/core";
import { GET } from "../utils/Functions";
import ApiUrls from "../utils/ApiUrls";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {useHistory } from "react-router-dom";
function EmployeeInventory() {
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
      "& .MuiCircularProgress-colorPrimary": {
        color: "#fff",
      },
    },
    dialog: {
      "&.MuiDialogActions-root": {
        // justifyContent: "center",
        marginRight: theme.spacing(1.5),
      },
    },
  }));

  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [openRequest, setOpenRequest] = React.useState(false);
  const history = useHistory();

  const handleFetchData = async () => {
    setIsLoading(true);
    let res = await GET(ApiUrls.INVENTORY_REQUEST + "/");
    console.log("--------------------------------", res);
    if (res.success != false) {
      setData(res.data.requests);
    }
    setIsLoading(false);
  };
  React.useEffect(() => {
    handleFetchData();
  }, []);
  const Table = ({ item, index }) => {
    return (
      <tr>
        <td scope="row">{item.id}</td>
        <td>{item.user_name}</td>
        {/* <td>{item.last_name}</td> */}
        {/* <td>{item.block_name}</td> */}
        <td style={{ textAlign: "justify" }}>{item.message}</td>
        {/* <td>{item.property_status}</td> */}
        {/* <td>{item.block_name}</td> */}
      </tr>
    );
  };
  return (
    <Container fluid className="Laa">
      {isLoading == true ? (
        <>
          <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress disableShrink />
          </Backdrop>
        </>
      ) : null}
     
      <div className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2">
      <Row>
      <IconButton
          onClick={() => {
            history.push("/admin/inventory");
          }}
          aria-label="delete"
          color="primary"
        >
          <Tooltip title="Go Back" placement="right" arrow>
            <ArrowBackIcon />
          </Tooltip>
        </IconButton>
        
<Col lg={10} sm={10} xs={10} xl={11}>
        <h3 style={{ color: "#818181" }}>Inventory Request</h3>
</Col>
        </Row>
      </div>
      <div className="col-lg-12 shadow p-3  bg-white rounded ">
        <Row>
          <Col
            lg
            md="12"
            style={{ backgroundColor: "white", borderRadius: "5px" }}
          >
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col" style={{ color: "#818181" }}>
                      ID
                    </th>
                    <th scope="col" style={{ color: "#818181" }}>
                      Name
                    </th>
                    {/* <th scope="col" style={{ color: "#818181" }}>
                      Last_Name
                    </th> */}
                    {/* <th scope="col" style={{ color: "#818181" }}>
                      Type of Unit
                    </th> */}
                    <th scope="col" style={{ color: "#818181" }}>
                      Message
                    </th>

                    {/* <th scope="col" style={{ color: "#818181" }}>
                      Viewable To
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <Table item={item} index={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </div>
      {/* <Modal
        show={openRequest}
        onHide={() => {
          setOpenRequest(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#818181" }}>
            Request Inventory
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <TextField
              variant="outlined"
              autoFocus
              margin="dense"
              multiline
              required
              fullWidth
              label="Request Inventroy"
              // value={message}
              // onChange={(e) => {
              //   handleChange(e.target.value);
              // }}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            // style={{ backgroundColor: "#2258BF" }}
            onClick={() => {
              setOpenRequest(false);
            }}
          >
            Close
          </Button>
          <Button
            type="submit"
            // style={{ backgroundColor: "#2258BF" }}
            onClick={() => {
              setOpenRequest(false);
            }}
          >
            Send
          </Button>
        </Modal.Footer>
      </Modal> */}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.user_info,
  };
};

// export default Login;
export default connect(mapStateToProps)(EmployeeInventory);
