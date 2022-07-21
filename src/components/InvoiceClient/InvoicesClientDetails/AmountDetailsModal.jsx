import { AgGridReact } from "ag-grid-react";
import { Modal } from "antd";
import { useState, useContext, useCallback } from "react";

import InvoiceContext from "../../../InvoiceContext";

export const AmountDetailsModal = ({ visible, client, hideModal }) => {
  const { invoiceValue } = useContext(InvoiceContext);
  const [tableData, setTableData] = invoiceValue;
  const [amountData, setAmountData] = useState();

  const formatNumber = (number) => {
    return Math.floor(number)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const currency = (params) => {
    return "$" + formatNumber(params.value);
  };

  const columnDefs = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      sortable: true,
      sort: "asc",
    },
    {
      field: "status",
      headerName: "Status",
      filter: true,
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
      field: "amount",
      headerName: "Amount",
      sortable: true,
      width: 100,
      cellStyle: { borderLeft: "2px gray solid" },
      valueFormatter: currency,
    },
  ];

  const onGridReady = useCallback((params) => {
    fetch("http://localhost:4000/invoices")
      .then((resp) => resp.json())
      .then((data) => setAmountData(data));
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

  const content = tableData?.filter((obj) => {
    return obj.client === client;
  });

  return (
    <>
      <Modal
        width="470px"
        title={`${client} Amount Details`}
        visible={visible}
        onOk={hideModal}
        onCancel={hideModal}
        footer={null}
        mask={true}
        maskStyle={{ backgroundColor: "rgb(164 160 160)" }}
      >
        <div
          className="ag-theme-alpine"
          style={{
            width: 420,
            height: 270,
          }}
        >
          <AgGridReact
            columnDefs={columnDefs}
            onGridReady={onGridReady}
            rowData={content}
          />
        </div>
      </Modal>
    </>
  );
};
