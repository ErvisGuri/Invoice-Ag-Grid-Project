import React, { useContext, useState, useEffect } from "react";

import "./RecordStatus.css";

import InvoiceContext from "../../InvoiceContext";

const RecordStatus = () => {
  const { invoiceValue, invoiceEditValue } = useContext(InvoiceContext);
  const [tableData, setTableData] = invoiceValue;
  const [panelData, setPanelData] = useState();
  const [direction, setDirection] = useState("none");
  const newRecord = tableData?.map((el) => el.status);

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

  //   const statusPaid = tableData.find((invoice) => invoice.status === "Paid");
  //   console.log(statusPaid);

  return (
    <div className="recordStatus_container">
      <div className="recordNew">
        <span className="recordNumb">{newRecord?.length}</span>
        <span className="recordStatus">New Record</span>
      </div>
      <div className="recordPending">
        {/* <span className="recordNumb">{panelData["Pending"]}</span> */}
        <span className="recordStatus">Pending</span>
      </div>
      <div className="recordPaid">
        {/* <span className="recordNumb">{panelData["Paid"]}</span> */}
        <span className="recordStatus">Paid</span>
      </div>
      <div className="recordUnpaid">
        {/* <span className="recordNumb">{panelData["Unpaid"]}</span> */}
        <span className="recordStatus">Unpaid</span>
      </div>
    </div>
  );
};

export default RecordStatus;
