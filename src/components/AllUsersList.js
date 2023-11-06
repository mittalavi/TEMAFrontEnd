import { useDispatch } from "react-redux";
import GenerateTable from "./GenerateTable";
import { deleteUser } from "./store/features/user/userSlice";

const AllUsersList = () => {
  const dispatch = useDispatch();

  const tableHeaders = [
    { label: "Username", key: "username", link: true },
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Role", key: "role" },
  ];

  const mapDataToRow = (user, key) => {
    return user[key];
  };

  const deleteAction = (userToDelete) => {
    dispatch(deleteUser(userToDelete));
  };

  const updatePath = "update-user";
  const linkPath = "usergroups"
  const tableTitle = "All Users List";

  return (
    <GenerateTable
      endpoint="users/allusers"
      tableHeaders={tableHeaders}
      mapDataToRow={mapDataToRow}
      deleteAction={deleteAction}
      updatePath={updatePath}
      linkPath={linkPath}
      tableTitle={tableTitle}
      searchEndPoint="users"
    />
  );
};

export default AllUsersList;

// to={`/dashboard/user-management/usergroups/${user.username}`}
