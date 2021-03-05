import React from "react";
import { Slide, Grow, Snackbar } from "@material-ui/core";
import { Alert, AlertTitle, Skeleton } from "@material-ui/lab";

export default function SuccessNotification({
  showSuccess,
  message,
  closeSuccess,
}) {
  return (
    <div>
      {showSuccess == true ? (
        <Slide in={showSuccess} direction="up">
          <Snackbar
            open={showSuccess}
            autoHideDuration={2000}
            onClose={() => closeSuccess(false)}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <Alert variant="filled" severity="success">
              <AlertTitle className="float-left ">Success</AlertTitle>
              <br />
              <span style={{ float: "right" }}>
                {message === "" || message === null || message === undefined
                  ? "Record Submitted"
                  : message}
              </span>
            </Alert>
          </Snackbar>
        </Slide>
      ) : null}
    </div>
  );
}
