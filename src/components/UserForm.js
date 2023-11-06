import { useState, useEffect, React } from "react";
import {
  CssBaseline,
  MenuItem,
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Container,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { userActions } from "./store/features/user/userSlice";
import {
  registerUser,
  updateUser,
  getUser,
} from "./store/features/user/userSlice";
import axios from "axios";
import { grey } from "@mui/material/colors";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";

export default function UserForm({ isUpdate }) {
  const validationString = {
    firstName: {
      required: "First name is required",
      minLength: "First name should be atleast 3 letters long",
    },
    lastName: {
      required: "Last name is required",
      minLength: "Last name should be atleast 3 letters long",
    },
    email: {
      required: "Email is required",
      pattern: "Please enter a valid email",
    },
    username: {
      required: "Username is required",
      minLength: "Username should be atleast 6 letters long",
      pattern: "Username can only contain alphanumeric characters",
    },
    password: {
      required: "Password is required",
      minLength: "Password should be atleast 8 letters long",
      pattern:
        "Pasword should contain atleast 1 Uppercase, 1 Lowercase, and a digit",
    },
    secondpassword: {
      required: "Re-eneter the password",
      validate: "Passwords should match",
    },
    userRole: {
      required: "User role is required",
    },
    userGroups: {
      required: "User group is required",
    },
  };

  const userRole = [
    { value: "ROLE_USER", name: "User" },
    { value: "ROLE_ADMIN", name: "Admin" },
  ];

  const readOnlyColor = grey[200];

  const payload = useSelector((state) => state.auth.payload);
  const message = useSelector((state) => state.auth.message);
  const isError = useSelector((state) => state.auth.isError);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const accessToken = useSelector((state) => state.auth.userInfo.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userGroups, setUserGroups] = useState([]);
  const param = useParams();
  const { control, getValues, handleSubmit, reset, watch } = useForm({
    reValidateMode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      userGroupsId: "",
      userRole: "",
    },
  });
  const watchFields = watch();

  // useEffect(() => {
  //   //console.log(watchFields.userRole);
  // }, [watchFields]);

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
        dispatch(userActions.messageReset());
      }
    }
  }, [message, isError, dispatch, isLoading, navigate]);

  // fetching all groups present in a database
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}usergroups/allgroupnames`, {
        "Access-Control-Allow-Origin": true,
        Authorization: "Bearer " + accessToken,
      })
      .then(
        (response) => {
          setUserGroups(response.data.data);
        },
        (e) => e.data
      );
  }, [accessToken]);

  // fetching user details when update form component is rendered
  useEffect(() => {
    // dispatch()
    if (isUpdate) {
      dispatch(getUser(param.username));
    }
  }, [isUpdate, param.username, dispatch]);

  // setting user details in the form
  useEffect(() => {
    if (isUpdate) {
      if (Object.keys(payload).length !== 0) {
        reset(payload);
        dispatch(userActions.payloadReset());
      }
    }
  }, [payload, reset, dispatch, isUpdate]);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleOnSubmit = (data) => {
    if (!isUpdate) {
      const newUserData = {
        username: data.username,
        password: data.password,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        userGroupsId: data.userGroups,
        role: data.userRole,
      };
      dispatch(registerUser(newUserData));
    } else {
      const updatedUserData = {
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        userGroupsId: data.userGroups,
      };
      dispatch(updateUser(updatedUserData));
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
          {isUpdate ? "Update User" : "Create User"}
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(handleOnSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="firstName"
                rules={{
                  required: true,
                  minLength: 3,
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    autoComplete="given-name"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    error={error !== undefined}
                    helperText={
                      error ? validationString.firstName[error.type] : ""
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="lastName"
                rules={{
                  required: true,
                  minLength: 3,
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    autoComplete="family-name"
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    error={error !== undefined}
                    helperText={
                      error ? validationString.lastName[error.type] : ""
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    error={error !== undefined}
                    helperText={error ? validationString.email[error.type] : ""}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="username"
                rules={{
                  required: true,
                  minLength: 6,
                  pattern: /^[a-zA-Z0-9]{6,}$/,
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    InputProps={{
                      readOnly: isUpdate ? true : false,
                    }}
                    sx={{
                      backgroundColor: isUpdate ? readOnlyColor : "",
                    }}
                    fullWidth
                    id="username"
                    label="Username"
                    error={error !== undefined}
                    helperText={
                      error ? validationString.username[error.type] : ""
                    }
                  />
                )}
              />
            </Grid>
            {!isUpdate && (
              <>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="password"
                    rules={{
                      required: true,
                      minLength: 8,
                      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                sx={{pr:1}}
                              >
                                {showPassword ? (
                                  <VisibilityOffOutlined sx={{color:'gray'}}/>
                                ) : (
                                  <VisibilityOutlined sx={{color:'gray'}}/>
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        fullWidth
                        label="Password"
                        type={showPassword?"text":"password"}
                        id="password"
                        autoComplete="new-password"
                        error={error !== undefined}
                        helperText={
                          error ? validationString.password[error.type] : ""
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="secondpassword"
                    rules={{
                      required: true,
                      validate: (pass) => {
                        const { password } = getValues();
                        return password === pass || "Passwords should match!";
                      },
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Re-enter Password"
                        type="password"
                        id="second-password"
                        autoComplete="new-password"
                        error={error !== undefined}
                        helperText={
                          error
                            ? validationString.secondpassword[error.type]
                            : ""
                        }
                      />
                    )}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <Controller
                control={control}
                name="userRole"
                rules={{
                  required: true,
                }}
                render={({ field, fieldState }) => {
                  return (
                    <TextField
                      {...field}
                      sx={{
                        textAlign: "left",
                        background: isUpdate ? readOnlyColor : "",
                      }}
                      InputProps={{
                        readOnly: isUpdate ? true : false,
                      }}
                      fullWidth
                      label="User Role"
                      id="userRole"
                      SelectProps={{
                        value: field.value ? field.value : "",
                        onChange: field.onChange,
                      }}
                      select // tell TextField to render select
                      error={fieldState.error !== undefined}
                      helperText={
                        fieldState.error
                          ? validationString.userRole[fieldState.error.type]
                          : ""
                      }
                    >
                      {userRole.map((userRole, index) => (
                        <MenuItem value={userRole.value} key={index}>
                          {userRole.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  );
                }}
              />
            </Grid>
            {watchFields.userRole === "ROLE_USER" ? (
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="userGroups"
                  rules={{
                    required: isUpdate ? false : true,
                  }}
                  render={({ field, fieldState }) => {
                    return (
                      <TextField
                        {...field}
                        sx={{
                          textAlign: "left",
                          background: isUpdate ? readOnlyColor : "",
                        }}
                        InputProps={{
                          readOnly: isUpdate ? true : false,
                        }}
                        fullWidth
                        label="User Group"
                        id="userGroups"
                        select // tell TextField to render select
                        SelectProps={{
                          multiple: true,
                          value: field.value ? field.value : [],
                          onChange: field.onChange,
                        }}
                        error={fieldState.error !== undefined}
                        helperText={
                          fieldState.error
                            ? validationString.userGroups[fieldState.error.type]
                            : ""
                        }
                      >
                        {userGroups.map((userGroup, index) => (
                          <MenuItem value={userGroup.groupId} key={index}>
                            {userGroup.groupName}
                          </MenuItem>
                        ))}
                      </TextField>
                    );
                  }}
                />
              </Grid>
            ) : (
              <></>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isUpdate ? "Update User" : "Create User"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
