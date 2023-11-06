import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userGroupService from "./userGroupService";

const initialState = {
  userGroups:[],
  isLoading: false,
  isError: null,
  isSuccess: false,
  message: "",
  payload: {},
};

export const registerUserGroup = createAsyncThunk(
  "usergroup/registerusergroup",
  async (usergroup, thunkAPI) => {
    try {
      const accessToken = thunkAPI.getState().auth.userInfo.accessToken;
      return await userGroupService.registerUserGroup(usergroup, accessToken);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUserGroup = createAsyncThunk(
  "usergroup/getUserGroup",
  async (user, thunkAPI) => {
    try {
      const accessToken = thunkAPI.getState().auth.userInfo.accessToken;
      return await userGroupService.getUserGroup(user, accessToken);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUserGroup = createAsyncThunk(
  "usergroup/updateUserGroup",
  async (user, thunkAPI) => {
    try {
      const accessToken = thunkAPI.getState().auth.userInfo.accessToken;
      return await userGroupService.updateUserGroup(user, accessToken);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteUserGroup = createAsyncThunk(
  "usergroup/deleteUserGroup",
  async (groupId, thunkAPI) => {
    try {
      const accessToken = thunkAPI.getState().auth.userInfo.accessToken;
      return await userGroupService.deleteUserGroup(groupId, accessToken);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addusersInTheGroup = createAsyncThunk(
  "usergroup/addusersInTheGroup",
  async ({groupId,username}, thunkAPI) => {
    try {
      const accessToken = thunkAPI.getState().auth.userInfo.accessToken;
      return await userGroupService.addusersInTheGroup(groupId,username, accessToken);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const unmapUserAndGroup = createAsyncThunk(
  "usergroup/unmapUserAndGroup",
  async ({username,groupId}, thunkAPI) => {
    try {
      const accessToken = thunkAPI.getState().auth.userInfo.accessToken;
      return await userGroupService.unmapUserAndGroup(username,groupId, accessToken);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllUserGroups = createAsyncThunk(
  "usergroup/getAllUserGroups",
  async (username, thunkAPI) => {
    try {
      const accessToken = thunkAPI.getState().auth.userInfo.accessToken;
      return await userGroupService.getAllUserGroups (username, accessToken);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


const userGroupSlice = createSlice({
  name: "group",
  initialState: initialState,
  reducers: {
    reset: (state) => ({
      ...initialState
    }),
    messageReset: (state) => ({
      ...state,
      message:""
    }),
    payloadReset: (state) => ({
      ...state,
      payloade:""
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserGroup.fulfilled, (state,action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(registerUserGroup.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(registerUserGroup.rejected, (state,action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUserGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.payload = action.payload;
      })
      .addCase(updateUserGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(updateUserGroup.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateUserGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteUserGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(deleteUserGroup.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteUserGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(unmapUserAndGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(unmapUserAndGroup.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(unmapUserAndGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addusersInTheGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(addusersInTheGroup.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(addusersInTheGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      }).addCase(getAllUserGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userGroups = action.payload.data;
      })
      .addCase(getAllUserGroups.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAllUserGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const userGroupActions = userGroupSlice.actions;
export default userGroupSlice.reducer;
