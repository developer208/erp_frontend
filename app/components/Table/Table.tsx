"use client";
import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
type Props = {
  rowData: Array<{}>;
  colDefs: Array<{}>;
};

const gridOptions = {
  // Other grid options
  overlayLoadingTemplate:
    '<span class="ag-overlay-loading-center">Loading...</span>',
  overlayNoRowsTemplate:
    '<span class="ag-overlay-no-rows-center">No data available</span>',
};

const Table = (props: Props) => {
  return (
    <div className="px-3  ">
      <div
        className="ag-theme-quartz "
        style={{ height: "65vh", scrollbarWidth: "-moz-initial" }}
      >
        <AgGridReact
          rowData={props.rowData}
          pagination={true}
          columnDefs={props.colDefs}
          loadingCellRenderer={
            '<span class="ag-overlay-loading-center">Loading...</span>'
          }
        />
      </div>
    </div>
  );
};

export default Table;
