import React, { useContext, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import { Link } from "react-router-dom";
import { Button, Popover } from "antd";

import "../../GridListInvoices/GridListInvoices.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import InvoiceContext from "../../../InvoiceContext";

const InvoicesClientDetails = ({ content, gjirofarmAmount }) => {
  const { invoiceValue } = useContext(InvoiceContext);
  const [tableData, setTableData] = invoiceValue;
  const [gjiroAmount, setGjiroAmount] = useState([]);

  const idValueGetter = (params) => {
    return params.node ? params.node.rowIndex : null;
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
      cellRenderer: (params) => (
        <div>
          <Popover
            style={{ width: 400, height: "auto" }}
            content={content}
            title="All Invoices"
            trigger="click"
          >
            {findamount(params?.data)}
            {params.data.amount}
          </Popover>
        </div>
      ),
    },
  ];

  const defaultColDef = {
    sortalbe: true,
    filter: true,
    resizable: true,
  };

  const styleRow = (color) => {
    switch (color) {
      case "Pending":
        return "#ffa500a3";
      case "Paid":
        return "#1864079c";
      case "Unpaid":
        return "#ff00009c";
      default:
        return "white";
    }
  };

  const findamount = (params) => {
    let data = tableData?.filter((el) => el.client === params.client);
    let temp = data
      ?.map((el) => el.amount)
      ?.reduce((a, b) => console.log(a + b));
    return temp;
  };

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
        />
        <div className="totalSum"></div>
      </div>
    </div>
  );
};

export default InvoicesClientDetails;
