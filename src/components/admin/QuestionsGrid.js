import React, { useState, useEffect, Fragment } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { arrayNotNull } from "../common/CommonFunctions";

function QuestionsGrid({ questions }) {
  const [columnDefs, setColumDefs] = useState([]);
  const [rowData] = useState(questions);

  console.log(questions);

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

  useEffect(() => {
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
        headerName: "Question",
        field: "questionName",
        sortable: true,
        filter: true,
        width: 100,
      },
    ];
    setColumDefs(columns);
  }, []);

  return (
    <Fragment>
      {arrayNotNull(questions) && questions.length > 0 && (
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          pagination={true}
          gridOptions={gridOptions}
        ></AgGridReact>
      )}
    </Fragment>
  );
}

//export default React.memo(QuestionsGrid);
export const MemoizedQuestionsGridView = React.memo(QuestionsGrid);
