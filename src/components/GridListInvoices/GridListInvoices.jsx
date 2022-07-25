import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useMemo,
} from "react";

import { Button } from "antd";

import { AgGridReact } from "ag-grid-react";

import "ag-grid-enterprise";
import "./GridListInvoices.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import totalAmountStatusBar from "./totalAmountStatusBar";

import { Modal } from "antd";

//Importing InvoiceContext
import InvoiceContext from "../../InvoiceContext";
import moment from "moment";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const GridListInvoices = ({ setInitialData, showModal, filter }) => {
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
  const sendRecord = (data) => {
    socket.emit("send_record", data);
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
      width: 90,
    },
    {
      field: "number",
      headerName: "Invoice Nr",
      width: 120,
      cellStyle: { borderLeft: "2px gray solid" },
    },

    {
      field: "type",
      headerName: "Type",
      width: 150,
      cellStyle: { borderLeft: "2px gray solid" },
    },
    {
      field: "client",
      headerName: "Client",
      // rowGroup: true,
      // hide: true,
      cellStyle: { borderLeft: "2px gray solid" },
      width: 100,
    },

    {
      field: "description",
      headerName: "Description",
      cellStyle: { borderLeft: "2px gray solid" },
    },
    {
      field: "rate",
      headerName: "Rate",
      width: 90,
      cellStyle: { borderLeft: "2px gray solid" },
    },
    {
      field: "date",
      headerName: "Date",
      valueGetter: (params) => moment(params.data.date).format("DD/MM/YYYY"),
      width: 110,
      cellStyle: { borderLeft: "2px gray solid" },
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 130,
      valueFormatter: currency,
      sortable: true,
      cellStyle: { borderLeft: "2px gray solid" },
    },
    {
      field: "status",
      headerName: "Status",
      // rowGroup: true,
      // hide: true,
      cellStyle: { borderLeft: "2px gray solid" },
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
      cellStyle: { borderLeft: "2px gray solid" },
      cellRenderer: (params) => (
        <div>
          <Button
            onClick={() => {
              handleUpdate(params.data);
            }}
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
    console.log("invoiceData", invoice);
    showModal();
    setIsEdit(true);
    setInitialData(invoice);
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

      sendRecord(tableData);
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

  const autoGroupColumnDef = useMemo(() => {
    return {
      minWidth: 100,
    };
  }, []);

  const statusBar = useMemo(() => {
    return {
      statusPanels: [
        { statusPanel: "agTotalAndFilteredRowCountComponent", align: "left" },
        { statusPanel: totalAmountStatusBar, align: "center" },
        { statusPanel: "agFilteredRowCountComponent" },
        { statusPanel: "agSelectedRowCountComponent" },
        { statusPanel: "agAggregationComponent" },
      ],
    };
  }, []);

  const onFirstDataRendered = useCallback((event) => {
    event.api.addCellRange({
      rowStartIndex: 2,
      rowEndIndex: 6,
      columns: ["amount"],
    });
  }, []);

  return (
    <div
      className="ag-theme-alpine"
      style={{
        width: 1423,
        height: 600,
        marginLeft: "200px",
        marginRight: "70px",
      }}
    >
      <AgGridReact
        rowData={tableData?.filter((e) =>
          filter !== "" ? e.status === filter : true
        )}
        gridRef={gridRef}
        defaultColDef={defaultColDef}
        columnDefs={columDefs}
        rowDragManaged={true}
        statusBar={statusBar}
        rowSelection="multiple"
        autoGroupColumnDef={autoGroupColumnDef}
        animateRows={true}
        enableRangeSelection={true}
        pagination={true}
        paginationPageSize={10}
        sideBar={true}
        onGridReady={onGridReady}
        onFirstDataRendered={onFirstDataRendered}
      />
    </div>
  );
};

export default GridListInvoices;
