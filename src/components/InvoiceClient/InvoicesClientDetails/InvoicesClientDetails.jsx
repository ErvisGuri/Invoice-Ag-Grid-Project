import React, { useContext, useCallback, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import { Link } from "react-router-dom";
import { Button } from "antd";

import "./InvoicesClientDetails.css";

import "../../GridListInvoices/GridListInvoices.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import InvoiceContext from "../../../InvoiceContext";

import { AmountDetailsModal } from "./AmountDetailsModal";

const InvoicesClientDetails = () => {
  const { invoiceValue } = useContext(InvoiceContext);
  const [tableData, setTableData] = invoiceValue;
  const [visible, setVisible] = useState(false);
  const [client, setClient] = useState();

  const idValueGetter = (params) => {
    return params.node ? params.node.rowIndex : null;
  };

  const hideModal = () => {
    setVisible(false);
  };

  var formatNumber = (number) => {
    return Math.floor(number)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const currency = (params) => {
    return "$" + formatNumber(params.value);
  };

  const handleCellOnClick = (params) => {
    var client = params.data.client;
    setClient(client);
    setVisible(true);
  };

  ///calc unique client sum
  var helper = {};
  var tableWithSums = tableData?.reduce(function (r, o) {
    var key = o.client;
    if (!helper[key]) {
      helper[key] = Object.assign({}, o); // create a copy of o
      r.push(helper[key]);
    } else {
      helper[key].amount += parseInt(o.amount);
    }
    return r;
  }, []);

  const columDefs = [
    {
      field: "id",
      headerName: "ID",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      valueGetter: idValueGetter,
      sortable: true,
      sort: "asc",
    },

    {
      field: "client",
      headerName: "Client",
      filter: true,
      cellStyle: { borderLeft: "2px gray solid" },
    },
    {
      field: "amount",
      headerName: "Amount",
      cellStyle: { borderLeft: "2px gray solid" },
      sortable: true,
      sort: "asc",
      sortingOrder: ["asc", "desc"],
      valueFormatter: currency,
      onCellClicked: (params) => handleCellOnClick(params),
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

  const totalSum = formatNumber(
    tableData
      ?.map((el) => el.amount)
      .reduce((a, b) => parseInt(a) + parseInt(b))
  );

  return (
    <div
      className="main_container"
      style={{ paddingTop: 160, paddingLeft: 560 }}
    >
      <div className="clientDetails_container">
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
          rowData={tableWithSums}
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
              backgroundColor: "gray",
              padding: "7px",
              borderRadius: "7px",
            }}
          >
            {`$${totalSum}`}
          </div>
        </div>
      </div>
      <AmountDetailsModal
        client={client}
        visible={visible}
        hideModal={hideModal}
      />
    </div>
  );
};

export default InvoicesClientDetails;
