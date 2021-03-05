import React from "react";
import { Backdrop, makeStyles, CircularProgress } from "@material-ui/core";

export default function PreLoading({ startLoading }) {
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
      "& .MuiCircularProgress-colorPrimary": {
        color: "#fff",
      },
    },
  }));

  const classes = useStyles();

  return (
    <>
      {startLoading == true ? (
        <>
          <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress disableShrink />
          </Backdrop>
        </>
      ) : null}
    </>
  );
}
