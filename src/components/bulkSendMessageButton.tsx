import { useState } from "react";
import { CustomDataProvider } from "../dataProvider";
import {
  useListContext,
  useRefresh,
  useNotify,
  useUnselect,
  useUnselectAll,
  Button,
  useDataProvider,
} from "react-admin";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function BulkSendMessageButton() {
  const dataProvider = useDataProvider() as CustomDataProvider;
  const { selectedIds, data, resource } = useListContext();
  const unselect = useUnselect(resource);
  const refresh = useRefresh();
  const notify = useNotify();
  const unselectAll = useUnselectAll("users");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const usersToSend: { userId: any; chatId: any }[] = [];

  data.forEach((user) => {
    if (selectedIds.includes(user.id)) {
      usersToSend.push({ userId: user.id, chatId: user.telegram });
    }
  });

  const sendMessage = async () => {
    if (!message) return;

    dataProvider
      .sendMessage("send-message", {
        message,
        data: usersToSend,
      })
      .then((response) => {
        if (response.status) {
          notify(response.status);
        }
        if (response.ok) {
          unselectAll();
        } else {
          const toUnselect = response.result
            .filter((r) => r.delivered)
            .map((r) => r.id);
          unselect(toUnselect);
        }
      });

    handleClose();
    refresh();
  };

  return (
    <>
      <Button label="Send to all" onClick={handleClickOpen}>
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
