import { useState } from "react";
import { TextField } from "@mui/material";
import {
  useRecordContext,
  useRefresh,
  useNotify,
  useDataProvider,
  Button,
} from "react-admin";
import { CustomDataProvider } from "../dataProvider";

export default function SendMessage() {
  const dataProvider = useDataProvider() as CustomDataProvider;
  const [message, setMessage] = useState("");
  const record = useRecordContext();
  const refresh = useRefresh();
  const notify = useNotify();

  const sendMessage = async () => {
    if (!message) return;

    dataProvider
      .sendMessage("send-message", {
        message,
        data: [{ userId: record["id"].toString(), chatId: record["telegram"] }],
      })
      .then((res) => {
        if (res.status) {
          notify(res.status);
          if (res.ok) {
            setMessage("");
            refresh();
          }
        }
      });
  };

  return (
    <>
      <TextField
        id="outlined-password-input"
        label="Write Message"
        value={message}
        placeholder="Message"
        fullWidth
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button label="Send Message" variant="contained" onClick={sendMessage} />
    </>
  );
}
