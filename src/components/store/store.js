import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import groupReducer from "./features/userGroup/userGroupSlice";
import searchReducer from "./features/search/searchSlice";

const reducer = {
  auth: userReducer,
  search: searchReducer,
  group: groupReducer,
};

export default configureStore({
  reducer: reducer,
});
