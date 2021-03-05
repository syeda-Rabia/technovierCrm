import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Input } from "@material-ui/core";

export default function FormDialog({ show, close }) {
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <div>
      <Dialog
        open={show}
        onClose={() => {
          close(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Forget Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Enter your Email to reset your password.
          </DialogContentText>
          <Input
            autoFocus
            required
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              close(false);
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() => {
              close(false);
            }}
            color="primary"
          >
            Resest
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
