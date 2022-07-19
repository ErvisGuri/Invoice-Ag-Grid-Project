import { AgGridReact } from "ag-grid-react";
import { Modal } from "antd";
import { useState, useContext, useCallback } from "react";

import InvoiceContext from "../../../InvoiceContext";

export const HelloWorldComp = (p) => {
  const { invoiceValue } = useContext(InvoiceContext);
  const [tableData, setTableData] = invoiceValue;
  const [visible, setVisible] = useState(false);
  const [amountData, setAmountData] = useState();
  const [selectedCell, setSelectedCell] = useState();

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const columnDefs = [
    {
      field: "id",
      headerName: "ID",
      sortable: true,
      sort: "asc",
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
      field: "amount",
      headerName: "Amount",
      sortable: true,
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
    return obj.client === "Alumil";
  });

  console.log(content);

  return (
    <>
      <button onClick={showModal}>efwfwefsdsdsds</button>
      <Modal
        width="650px"
        title="Client Details"
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
            width: 603,
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
