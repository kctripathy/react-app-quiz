import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import LayoutAdmin from "../pages/LayoutAdmin";
import LayoutSuperAdmin from "../pages/LayoutSuperAdmin";
import { fetchUsers } from "../../constants/actionMethods";
//import "./User.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { Role, getRoleDescription } from "../../constants";
import { isAuthenticated } from "../auth";
//import UserRow from "./UserRow";
//import UserRowHeader from "./UserRowHeader";

function UserList({ usersData, fetchUsers }) {
  const [columnDefs, setColumDefs] = useState([]);

  useEffect(() => {
    fetchUsers();

    const columns = [
      {
        headerName: "#",
        field: "",
        sortable: true,
        filter: true,
        width: 50,
        checkboxSelection: true,
        pinned: "left",
      },
      {
        headerName: "Name",
        field: "fullname",
        sortable: true,
        filter: true,
        width: 100,
      },
      {
        headerName: "Name",
        field: "accessLevel",
        sortable: true,
        filter: true,
        width: 100,
        cellRenderer: function (params) {
          return ` ${getRoleDescription(params.value)}`;
        },
      },
      {
        headerName: "Class",
        field: "className",
        sortable: true,
        filter: true,
        width: 100,
      },
      {
        headerName: "Email",
        field: "userEmail",
        sortable: true,
        filter: true,
        width: 130,
      },
      {
        headerName: "Phone",
        field: "userPhone",
        sortable: true,
        filter: true,
        width: 130,
      },
      {
        headerName: "Edit",
        field: "",
        sortable: false,
        filter: false,
        width: 80,
        cellRenderer: function (params) {
          return `<a href='/user/edit/${params.data.id}'> <i class="fa fa-edit mr-1"></i>edit</a>`;
        },
        // onCellClicked: function (params) {
        //   editUser(params.data);
        // },
      },
    ];

    setColumDefs(columns);
  }, []);

  const editUser = (user) => {
    console.log("edit user", user);
  };

  const [gridOptions] = useState({
    suppressHorizontalScroll: true,
    suppressVertialScroll: true,
    scrollbarWidth: 0,
    paginationPageSize: 12,
    pagination: true,
    onGridReady: (params) => {
      params.api.sizeColumnsToFit();
    },
    rowSelection: "multiple",
    // ,isRowSelectable: function (rowNode) {
    //     return rowNode.data ? rowNode.data.Status === 'Pending' : false;
    // },
  });

  gridOptions.getRowStyle = function (params) {
    //console.log(params)
    //debugger;
    if (params.data.Status === "Pending") {
      return { background: "#ffff66", fontWeight: "bold" };
    } else if (params.data.Status === "Approved") {
      return { background: "#b3ff66", color: "#003300" };
    } else if (params.data.Status === "Rejected") {
      return {
        background: "#ffe6e6",
        color: "#ff0000",
      };
    }
  };

  const showUsersListOfAdmin = () => (
    <LayoutAdmin title="List of users">
      {/* {loadAllUsers()} */}
      {/* {JSON.stringify(usersData)} */}
      {usersData && usersData.users.length > 0 && (
        <div
          className="col-12 p-0 m-0 ag-theme-balham text-left"
          style={{
            height: "420px",
            width: "98%",
            marginLeft: "5px",
            overflow: "hidden",
          }}
        >
          <AgGridReact
            columnDefs={columnDefs}
            rowData={usersData.users}
            pagination={true}
            gridOptions={gridOptions}
          ></AgGridReact>
        </div>
      )}
    </LayoutAdmin>
  );

  const showUsersListOfSuperAdmin = () => (
    <LayoutSuperAdmin title="List of users">
      {/* {loadAllUsers()} */}
      {/* {JSON.stringify(usersData)} */}
      {usersData && usersData.users.length > 0 && (
        <div
          className="col-12 p-0 m-0 ag-theme-balham text-left"
          style={{
            height: "420px",
            width: "98%",
            marginLeft: "5px",
            overflow: "hidden",
          }}
        >
          <AgGridReact
            columnDefs={columnDefs}
            rowData={usersData.users}
            pagination={true}
            gridOptions={gridOptions}
          ></AgGridReact>
        </div>
      )}
    </LayoutSuperAdmin>
  );

  return isAuthenticated().accessLevel === Role.Admin
    ? showUsersListOfAdmin()
    : showUsersListOfSuperAdmin();
} //function UserList ==============================================================

const mapStateToProps = (state) => {
  return {
    usersData: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
