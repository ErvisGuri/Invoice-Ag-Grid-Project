import React, { useCallback, useContext, useEffect, useRef } from "react";

import { Button } from "antd";

import { AgGridReact } from "ag-grid-react";

import "./GridListInvoices.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { Modal } from "antd";

//Importing InvoiceContext
import InvoiceContext from "../../InvoiceContext";
import { tab } from "@testing-library/user-event/dist/tab";

const GridListInvoices = ({ setInitialData, showModal }) => {
  const { invoiceValue, invoiceEditValue } = useContext(InvoiceContext);
  const gridRef = useRef();

  const url = "http://localhost:4000/invoices";
  const [tableData, setTableData] = invoiceValue;
  const [isEdit, setIsEdit] = invoiceEditValue;

  useEffect(() => {
    getInvoices();
  }, []);

  const getInvoices = () => {
    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => setTableData(resp));
  };

  const formatNumber = (number) => {
    return Math.floor(number)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const currency = (params) => {
    return "$" + formatNumber(params.value);
  };

  const columDefs = [
    {
      field: "id",
      headerName: "ID",
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    { field: "number", headerName: "Invoice Nr" },
    { field: "type", headerName: "Type", filter: true },
    { field: "client", headerName: "Client", filter: true },

    { field: "description", headerName: "Description" },
    { field: "rate", headerName: "Rate" },
    { field: "date", headerName: "Date" },
    {
      field: "amount",
      headerName: "Amount",
      valueFormatter: currency,
      sortable: true,
    },
    {
      field: "status",
      headerName: "Status",
      filter: true,
      cellRenderer: (params) => (
        <div
          style={{
            background: styleRow(params.data.status),
            border: "none",
            borderRadius: "6px",
            textAlign: "center",
          }}
        >
          {params.data.status}
        </div>
      ),
    },
    {
      field: "id",
      headerName: "Action",
      cellRenderer: (params) => (
        <div>
          <Button
            onClick={() => handleUpdate(params.data)}
            style={{
              backgroundColor: "rgb(230, 224, 224)",
              borderRadius: "6px",
            }}
          >
            Update
          </Button>
          <Modal />
          <Button
            onClick={() => handleDelete(params.value)}
            style={{
              backgroundColor: "rgb(230, 224, 224)",
              borderRadius: "6px",
              marginLeft: "5px",
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const onGridReady = useCallback((params) => {
    fetch("http://localhost:4000/invoices")
      .then((resp) => resp.json())
      .then((data) => setTableData(data));
  }, []);

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

  const handleUpdate = (invoice) => {
    setInitialData(invoice);
    setIsEdit(true);
    showModal();
  };

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure, you want to delete this row!",
      id
    );
    if (confirm) {
      fetch(url + `/${id}`, {
        method: "DELETE",
      })
        .then((resp) => resp.json())
        .then((res) => getInvoices());
    }
  };

  const defaultColDef = {
    filter: true,
    floatingFilter: true,
    resizable: true,
  };

  const totalAmount = formatNumber(
    tableData
      ?.map((el) => el.amount)
      .reduce((a, b) => parseInt(a) + parseInt(b))
  );

  return (
    <div
      className="ag-theme-alpine"
      style={{
        width: 1750,
        height: 600,
        marginLeft: "105px",
        marginRight: "70px",
      }}
    >
      <AgGridReact
        rowData={tableData}
        defaultColDef={defaultColDef}
        columnDefs={columDefs}
        rowDragManaged={true}
        rowSelection="multiple"
        animateRows={true}
        pagination={true}
        paginationPageSize={10}
        sideBar={"columns"}
        onGridReady={onGridReady}
      />
      <div className="totalAmount">
        <div>
          <span style={{ fontSize: "17px", textDecoration: "underline" }}>
            Total
          </span>
        </div>
        <div
          style={{
            marginLeft: "1368px",
            backgroundColor: "gray",
            padding: "7px",
            borderRadius: "7px",
            fontSize: "17px",
          }}
        >
          {`$${totalAmount}`}
        </div>
      </div>
    </div>
  );
};

export default GridListInvoices;
