import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import TableComponent from "./TableComponent";
import Filter from "./FilterCompoenent";
import { useSelector } from "react-redux";

const BaseUrl = process.env.REACT_APP_BASE_URL + "api/";

function FourEyeCheckUp() {
  const groupsArr = useSelector((state) => state.group.userGroups);
  const isCurrentLoggedInUserPartOfEscalationGroup =
    groupsArr.includes("EscalationGroup");

  const [data2, setdata2] = useState([]);
  const [data3, setdata3] = useState([]);

  const [filteredData2, setFilteredData2] = useState([]);
  const [filteredData3, setFilteredData3] = useState([]);

  const [selectedFilters, setSelectedFilters] = useState({
    status: "All",
    priority: "All",
    createdAt: null,
  });

  const roleArr = useSelector((state) => state.auth.userInfo.roles);
  const role = roleArr.find((role) => role === "ROLE_ADMIN");
  const username = useSelector((state) => state.auth.userInfo.username);

  const [refresh, setRefresh] = useState(false);

  let populateUnclaimed = () => {
    axios.get(BaseUrl + "getUnclaimedFourEye/" + username).then(
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

  let populateFourEyeCheckup = () => {
    axios
      .get(BaseUrl + "getUserAssignedFourEyeCheckUpExceptions/" + username)
      .then(
        (response) => {
          if (response.data) {
            setdata3(response.data);
            setFilteredData3(response.data);
          } else {
            setdata3([]);
            setFilteredData3([]);
          }
        },
        (error) => {
          //console.log(error);
        }
      );
  };

  const updateData = useCallback(() => {
    populateUnclaimed();
    populateFourEyeCheckup();
  }, []);

  useEffect(() => {
    populateUnclaimed();
    populateFourEyeCheckup();
  }, [updateData]);

  const applyFilters = (filters) => {
    setSelectedFilters(filters);

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

    let applyFilterData3 = data3?.filter((exception) => {
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
      applyFilterData2.sort((a, b) => {
        return a.priority - b.priority;
      });

      applyFilterData3.sort((a, b) => {
        return a.priority - b.priority;
      });
    }

    setFilteredData2(applyFilterData2);
    setFilteredData3(applyFilterData3);
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
        data={filteredData2}
        updateData={updateData}
        username={username}
        role={role}
        onRefresh={handleRefreshIconFalse}
        refresh={refresh}
        isEscalatedGroupUser={isCurrentLoggedInUserPartOfEscalationGroup}
        listNumber={4}
      />
      <TableComponent
        data={filteredData3}
        updateData={updateData}
        username={username}
        role={role}
        onRefresh={handleRefreshIconFalse}
        refresh={refresh}
        isEscalatedGroupUser={isCurrentLoggedInUserPartOfEscalationGroup}
        listNumber={5}
      />
    </div>
  );
}

export default FourEyeCheckUp;
