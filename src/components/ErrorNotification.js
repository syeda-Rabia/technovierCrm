import React from "react";
import { Slide, Grow, Snackbar } from "@material-ui/core";
import { Alert, AlertTitle, Skeleton } from "@material-ui/lab";

export default function ErrorNotification({ showError, message, closeError }) {
  return (
    <div>
      {showError == true ? (
        <Slide in={showError} direction="up">
          <Snackbar
            open={showError}
            autoHideDuration={3000}
            onClose={() => closeError(false)}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <Alert variant="filled" severity="error">
              <AlertTitle className="float-left ">Error</AlertTitle>
              <br />
              <span style={{ float: "right" }}>
                {message === "" || message === null || message === undefined
                  ? "Record not Submitted"
                  : message}
              </span>
            </Alert>
          </Snackbar>
        </Slide>
      ) : null}
    </div>
  );
}
