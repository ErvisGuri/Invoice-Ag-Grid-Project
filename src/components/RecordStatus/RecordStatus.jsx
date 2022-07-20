import React, { useContext, useState, useEffect } from "react";

import "./RecordStatus.css";

import InvoiceContext from "../../InvoiceContext";

const RecordStatus = ({ setFilter }) => {
  const { invoiceValue } = useContext(InvoiceContext);
  const [tableData, setTableData] = invoiceValue;
  const [panelData, setPanelData] = useState();
  const newRecord = tableData?.map((el) => el.status);

  const handleOnClick = (filter) => {
    setFilter(filter);
  };

  useEffect(() => {
    const newRecord = tableData?.map((el) => el.status);
    const panelData = {};
    newRecord?.forEach((el) => {
      if (el in panelData) {
        parseInt(panelData[el]++);
      } else {
        parseInt((panelData[el] = 1));
      }
    });
    setPanelData(panelData);
  }, [tableData]);

  return (
    <div className="recordStatus_container">
      <div className="recordNew" onClick={() => handleOnClick("")}>
        <span className="recordNumb">{newRecord?.length}</span>
        <span className="recordStatus">New Record</span>
      </div>
      <div className="recordPending" onClick={() => handleOnClick("Pending")}>
        <span className="recordNumb">
          {panelData ? panelData["Pending"] : ""}
        </span>
        <span className="recordStatus">Pending</span>
      </div>
      <div className="recordPaid" onClick={() => handleOnClick("Paid")}>
        <span className="recordNumb">{panelData ? panelData["Paid"] : ""}</span>
        <span className="recordStatus">Paid</span>
      </div>
      <div className="recordUnpaid" onClick={() => handleOnClick("Unpaid")}>
        <span className="recordNumb">
          {panelData ? panelData["Unpaid"] : ""}
        </span>
        <span className="recordStatus">Unpaid</span>
      </div>
    </div>
  );
};

export default RecordStatus;
