import {
  Admin,
  Resource,
} from "react-admin";
import { UserList, UserEdit } from "./users";
import UserShow from "./userShow";
import { MessageList } from "./messages";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";

export const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource
      name="users"
      list={UserList}
      show={UserShow}
      edit={UserEdit}
      recordRepresentation="name"
    />
    <Resource
      name="messages"
      list={MessageList}
      recordRepresentation="content"
    />
    {/* <Resource name="messages" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
    <Resource name="users" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} /> */}
  </Admin>
);
