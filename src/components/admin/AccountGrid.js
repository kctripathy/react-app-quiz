import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchAccounts } from "../../constants/actionMethodsAccounts";
import { Link } from "react-router-dom";
import LayoutSuperAdmin from "../pages/LayoutSuperAdmin";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

function AccountGrid({ accountsData, fetchAllAccounts }) {
  const [columnDefs, setColumDefs] = useState([]);

  useEffect(() => {
    fetchAllAccounts();

    const columns = [
      //   {
      //     headerName: "#",
      //     field: "",
      //     sortable: true,
      //     filter: true,
      //     width: 50,
      //     checkboxSelection: true,
      //     pinned: "left",
      //   },
      {
        headerName: "Account Name",
        field: "accountName",
        sortable: true,
        filter: true,
        width: 200,
      },
      {
        headerName: "Contact Name",
        field: "contactName",
        sortable: true,
        filter: true,
        width: 200,
      },
      {
        headerName: "Office",
        field: "officeName",
        sortable: true,
        filter: true,
        width: 200,
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
        field: "Phone",
        sortable: true,
        filter: true,
        width: 130,
      },
      {
        headerName: "Active",
        field: "isActive",
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
          return `<a href='/account/edit/${params.data.id}'> <i class="fa fa-edit mr-1"></i>edit</a>`;
        },
        // onCellClicked: function (params) {
        //   editUser(params.data);
        // },
      },
    ];

    setColumDefs(columns);
  }, []);

  //   const showListOfAccountHeader = () => {
  //     return (
  //       <tr className="bg-text-muted table-row-header">
  //         <td>Account Name</td>
  //         <td>Contact Name</td>
  //         <td>Office Name</td>
  //         <td>Phone Number</td>
  //         <td>Active?</td>
  //       </tr>
  //     );
  //   };

  //   const showListOfAccountRows = () => {
  //     return (
  //       accountsData &&
  //       accountsData.accounts.map((a) => {
  //         return (
  //           <tr key={a.id} className="quiz-row">
  //             <td>
  //               <Link to={`/account/edit/${a.id}`}>{a.accountName}</Link>
  //             </td>
  //             <td>{a.contactName}</td>
  //             <td>{a.officeName}</td>
  //             <td>{a.phone}</td>
  //             <td>{a.isActive ? "Yes" : "No"}</td>
  //           </tr>
  //         );
  //       })
  //     );
  //   };

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
  });

  return (
    <LayoutSuperAdmin title="List of Accounts">
      {accountsData && accountsData.accounts.length > 0 && (
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
            rowData={accountsData.accounts}
            pagination={true}
            gridOptions={gridOptions}
          ></AgGridReact>
        </div>
      )}
      {/* <table className="quiz-table">
        {showListOfAccountHeader()}
        {showListOfAccountRows()}
      </table>
      <div><pre>{JSON.stringify(accountsData, null, 4)}</pre></div> */}
    </LayoutSuperAdmin>
  );
}

const mapStateToProps = (state) => {
  return {
    accountsData: state.account,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllAccounts: () => dispatch(fetchAccounts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountGrid);
