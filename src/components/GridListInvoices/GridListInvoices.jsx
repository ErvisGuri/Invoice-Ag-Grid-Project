import React, { useState, useCallback } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import DataFake from "../../DataFake";

const GridListInvoices = ({ onRemove }) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumApi, setGridColumApi] = useState(null);

  const rowData = DataFake;

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumApi(params.columApi);
  };

  const getRowId = useCallback((params) => {
    return params.data.Id;
  });

  const numberFormatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const myValueFormatter = (p) => numberFormatter.format(p.value);

  const columDefs = [
    { field: "Number", headerName: "Number", cellRenderer: "" },
    { field: "Type", headerName: "Type", filter: true },
    { field: "Client", headerName: "Client", filter: true },
    { field: "Description", headerName: "Description" },
    { field: "Rate", headerName: "Rate" },
    { field: "Date", headerName: "Date" },
    { field: "Amount", headerName: "Amount", valueFormatter: myValueFormatter },
    { field: "Delete", headerName: "Delete" },
  ];

  const defaultColDef = {
    sortalbe: true,
    flex: 1,
    filter: true,
    floatingFilter: true,
  };

  const handleSubmit = (e) => {};

  return (
    <div
      className="ag-theme-alpine"
      style={{ width: 1605, height: 429, marginLeft: "75px" }}
    >
      <AgGridReact
        getRowId={getRowId}
        rowData={rowData}
        columnDefs={columDefs}
        rowSelection="multiple"
        onGridReady={onGridReady}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default GridListInvoices;
