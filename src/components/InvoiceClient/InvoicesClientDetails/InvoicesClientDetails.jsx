import React, { useContext, useCallback, useState, useEffect } from "react";

import { AgGridReact } from "ag-grid-react";
import { Link } from "react-router-dom";
import { Button, Popover } from "antd";

import "./InvoicesClientDetails.css";

// import "ag-grid-enterprise";
import "../../GridListInvoices/GridListInvoices.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import InvoiceContext from "../../../InvoiceContext";
import { tab } from "@testing-library/user-event/dist/tab";

const InvoicesClientDetails = () => {
  const { invoiceValue } = useContext(InvoiceContext);
  const [tableData, setTableData] = invoiceValue;
  const [gridApi, setGridApi] = useState(null);

  const idValueGetter = (params) => {
    return params.node ? params.node.rowIndex : null;
  };

  const content = (client) => {
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "250px",
            textDecoration: "underline",
          }}
        >
          <h3 style={{ marginLeft: "5px" }}>ID</h3>
          <h3>Amount</h3>
        </div>
        {tableData
          .filter((e) => e.client === client)
          .map((invoice, key) => (
            <div
              className="detailsRow"
              key={key}
              style={{ display: "flex", flexDirection: "row", gap: "6px" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "5px",
                }}
              >
                {invoice.id}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "280px",
                }}
              >
                {invoice.amount}
              </div>
            </div>
          ))}
      </div>
    );
  };

  const columDefs = [
    {
      field: "id",
      headerName: "ID",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      valueGetter: idValueGetter,
    },
    { field: "client", headerName: "Client", filter: true },
    {
      field: "amount",
      headerName: "Amount",
      sortable: true,
      cellRenderer: (params) => (
        <div>
          <Popover
            content={content(params?.data.client)}
            title="Invoice Details"
            trigger="click"
          >
            {<span className="amountDetails">{findamount(params?.data)}</span>}
          </Popover>
        </div>
      ),
    },
  ];

  const onGridReady = useCallback((params) => {
    fetch("http://localhost:4000/invoices")
      .then((resp) => resp.json())
      .then((data) => setTableData(data));
  }, []);

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  // const datasource = {
  //   getRows(params) {
  //     console.log(JSON.stringify(params.request, null, 1));
  //     const { sortModel } = params.request;
  //     let url = "http://localhost:4000/invoices";

  //     //Sorting
  //     if (sortModel.length) {
  //       const { colId, sort } = sortModel[0];
  //       url += `_sort=${colId}&_order=${sort}&`;
  //     }
  //   },
  // };

  const findamount = (params) => {
    let data = tableData?.filter((el) => el.client === params.client);
    let temp = data
      ?.map((el) => el.amount)
      ?.reduce((a, b) => parseInt(a) + parseInt(b));
    return temp;
  };

  const sort = tableData?.sort((a, b) => {
    return a.amount - b.amount;
  });

  const totalSum = tableData
    ?.map((el) => el.amount)
    .reduce((a, b) => parseInt(a) + parseInt(b));

  const uniqueClient = Array.from(
    new Set(tableData?.map((a) => a?.client))
  )?.map((id) => {
    return tableData?.find((a) => a?.client === id);
  });

  return (
    <div>
      <div className="clientDetails_container" style={{ marginTop: "40px" }}>
        <div>
          <span style={{ fontSize: "25px", marginLeft: "350px" }}>
            Invoices Client Detalis
          </span>
        </div>
        <Link to="/">
          <Button
            style={{
              width: "180px",
              backgroundColor: "rgb(128, 126, 126)",
              color: "white",
              borderRadius: "15px",
              marginLeft: "105px",
              marginBottom: "10px",
              position: "sticky",
            }}
          >
            Invoices Client Details
          </Button>
        </Link>
      </div>
      <div
        className="ag-theme-alpine"
        style={{
          width: 603,
          height: 270,
          marginLeft: "105px",
          marginRight: "70px",
        }}
      >
        <AgGridReact
          columnDefs={columDefs}
          rowData={uniqueClient}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "5px",
            marginLeft: "2px",
            fontSize: "17px",
          }}
        >
          <div>
            <span style={{ marginLeft: "5px", textDecoration: "underline" }}>
              Total
            </span>
          </div>
          <div
            style={{
              marginLeft: "375px",
              backgroundColor: "green",
              padding: "7px",
              borderRadius: "7px",
            }}
          >
            {totalSum}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicesClientDetails;
