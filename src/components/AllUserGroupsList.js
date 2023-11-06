import { useDispatch } from "react-redux";
import GenerateTable from "./GenerateTable";
import { deleteUserGroup } from "./store/features/userGroup/userGroupSlice";

const AllUserGroupsList = () => {
  const dispatch = useDispatch();

  const tableHeaders = [
    { label: "Group ID", key: "groupId", link: true },
    { label: "Group Name", key: "groupName" },
    { label: "Group Description", key: "description" },
  ];

  const mapDataToRow = (usergroup, key) => {
    return usergroup[key];
  };

  const deleteAction = (userGroupToDelete) => {
    dispatch(deleteUserGroup(userGroupToDelete));
  };

  const updatePath = "update-user-group";

  const linkPath = "users";

  const tableTitle = "All User Groups List";

  return (
    <GenerateTable
      endpoint="usergroups/allgroups"
      tableHeaders={tableHeaders}
      mapDataToRow={mapDataToRow}
      deleteAction={deleteAction}
      updatePath={updatePath}
      linkPath={linkPath}
      tableTitle={tableTitle}
      searchEndPoint="usergroups"
    />
  );
};

export default AllUserGroupsList;

// to={`/dashboard/user-management/users/${usergroup.groupId}`}
