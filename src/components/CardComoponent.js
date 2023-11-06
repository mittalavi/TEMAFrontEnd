import {
  Card,
  CardContent,
  Stack,
  Typography,
  Avatar,
  SvgIcon,
} from "@mui/material";
import {
  ReportGmailerrorred as ReportGmailerrorredIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import axios from "axios";

const CardComponent = (props) => {
  const accessToken = useSelector((state) => state.auth.userInfo.accessToken);
  const {
    group,
    link,
    positive = false,
    sx,
    name,
    title,
    dataescalated,
  } = props;

  const [data, setResponse] = useState();

  useEffect(() => {
    console.log(name, title, dataescalated);
  }, [name, title, dataescalated]);

  useEffect(() => {
    if (group != null) {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}history/${link}/usergroup/${group.groupId}`,
          {
            "Access-Control-Allow-Origin": true,
            authorization: accessToken,
          }
        )
        .then((response) => setResponse(response.data))
        .catch((error) => {
          // console.error(error);
        });
    }
  }, [accessToken, link, group]);

  // useEffect(() => {
  //   //console.log(data);
  // }, [data]);

  return (
    (data != null || dataescalated) && (
      <Card sx={sx}>
        <CardContent>
          <Stack
            alignItems="flex-start"
            direction="row"
            justifyContent="space-between"
            spacing={3}
          >
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                {title !== "Escalated"
                  ? title + " for " + group?.groupName
                  : title + " for " + name}
              </Typography>
              <Typography variant="h4" sx={{ textAlign: "left" }}>
                {title !== "Escalated" ? data?.data : dataescalated}
              </Typography>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: "error.main",
                height: 56,
                width: 56,
              }}
            >
              <SvgIcon>
                <ReportGmailerrorredIcon />
              </SvgIcon>
            </Avatar>
          </Stack>
        </CardContent>
      </Card>
    )
  );
};

export default CardComponent;
