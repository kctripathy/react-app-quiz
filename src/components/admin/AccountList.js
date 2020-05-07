import React, { useEffect } from "react";
import { connect } from "react-redux";
import Layout from "../pages/Layout";
import { fetchAccounts } from "../../constants/actionMethodsAccounts";
import { Link } from "react-router-dom";
import LayoutSuperAdmin from "../pages/LayoutSuperAdmin";

function AccountList({ accountsData, fetchAllAccounts }) {
  useEffect(() => {
    fetchAllAccounts();
  }, []);

  const showListOfAccountHeader = () => {
    return (
      <tr className="bg-text-muted table-row-header">
        <td>Account Name</td>
        <td>Contact Name</td>
        <td>Office Name</td>
        <td>Phone Number</td>
        <td>Active?</td>
      </tr>
    );
  };

  const showListOfAccountRows = () => {
    return (
      accountsData &&
      accountsData.accounts.map((a) => {
        return (
          <tr key={a.id} className="quiz-row">
            <td>
              <Link to={`/account/edit/${a.id}`}>{a.accountName}</Link>
            </td>
            <td>{a.contactName}</td>
            <td>{a.officeName}</td>
            <td>{a.phone}</td>
            <td>{a.isActive ? "Yes" : "No"}</td>
          </tr>
        );
      })
    );
  };
  return (
    <LayoutSuperAdmin title="List of Accounts">
      <table className="quiz-table">
        {showListOfAccountHeader()}
        {showListOfAccountRows()}
      </table>
      <div>{/* <pre>{JSON.stringify(accountsData, null, 4)}</pre> */}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountList);
