import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import TableComponent from "./TableComponent";
import Filter from "./FilterCompoenent";
import { useSelector } from "react-redux";

const BaseUrl = process.env.REACT_APP_BASE_URL + "api/";

function AdminExceptionList() {
  const [exceptions, setExceptions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [selectedFilters, setSelectedFilters] = useState({
    status: "All",
    priority: "All",
    createdAt: null,
  });

  const roleArr = useSelector((state) => state.auth.userInfo.roles);
  const role = roleArr.find((role) => role === "ROLE_ADMIN");
  const username = useSelector((state) => state.auth.userInfo.username);

  const [refresh, setRefresh] = useState(false);

  let populateExceptions = () => {                   
     
    axios.get(BaseUrl + 'getAllExceptions').then(
      (response) => { 
        if(response.data){
         setExceptions(response.data);
         setFilteredData(response.data); 
      }
      else{
        setExceptions([]);
        setFilteredData([]);
      }
    },   
      (error) => {  
        //console.log(error);  
      }  
    );
  };

  const updateData = useCallback(() => {
    populateExceptions();
  }, []);

  useEffect(() => {
    populateExceptions();
  }, [updateData]);

  const applyFilters = (filters) => {
    setSelectedFilters(filters);

    let applyFilterData = exceptions?.filter((exception) => {
      return (
        (filters.status === "All" ||
          filters.status === "Status" ||
          exception.status === filters.status) &&
        (filters.priority === "All" ||
          filters.priority === "Priority" ||
          filters.priority === "Sort" ||
          exception.priority === filters.priority) &&
        (filters.createdAt === null ||
          exception.createdAt.includes(filters.createdAt))
      );
    });

    if (filters.priority === "Sort") {
      applyFilterData.sort((a, b) => {
        return a.priority - b.priority;
      });
    }
    setFilteredData(applyFilterData);
  };

  const handleRefreshIconTrue = () => {
    setRefresh(true);
  };

  const handleRefreshIconFalse = () => {
    setRefresh(false);
  };

  return (
    <div>
      <Filter onSelectFilter={applyFilters} onRefresh={handleRefreshIconTrue} />
      <TableComponent data={filteredData} updateData={updateData} username={username} role={role} onRefresh={handleRefreshIconFalse} refresh={refresh} listNumber={1}
      />
    </div>
  );
}

export default AdminExceptionList;
