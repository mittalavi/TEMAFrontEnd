import React, { useEffect } from "react";
import { Routes, Route,Navigate} from "react-router-dom";
import Login from "../Page/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import Error404 from "../Error404";
import UserForm from "../UserForm";
import Dashboard from "../Page/Dashboard";
import AdminRoute from "./AdminRoute";
import UserManagementPage from "../Page/UserManagementPage";
import AllGroupsOfAUserList from "../AllGroupsOfAUserList";
import AllUsersOfAGroupList from "../AllUsersOfAGroupList";
import UserGroupForm from "../UserGroupForm";
import NotFound from "../NotFound";
import UserDetails from "../UserDetails";
import ExceptionHandling from "../ExceptionHandling";
import FourEyeCheckUp from "../FourEyeCheckUp";
import AdminExceptionList from "../AdminExceptionList";
import AddUserToAGroup from "../AddUserToAGroup";
import UserDashboard from "../Page/UserDashboard";
import AdminDashboard from "../Page/AdminDashboard";
import ExceptionDetailsContainer from "../ExceptionDetailsContainer";
import { useSelector } from "react-redux/es/hooks/useSelector";
import ReportPage from "../Page/ReportPage";

const AllRoutes = () => {
  const roleArr = useSelector((state) => state.auth.userInfo.roles); // to be decided by api response
  const role = roleArr?.find((role) => role === "ROLE_ADMIN");

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute />}>
        <Route path="" element={<Dashboard />}>
          <Route index element={
                  role === "ROLE_ADMIN" ? (
                    <AdminDashboard />
                  ) : (
                    <UserDashboard />
                  )
                } />
          <Route path=":username" element={<UserDetails />} />
          <Route path="user-management" element={<AdminRoute />}>
            <Route index element={<UserManagementPage />} />
            <Route
              path="usergroups/:username"
              element={<AllGroupsOfAUserList />}
            ></Route>
            <Route path="users/:groupId">
              <Route index element={<AllUsersOfAGroupList />} />
              <Route path="add-user" element={<AddUserToAGroup />} />
            </Route>
            <Route path="add-user" element={<UserForm />} />
            <Route
              path="update-user/:username"
              element={<UserForm isUpdate={true} />}
            />
            <Route
              path="update-user/:username"
              element={<UserForm isUpdate={true} />}
            />
            <Route path="add-user-group" element={<UserGroupForm />} />
            <Route
              path="update-user-group/:groupId"
              element={<UserGroupForm isUpdate={true} />}
            />
            <Route path="*" element={<NotFound />}></Route>
          </Route>
          <Route path="/dashboard/exception-management" element={<Navigate to="exception-handling" />}/>
          <Route path="exception-management">
            <Route path="exception-handling">
              <Route
                index
                element={
                  role === "ROLE_ADMIN" ? (
                    <AdminExceptionList />
                  ) : (
                    <ExceptionHandling />
                  )
                }
              />
             
              <Route path=":id" element={<ExceptionDetailsContainer />} />
            </Route>
            <Route path="4-eye-checkup">
              <Route index element={<FourEyeCheckUp />} />
              <Route path=":id" element={<ExceptionDetailsContainer />} />
            </Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route>
          <Route path="reports" element={<ReportPage/>}></Route>
        </Route>
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default AllRoutes;
