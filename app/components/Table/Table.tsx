"use client";
import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
type Props = {
  rowData: Array<{}>;
  colDefs: Array<{}>;
};

const Table = (props: Props) => {
  return (
    <div className="px-3  ">
      <div className="ag-theme-quartz " style={{ height: "65vh" }}>
        <AgGridReact
          rowData={props.rowData}
          pagination={true}
          columnDefs={props.colDefs}
        />
      </div>
    </div>
  );
};

export default Table;
