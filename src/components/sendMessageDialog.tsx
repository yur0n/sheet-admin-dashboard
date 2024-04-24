import { useState } from "react";
import { CustomDataProvider } from "../dataProvider";
import {
  useRecordContext,
  useRefresh,
  useDataProvider,
  useNotify,
  Button,
} from "react-admin";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function SendMessageDialog() {
  const dataProvider = useDataProvider() as CustomDataProvider;
  const record = useRecordContext();
  const refresh = useRefresh();
  const notify = useNotify();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendMessage = async () => {
    dataProvider
      .sendMessage("send-message", {
        message,
        data: [{ userId: record["id"].toString(), chatId: record["telegram"] }],
      })
      .then((response) => {
        if (response.status) {
          notify(response.status);
        }
        if (response.ok) {
          handleClose();
          refresh();
        }
      });
  };

  return (
    <>
      <Button onClick={handleClickOpen}>
        <SendIcon />
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
          <Button label="Cancel" variant="contained" onClick={handleClose} />
          <Button label="Send" variant="contained" onClick={sendMessage} />
        </DialogActions>
      </Dialog>
    </>
  );
}
