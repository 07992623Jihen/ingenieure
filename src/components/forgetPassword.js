import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ErrorModel from "../model/error-model";
import SuccessModel from "../model/success-model";

export default function ForgetPassword() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [email, setEmail] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const onchange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    console.log(email);

    try {
      let response = await fetch(
        "http://localhost:5000/api/ingenieur/forgetPassword",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );
      let responsedata = await response.json();
      if (!response.ok) {
        throw new Error(responsedata.message);
      }
      setsuccess(
        "votre mot de passe a été mis à jour veuiller consulter votre boite email."
      );
    } catch (err) {
      console.log(err);
      seterror(err.message || "probleme!!");
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Changer le mot de passe
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Mise à jour de mot de passe
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Taper votre Email pour recevoir un nouveaux mot de passe
          </DialogContentText>
          <ErrorModel error={error} />
          <SuccessModel success={success} />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Adresse email"
            type="email"
            required
            name="email"
            onChange={onchange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={submit} color="primary">
            Envoyer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
