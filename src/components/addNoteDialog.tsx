import React, { useState } from "react";
import { useRecordContext, useRefresh, fetchUtils } from "react-admin";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const API_URL =
  import.meta.env.VITE_JSON_SERVER_URL || "http://localhost:3001/api";

export default function SendMessageDialog() {
  const record = useRecordContext();
  const refresh = useRefresh();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendMessage = async () => {
    console.log(record["id"]);
    const response = await fetchUtils.fetchJson(
      `${API_URL}/send-message?message=${message}&chatId=${record["telegram"]}&userId=${record["id"]}`
    );

    if (response.status !== 200) {
      throw new Error("Server error");
    }
    console.log(response.json);
    handleClose();
    refresh();
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Send Message
      </Button>
      <Dialog
        maxWidth="xl"
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">{"Send message to User"}</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label="Message"
            variant="outlined"
            multiline
            rows={4}
            style={{ width: "500px" }}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={sendMessage}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
