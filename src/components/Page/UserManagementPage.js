import React, { useEffect } from "react";
import AllUsersList from "../AllUsersList";
import AllUserGroupsList from "../AllUserGroupsList";
import AddButton from "../AddButton";
import { useDispatch } from "react-redux";
import { searchAction } from "../store/features/search/searchSlice";


const UserManagementPage = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
     return () => {
      dispatch(searchAction.reset())
    }
  },[dispatch])

  return (
    <div>
      <AddButton />
      <AllUsersList />
      <br />
      <AllUserGroupsList />
    </div>
  );
};

export default UserManagementPage;
