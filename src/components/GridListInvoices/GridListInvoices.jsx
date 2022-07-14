import React, {
  useCallback,
  useMemo,
  useRef,
  useContext,
  useEffect,
} from "react";

import { Button } from "antd";

import { AgGridReact } from "ag-grid-react";

import "./GridListInvoices.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { Modal } from "antd";

//Importing InvoiceContext
import InvoiceContext from "../../InvoiceContext";

const GridListInvoices = ({ showModal }) => {
  const { invoiceValue } = useContext(InvoiceContext);
  const url = "http://localhost:4000/invoices";
  const [tableData, setTableData] = invoiceValue;
  const gridRef = useRef();

  useEffect(() => {
    getInvoices();
  }, []);

  const getInvoices = () => {
    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => setTableData(resp));
  };

  const numberFormatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const myValueFormatter = (p) => numberFormatter.format(p.value);

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

  const handleUpdate = (oldData) => {
    setTableData(oldData);
    showModal();
  };

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure, you want to delete this row!",
      id
    );
    console.log(confirm);
    if (confirm) {
      fetch(url + `/${id}`, {
        method: "DELETE",
      })
        .then((resp) => resp.json())
        .then((res) => getInvoices());
    }
  };

  const defaultColDef = {
    sortalbe: true,
    filter: true,
    floatingFilter: true,
    resizable: true,
  };

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
        // groupIncludeFooter={true}
        // groupIncludeTotalFooter={true}
        sideBar={"columns"}
      />
      <div className="totalSum">{tableData?.length}</div>
    </div>
  );
};

export default GridListInvoices;
