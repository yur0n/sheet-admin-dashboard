import {
  Datagrid,
  List,
  ReferenceField,
  TextField,
  ReferenceManyCount,
	EditButton,
	Edit, SimpleForm, TextInput, BulkDeleteButton
} from "react-admin";
import SendMessageDialog from "./components/sendMessageDialog";
import BulkSendMessageButton from "./components/bulkSendMessageButton";


const UserListActionButtons = () => (
	<>
		<BulkSendMessageButton />
		<BulkDeleteButton />
	</>
);

export const UserList = () => (
  <List>
    <Datagrid bulkActionButtons={<UserListActionButtons />}>
			<ReferenceField
					source="id"
					reference="users"
					link="show"
					label="phone"
			>
      	<TextField source="phone" />
			</ReferenceField>
      <TextField source="telegram" />
      <TextField source="name" />
      <TextField source="username" label="username" />
      <ReferenceManyCount
        label="№ Messages"
        reference="messages"
        target="userId"
      />
    	<TextField source="note" />
			<SendMessageDialog />
			<EditButton />
    </Datagrid>
  </List>
);

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="phone" />
            <TextInput source="telegram" />
            <TextInput source="name" />
            <TextInput source="username" />
            <TextInput source="note" sx={{ width: '50%' }} />
        </SimpleForm>
    </Edit>
);