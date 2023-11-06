import { useEffect, React} from "react";
import {
  CssBaseline,
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { userGroupActions } from "./store/features/userGroup/userGroupSlice";
import {
  registerUserGroup,
  getUserGroup,
  updateUserGroup,
} from "./store/features/userGroup/userGroupSlice";
import { grey } from "@mui/material/colors";

export default function UserGroupForm({ isUpdate }) {
  const validationString = {
    groupName: {
      required: "Group name is required",
      minLength: "Group name should be atleast 3 letters long",
    },
    groupId: {
      required: "group id name is required",
      minLength: "group id should be atleast 3 letters long",
      pattern: "group id should contain only alphanumeric characters"
    },
    description: {
      required: "description is required",
      minLength: "description should be atleast 10 letters long",
    },
  };

  const readOnlyColor = grey[200];

  const payload = useSelector((state) => state.group.payload);
  const message = useSelector((state) => state.group.message);
  const isError = useSelector((state) => state.group.isError);
  const isLoading = useSelector((state) => state.group.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const { control, handleSubmit, reset } = useForm({
    reValidateMode: "onBlur",
    defaultValues: {
      groupId: "",
      groupName: "",
      description: "",
    },
  });

  // displaying messages sent by backend
  useEffect(() => {
    if (!isLoading) {
      if (message) {
        toast(message, {
          type: isError ? "error" : "success",
        });
        if (!isError) {
          navigate(-1);
        }
        dispatch(userGroupActions.messageReset());
      }
    }
  }, [message, isError, dispatch, isLoading, navigate]);

  // fetching usergroup details when update form component is rendered
  useEffect(() => {
    if (isUpdate) {
      dispatch(getUserGroup(param.groupId));
    }
  }, [isUpdate, param.groupId, dispatch]);

  // setting usergroup details in the form
  useEffect(() => {
    if (isUpdate) {
      if (Object.keys(payload).length !== 0) {
        reset(payload);
        dispatch(userGroupActions.payloadReset());
      }
    }
  }, [payload, reset, dispatch,isUpdate]);

  const handleOnSubmit = (data) => {
    const userGroupData = {
      groupId: data.groupId,
      groupName: data.groupName,
      description: data.description,
    };
    if (!isUpdate) {
      dispatch(registerUserGroup(userGroupData));
    } else {
      dispatch(updateUserGroup(userGroupData));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {isUpdate ? "Update User Group" : "Create User Group"}
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(handleOnSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="groupId"
                rules={{
                  required: true,
                  minLength: 3,
                  pattern: /^[a-zA-Z0-9]{3,}$/,
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    autoFocus
                    fullWidth
                    InputProps={{
                      readOnly: isUpdate ? true : false,
                    }}
                    sx={{
                      backgroundColor: isUpdate ? readOnlyColor : "",
                    }}
                    id="groupId"
                    label="Group ID"
                    error={error !== undefined}
                    helperText={
                      error ? validationString.groupId[error.type] : ""
                    }
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                control={control}
                name="groupName"
                rules={{
                  required: true,
                  minLength: 3,
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    id="groupName"
                    label="Group name"
                    error={error !== undefined}
                    helperText={
                      error ? validationString.groupName[error.type] : ""
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="description"
                rules={{
                  required: true,
                  minLength: 10,
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    rows={3}
                    id="description"
                    multiline
                    label="Description"
                    error={error !== undefined}
                    helperText={
                      error ? validationString.description[error.type] : ""
                    }
                  />
                )}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isUpdate ? "Update User Group" : "Create User Group"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
