import React, { useEffect, useState } from "react";
import "./SignIn.css";
import Footer from "../../../components/SignIn/SignInFooter";
import pakGroup from "./../../../assests/pakGroup.jpg";
// import pkgrp from "./../../../assests/pakGroup-logo.png";
import pkgrp from "./../../../assests/tech-logo-1.png";
import { Container } from "react-bootstrap";
import { POST } from "../../../utils/Functions";
import { connect } from "react-redux";
import { setUser } from "../../../modules/Auth/actions";
import { VisibilityOff, AccountCircle, Visibility } from "@material-ui/icons";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { validateEmail, validateLength } from "../../../utils/Validation";
import {
  InputAdornment,
  IconButton,
  makeStyles,
  Slide,
  Snackbar,
  Backdrop,
  CircularProgress,
  ClickAwayListener,
  OutlinedInput,
} from "@material-ui/core";
import { Alert, AlertTitle, Skeleton } from "@material-ui/lab";
import { set } from "lodash";
import { Link } from "react-router-dom";
import FormDialog from "../../ForgetPassword/ForgetPassword";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [is_blocked, setIsBlocked] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [errorResponce, setErrorResponce] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
      "& .MuiCircularProgress-colorPrimary": {
        color: "#fff",
      },
    },
    input: {
      borderRadius: "30px",
      width: "100%",
    },
  }));

  const classes = useStyles();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClose = () => {
    setShowAlert(false);
  };
  const handleClickAway = () => {
    setEmailError(null);
  };

  const SignInFun = async (event) => {
    // loding dstasrt
    event.preventDefault();
    setIsLoading(true);

    let url = "login";
    let formData = {
      email: email,
      password: password,
    };

    let resp = await POST(url, formData);
    console.log(resp);

    if (resp.data != null) {
      let { user, Access_token } = resp.data;
      props.OnLoginSuccess(user, Access_token);
    } else {
      try {
        if (resp.error.hasOwnProperty("email")) {
          setErrorResponce(resp.error.email[0]);
        } else if (resp.error.hasOwnProperty("password")) {
          setErrorResponce(resp.error.password[0]);
        }
        else  if (resp.error.hasOwnProperty("message")) {
          console.log("message");
          setErrorResponce(resp.error.message[0]);
          setShowAlert(true);
          setIsLoading(false);
        }
         else {
          setErrorResponce(resp.error);
        }
        setShowAlert(true);
        setIsLoading(false);
      } catch { 
      //   if (resp.error.hasOwnProperty("message")) {
      //   console.log("message");
      //   setErrorResponce(resp.error.message[0]);
      //   setShowAlert(true);
      //   setIsLoading(false);
      // }
    }
    }

    // lodimg false
  };

  return (
    <Container fluid>
      <div className="row">
        {isLoading == true ? (
          <>
            <Backdrop className={classes.backdrop} open={true}>
              <CircularProgress disableShrink />
            </Backdrop>
          </>
        ) : null}
        {showAlert == true ? (
          <Slide in={showAlert} direction="up">
            <Snackbar
              open={showAlert}
              autoHideDuration={2000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
            >
              <Alert variant="filled" severity="error">
                <span className="mr-5" style={{ textAlign: "center" }}>
                  {errorResponce}
                </span>
              </Alert>
            </Snackbar>
          </Slide>
        ) : null}

        <div
          className="col-lg-7 col-md-6"
          style={{ backgroundColor: "#F7FAFD", border: "1px black" }}
        >
          <div className="first-logo" style={{ height: "119px" }}>
            <img style={{ width: "200px", height: "120px" ,marginTop:"25px",marginBottom:"25px"}} src={pkgrp} />
          </div>

          {/* <Container fluid style={{marginLeft:'30px',marginRight:'300px',border:'1px solid black'}}> */}
          <div
            className="signin-image"
            style={{ marginRight: "30px", marginLeft: "30px" }}
          >
            <img style={{ width: "90%", height: "300px" }} src={pakGroup} />
          </div>
          {/* </Container> */}
          <div
            className="row mb-4 px-3 content"
            style={{
              paddingTop: "20px",
              marginRight: "30px",
              marginLeft: "30px",
            }}
          >
            <p className="content">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur.
            </p>
          </div>
        </div>

        <div className="col-lg-5 col-md-6">
          <div className="login-form ">
            <form
              onSubmit={(e) => {
                SignInFun(e);
              }}
            >
              <div className="container fluid" style={{ paddingTop: "100px" }}>
                <h2 style={{ color: "#2258BF" }}>Sign In</h2>
                <h6 style={{ textAlign: "center" }}>
                  Sign in using your email address{" "}
                </h6>
                <div
                  className="form-group"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "50px",
                  }}
                >
                  {/* <ClickAwayListener onClickAway={handleClickAway}> */}
                  {/* <div
                      className="form-control input1"
                      id={
                        emailError
                          ? "error"
                          : emailError == false
                          ? "noError"
                          : null
                      }
                    > */}
                  <OutlinedInput
                    className={classes.input}
                    // disableUnderline={true}
                    // fullWidth={true}
                    placeholder="Enter Email"
                    type="email"
                    value={email}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          disableRipple
                          disableFocusRipple
                          style={{ outline: "none" }}
                        >
                          <AccountCircle />
                        </IconButton>
                      </InputAdornment>
                    }
                    onChange={(e) => {
                      if (validateEmail(e.target.value)) {
                        setEmailError(false);
                      } else {
                        setEmailError(true);
                      }
                      setEmail(e.target.value);
                    }}
                  />
                  {/* </div> */}
                  {/* </ClickAwayListener> */}
                </div>
                <div
                  className="form-group"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <OutlinedInput
                    // disableUnderline={true}
                    // fullWidth={true}
                    className={classes.input}
                    placeholder="Enter Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      if (validateLength(e.target.value, 8)) {
                        setPasswordError(false);
                      } else {
                        setPasswordError(true);
                      }
                      setPassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          style={{ outline: "none" }}
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </div>
                <div
                  className="flx"
                  style={{
                    // backgroundColor: "red",
                    width: "100%",
                    paddingTop: "20px",
                    // height: 50,
                    display: "flex",
                    // paddingRight: 20,
                    // paddingLeft: 30,
                    // flexDirection: "column",
                  }}
                >
                  <div
                    className="custom-control custom-checkbox"
                    style={{
                      display: "flex",
                      flex: 1,
                      // backgroundColor: "blue",
                      // margin: 10,
                      justifyContent: "center",
                    }}
                  >
                    <input
                      style={{
                        borderRadius: "20px",
                      }}
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck1"
                    >
                      Remember me
                    </label>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flex: 1,

                      // backgroundColor: "blue",
                      // margin: 10,
                      justifyContent: "center",
                    }}
                  >
                    <p
                    // style={{
                    //   display: "flex",
                    //   alignSelf: "flex-end",
                    // }}
                    >
                      <FormDialog
                        show={forgetPassword}
                        close={setForgetPassword}
                      />
                      <a
                        style={{ color: "blue" }}
                        onClick={() => setForgetPassword(true)}
                      >
                        Forgot password?
                      </a>
                    </p>
                  </div>
                </div>
                {/* <Link to="/admin/dashboard" style={{ color: "white" }}> */}
                <div
                  className="form-group"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button type="submit" className="btn btn-primary button1">
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div> 
      <div>
        <Footer />
      </div>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    OnLoginSuccess: (userData, token) => dispatch(setUser(userData, token)),
  };
};

const mapStateToProps = (state) => {
  //  ;
};

// export default Login;
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
