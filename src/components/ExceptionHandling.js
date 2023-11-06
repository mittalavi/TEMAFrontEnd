import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import TableComponent from "./TableComponent";
import Filter from "./FilterCompoenent";
import { useSelector } from "react-redux";

const BaseUrl = process.env.REACT_APP_BASE_URL + "api/";

function ExceptionHandling() {
  const groupsArr = useSelector((state) => state.group.userGroups);

  const isCurrentLoggedInUserPartOfEscalationGroup =
    groupsArr.includes("EscalationGroup");
  const [data1, setdata1] = useState([]);
  const [data2, setdata2] = useState([]);

  const [filteredData1, setFilteredData1] = useState([]);
  const [filteredData2, setFilteredData2] = useState([]);

  const [selectedFilters, setSelectedFilters] = useState({
    status: "All",
    priority: "All",
    createdAt: null,
  });

  const roleArr = useSelector((state) => state.auth.userInfo.roles);
  const role = roleArr.find((role) => role === "ROLE_ADMIN");

  const username = useSelector((state) => state.auth.userInfo.username);

  const [refresh, setRefresh] = useState(false);

  let populateAssigned = () => {
    axios.get(BaseUrl + "getUserAssignedExceptions/" + username).then(
      (response) => {
        if (response.data) {
          setdata1(response.data);
          setFilteredData1(response.data);
        } else {
          setdata1([]);
          setFilteredData1([]);
        }
      },
      (error) => {
        //console.log(error);
      }
    );
  };

  let populateUnclaimed = () => {
    axios.get(BaseUrl + "getUnclaimedPerformTask/" + username).then(
      (response) => {
        if (response.data) {
          setdata2(response.data);
          setFilteredData2(response.data);
        } else {
          setdata2([]);
          setFilteredData2([]);
        }
      },
      (error) => {
        //console.log(error);
      }
    );
  };

  const updateData = useCallback(() => {
    populateAssigned();
    populateUnclaimed();
  }, []);

  useEffect(() => {
    populateAssigned();
    populateUnclaimed();
  }, [updateData]);

  const applyFilters = (filters) => {
    setSelectedFilters(filters);

    let applyFilterData1 = data1?.filter((exception) => {
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

    let applyFilterData2 = data2?.filter((exception) => {
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
      applyFilterData1.sort((a, b) => {
        return a.priority - b.priority;
      });

      applyFilterData2.sort((a, b) => {
        return a.priority - b.priority;
      });
    }

    setFilteredData1(applyFilterData1);
    setFilteredData2(applyFilterData2);
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
      <TableComponent
        data={filteredData1}
        updateData={updateData}
        username={username}
        role={role}
        onRefresh={handleRefreshIconFalse}
        refresh={refresh}
        isEscalatedGroupUser={isCurrentLoggedInUserPartOfEscalationGroup}
        listNumber={2}
      />
      <TableComponent
        data={filteredData2}
        updateData={updateData}
        username={username}
        role={role}
        onRefresh={handleRefreshIconFalse}
        refresh={refresh}
        isEscalatedGroupUser={isCurrentLoggedInUserPartOfEscalationGroup}
        listNumber={3}
      />
    </div>
  );
}

export default ExceptionHandling;
