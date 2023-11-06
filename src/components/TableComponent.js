import React, { useEffect, useState } from "react";
import ExceptionId from "./ExceptionHeader/ExceptionId"
import {
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Button,
  Paper,
  styled,
  Input,
  Box,
  useTheme,
} from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

import { toast } from "react-toastify";

import axios from "axios";
import Status from "./ExceptionHeader/Status";
import Pagination from "./Pagination";
import Claim from "./ExceptionHeader/Claim";
import Complete from "./ExceptionHeader/Complete";
import ResolveEscalateButton from "./ExceptionHeader/ResolveEscalate";
import UserId from "./ExceptionHeader/UserId";

const BaseUrl = process.env.REACT_APP_BASE_URL+"api/";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "black",
  color: "white",
  borderBottom: `1px solid ${theme.palette.divider}`,
  fontWeight: "bold",
  position: "sticky",
  top: 0,
  zIndex: 1,
}));

const Card = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(2),
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
}));

const SearchBar = styled(Input)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(2),
}));


const TableComponent = ({ data, updateData, username , role , onRefresh, refresh, listNumber, isEscalatedGroupUser}) => {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExceptionId, setSelectedExceptionId] = useState(null);
  const [assigning, setAssigning] = useState(false);
  const [showAssignedPopup, setShowAssignedPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    if (showAssignedPopup) {
      toast("Already assigned!", {
        autoClose: 2000,
      });
    }
  }, [showAssignedPopup]);

  useEffect(() => {
    setAssigning(false);
    setSearchTerm();
    onRefresh();
  }, [refresh, onRefresh]);

  useEffect(() => {
    axios
    .get(BaseUrl + "getUserGroups")
    .then((response) => {
      //console.log(response.data)
      setUserGroups(response.data);
    })
    .catch((error) => {
      console.error("Assignment failed", error);
    });
  },[]);

  if (data.length === 0) {
    return null;
  }


  const handleChangePage = (event , newPage) => {
    setCurrentPage(newPage);
  };
 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleAssignedClick = () => {
    setAssigning(false);
    setShowAssignedPopup(true);
    setSearchTerm();
    setTimeout(() => {
      setShowAssignedPopup(false);
    }, 2000);
  };

  const handleAssignClick = (exceptionId) => {
    setSelectedExceptionId(exceptionId);
    setAssigning(true);
    setShowAssignedPopup(false);
  };

  const handleAssign = (userGroupID) => {
    //console.log(
    //   `Assigned exception ${selectedExceptionId} to User Group with ID: ${userGroupID}`
    // );

    setAssigning(false);
    setSearchTerm();

    const dataToSend = {
      exceptionId: selectedExceptionId,
      groupId: userGroupID,
    };

    axios
      .post(BaseUrl + "assignException", dataToSend , 
      { 
        "Access-Control-Allow-Origin": true,
        "Content-Type": "application/json",   
      })
      .then((response) => {
        //console.log("Assignment successful", response.data); 
        updateData();

        
      })
      .catch((error) => {
        console.error("Assignment failed", error);
      });

  }; 
  
  const handleSearchClear = () => {
    setSearchTerm();
    setAssigning(false);
    updateData();
  };
  const headermap = new Map();
    
  headermap.set('source platform trade id','tradeId');
  headermap.set('error code', 'exceptionType');
  headermap.set('error message', 'exceptionType');
  headermap.set('created at', 'createdAt');
  headermap.set('priority', 'priority');
  
  let headers = ["exception id","source platform trade id","error code","error message","status","priority","created at","assign"];
  const columnsToExclude = ["counterParty", "description", "updatedBy", "updatedAt", "createdBy" ,"resolutionSteps", "tradeDate" , "processId", "resolutionCount" ];
  headers = headers.filter((header) => !columnsToExclude.includes(header));
  
 
  let title;
  if(listNumber === 1){
    headers.splice(2, 0, "user id");
  }
  else if(listNumber === 2){
    headers.push("Resolve");
    headers = headers.filter(header => header !== "assign");
    title= "Assigned Exceptions";
  }

  else if(listNumber === 3){
    headers.push("Unclaimed");
    headers = headers?.filter((header) => header !== "assign");
    title = "Unclaimed Exceptions";
  } else if (listNumber === 4) {
    headers.push("Unclaimed");
    headers = headers.filter(header => header !== "assign");
    title= "Unclaimed Four Eye Check Up Exceptions";
  } 

  else if(listNumber === 5){
    headers.push("Complete" );
    headers = headers.filter(header => header !== "assign");
    title= "Assigned Four Eye Check Up Exceptions";
  }


  return (
    <div>
      <Card>
        {assigning && (
          <div style={{ marginTop: "7px" }}>
            <Box mb={2}>
              <b>Select a User Group to assign the exception:</b>
            </Box>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "600px",
                margin: "0 auto",
              }}
            >
              <SearchBar
                placeholder="Search for users"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <IconButton onClick={handleSearchClear} size="small">
                <ClearIcon />
              </IconButton>
            </div>
          </div>
        )}

        <div>
          {searchTerm && (
            <ul style={{ listStyleType: "none" , display:'flex',flexWrap:'wrap'}}>
              {userGroups
                ?.filter((userGroup) => userGroup.includes(searchTerm))
                ?.map((userGroup) => (
                  <div style={{ display: "inline", margin:'0 1rem'}}>
                    <li key={userGroup}>
                      <Button
                        variant="outlined"
                        onClick={() => handleAssign(userGroup)}
                      >
                        {userGroup}
                      </Button>
                    </li>
                  </div>
                ))}
            </ul>
          )}
        </div>
      </Card>

      <div style={{ fontWeight: "bold", height: "50px", textAlign: " center" }}>
        {title}
      </div>

      <Card>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((header) => {
                  if (role === "ROLE_CUSTOMER" && header === "assign") {
                      return null;
                  }
                    
                    else{
                      return(
                        <StyledTableCell key={header}>
                          {header.toUpperCase()}
                        </StyledTableCell>
                      );
                    }})}
              </TableRow>
            </TableHead>

            <TableBody>
              {data.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                  <TableRow key={index}>
                    
                    {headers.map((header) => { 
                      if (header === "exception id") { 
                        return (
                          <ExceptionId row={row}  />
                        );
                      }

                      if (header === "status") {
                        return ( 
                          <Status row={row}/>
                        );
                      } else if (header === "assign") {
                        if (role === "ROLE_CUSTOMER") {
                          return null;
                        } else {
                          return (
                            <TableCell key={header}>
                              {row[header] === "Assigned" ? (
                                <React.Fragment>
                                  <Button
                                    variant="contained"

                                    sx= { { color: 'white' }}
                                    startIcon={<CheckIcon />}
                                    onClick={handleAssignedClick}
                                  >
                                    Assigned
                                  </Button>
                                </React.Fragment>
                              ) : (
                                <Button
                                  variant="contained"
                                  // color={theme.palette.secondary.main}
                                  sx= { { color: 'white'}}
                                  startIcon={<SendIcon />}
                                  onClick={() =>
                                    handleAssignClick(row.exceptionId)
                                  }
                                >
                                  Assign
                                </Button>
                              )}
                            </TableCell>
                          );
                        }
                      } else if (header === "Resolve") {
                        if (role === "ROLE_ADMIN") {
                          return null;
                        }
                        else{
                        return (
                          <ResolveEscalateButton row={row} updateData={updateData} />

                        );
                        }
                      }

                      else  if (header === "Unclaimed") {
                        return (
                          <Claim exceptionID={row.exceptionId} username={username} updateData={updateData} listNumber={listNumber} isEscalatedGroupUser={isEscalatedGroupUser} resolutionCount={row.resolutionCount}/>
                        );
                      } else if (header === "Complete") {
                        return (
                          <Complete row={row} updateData={updateData} />
                        ); 
                      }

                      else  if (header === "user id") {
                        return (
                          <UserId exceptionID={row.exceptionId}  />
                        ); 
                      }

                   
                      return <TableCell key={header}>{row[headermap.get(header)]}</TableCell>;
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Pagination page={currentPage} rowsPerPage={rowsPerPage} totalItems={data.length} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage}/> 
       
      </Card>
    </div>
  );
};

export default TableComponent;
